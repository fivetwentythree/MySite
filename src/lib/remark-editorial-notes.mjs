import { visit } from "unist-util-visit";

const notePattern = /\{\{\s*(note|marginnote)\s*:\s*([\s\S]*?)\s*\}\}/gi;
const noteStartPattern = /\{\{\s*(note|marginnote)\s*:\s*/i;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizePublicPath(value) {
  return value.replace(/^\/?public\//, "/");
}

function renderNoteNodes(nodes) {
  return nodes.map(renderNoteNode).join("");
}

function renderNoteNode(node) {
  if (!node) return "";

  switch (node.type) {
    case "text":
      return renderInlineNoteMarkdown(node.value);
    case "image": {
      const src = normalizePublicPath(node.url || "");
      const titleAttribute = node.title ? ` title="${escapeHtml(node.title)}"` : "";
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(node.alt || "")}" loading="lazy" decoding="async"${titleAttribute}>`;
    }
    case "link": {
      const href = normalizePublicPath(node.url || "");
      const titleAttribute = node.title ? ` title="${escapeHtml(node.title)}"` : "";
      return `<a href="${escapeHtml(href)}"${titleAttribute}>${renderNoteNodes(node.children || [])}</a>`;
    }
    case "strong":
      return `<strong>${renderNoteNodes(node.children || [])}</strong>`;
    case "emphasis":
      return `<em>${renderNoteNodes(node.children || [])}</em>`;
    case "inlineCode":
      return `<code>${escapeHtml(node.value || "")}</code>`;
    case "break":
      return "<br>";
    case "html":
      return renderAllowedHtml(node.value || "");
    default:
      return "";
  }
}

function renderAllowedHtml(value) {
  const imageMatch = /^<img\s+([^>]+)>$/i.exec(value.trim());
  if (!imageMatch) return escapeHtml(value);

  const attributes = imageMatch[1];
  const src = readHtmlAttribute(attributes, "src");
  if (!src) return "";

  const alt = readHtmlAttribute(attributes, "alt") || "";
  const title = readHtmlAttribute(attributes, "title");
  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : "";

  return `<img src="${escapeHtml(normalizePublicPath(src))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"${titleAttribute}>`;
}

function readHtmlAttribute(attributes, name) {
  const pattern = new RegExp(`${name}=(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i");
  const match = pattern.exec(attributes);
  return match ? match[1] || match[2] || match[3] || "" : "";
}

function renderInlineNoteMarkdown(value) {
  const imagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
  const htmlImagePattern = /<img\s+[^>]*src=(?:"[^"]*"|'[^']*'|[^\s"'>]+)[^>]*>/gi;
  const source = value.trim();
  let html = "";
  let lastIndex = 0;
  let match;

  const matches = [
    ...Array.from(source.matchAll(imagePattern), (imageMatch) => ({
      type: "markdown-image",
      match: imageMatch,
      index: imageMatch.index,
      length: imageMatch[0].length
    })),
    ...Array.from(source.matchAll(htmlImagePattern), (htmlMatch) => ({
      type: "html-image",
      match: htmlMatch,
      index: htmlMatch.index,
      length: htmlMatch[0].length
    }))
  ].sort((a, b) => a.index - b.index);

  for (const item of matches) {
    if (item.index < lastIndex) continue;

    const before = source.slice(lastIndex, item.index);

    if (before) {
      html += escapeHtml(before);
    }

    if (item.type === "html-image") {
      html += renderAllowedHtml(item.match[0]);
    } else {
      const [, alt, rawSrc, title] = item.match;
      const src = normalizePublicPath(rawSrc.trim());
      const titleAttribute = title ? ` title="${escapeHtml(title)}"` : "";
      html += `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt.trim())}" loading="lazy" decoding="async"${titleAttribute}>`;
    }

    lastIndex = item.index + item.length;
  }

  html += escapeHtml(source.slice(lastIndex));
  return html;
}

function noteHtml(kind, rawText, state) {
  const text = Array.isArray(rawText) ? renderNoteNodes(rawText) : renderInlineNoteMarkdown(rawText);
  if (!text) return "";

  if (kind === "marginnote") {
    return `<span class="marginnote">${text}</span>`;
  }

  state.id += 1;
  const id = `margin-note-${state.id}`;

  return [
    `<label for="${id}" class="sidenote-number" aria-label="Show margin note"></label>`,
    `<input type="checkbox" id="${id}" class="margin-toggle" />`,
    `<span class="sidenote">${text}</span>`
  ].join("");
}

function replaceTextOnlyNotes(tree, state) {
  visit(tree, "text", (node, index, parent) => {
    if (!parent || typeof index !== "number" || !notePattern.test(node.value)) {
      notePattern.lastIndex = 0;
      return;
    }

    notePattern.lastIndex = 0;
    const children = [];
    let lastIndex = 0;
    let match;

    while ((match = notePattern.exec(node.value)) !== null) {
      const [fullMatch, kind, content] = match;
      const before = node.value.slice(lastIndex, match.index);

      if (before) {
        children.push({ type: "text", value: before });
      }

      children.push({ type: "html", value: noteHtml(kind.toLowerCase(), content, state) });
      lastIndex = match.index + fullMatch.length;
    }

    const after = node.value.slice(lastIndex);
    if (after) {
      children.push({ type: "text", value: after });
    }

    parent.children.splice(index, 1, ...children);
    return index + children.length;
  });
}

function replaceNodeSpanningNotes(tree, state) {
  visit(tree, (node) => {
    if (!node.children) return;

    const children = node.children;

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (child?.type !== "text") continue;

      const startMatch = noteStartPattern.exec(child.value);
      if (!startMatch) continue;

      const before = child.value.slice(0, startMatch.index);
      const afterStart = child.value.slice(startMatch.index + startMatch[0].length);

      if (afterStart.includes("}}")) continue;

      const noteNodes = [];
      if (afterStart) {
        noteNodes.push({ type: "text", value: afterStart });
      }

      let closeIndex = -1;
      let closeTextIndex = -1;

      for (let cursor = index + 1; cursor < children.length; cursor += 1) {
        const next = children[cursor];

        if (next?.type === "text") {
          closeTextIndex = next.value.indexOf("}}");
          if (closeTextIndex !== -1) {
            const beforeClose = next.value.slice(0, closeTextIndex);
            if (beforeClose) {
              noteNodes.push({ type: "text", value: beforeClose });
            }
            closeIndex = cursor;
            break;
          }
        }

        noteNodes.push(next);
      }

      if (closeIndex === -1) continue;

      const replacement = [];
      const afterClose = children[closeIndex].value.slice(closeTextIndex + 2);

      if (before) {
        replacement.push({ type: "text", value: before });
      }

      replacement.push({ type: "html", value: noteHtml(startMatch[1].toLowerCase(), noteNodes, state) });

      if (afterClose) {
        replacement.push({ type: "text", value: afterClose });
      }

      children.splice(index, closeIndex - index + 1, ...replacement);
      index += replacement.length - 1;
    }
  });
}

export default function remarkEditorialNotes() {
  return (tree) => {
    const state = { id: 0 };
    replaceNodeSpanningNotes(tree, state);
    replaceTextOnlyNotes(tree, state);
  };
}
