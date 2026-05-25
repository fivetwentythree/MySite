import type { CollectionEntry } from "astro:content";

type WritingEntry = CollectionEntry<"writings">;

export type WritingSourceGroup<T extends WritingEntry = WritingEntry> = {
  source: string;
  sourceId: string;
  entries: T[];
};

export function groupWritingsBySource<T extends WritingEntry>(writings: T[]): WritingSourceGroup<T>[] {
  return Array.from(
    writings
      .reduce((groups, entry) => {
        const source = entry.data.source.trim() || "Essay";
        const sourceKey = source.toLocaleLowerCase();
        const group = groups.get(sourceKey);

        if (group) {
          group.entries.push(entry);
        } else {
          groups.set(sourceKey, {
            source,
            sourceId: sourceKey.replaceAll(/\s+/g, "-"),
            entries: [entry]
          });
        }

        return groups;
      }, new Map<string, WritingSourceGroup<T>>())
      .values()
  );
}
