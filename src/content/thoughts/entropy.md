---
title: "Entropy"
---
## 1. The core idea of information theory

- **Information theory is the mathematics of uncertainty, messages, compression, and communication.**
    
    - It was developed mainly by Claude Shannon in the 1940s.
        
    - It asks questions like:
        
        - How much information is contained in a message?
            
        - How efficiently can a message be compressed?
            
        - How much data can be sent through a noisy channel?
            
        - How much does one variable tell us about another?
            
        - What is the theoretical limit of communication?
            
- A useful first intuition:
    
    - Information is not the same as meaning.
        
    - Information theory does **not** ask whether a message is emotionally meaningful, philosophically meaningful, or socially important.
        
    - It asks how much **uncertainty is reduced** when the message is received.
        
- Example:
    
    - Suppose someone says:
        
        - “The sun rose today.”
            
    - This gives almost no information because you already expected it.
        
    - But if someone says:
        
        - “A meteor hit Perth this morning.”
            
    - That gives a lot of information because it was highly unexpected.
        
- Therefore:
    
    - **Expected events carry little information.**
        
    - **Surprising events carry more information.**
        

---

## 2. The fundamental unit: the bit

- A **bit** is the amount of information gained by resolving one equally likely yes/no uncertainty.
    
- Example:
    
    - A fair coin has two equally likely outcomes:
        
        - Heads
            
        - Tails
            
    - Before the flip, you are uncertain.
        
    - After seeing the result, your uncertainty is removed.
        
    - That result gives you **1 bit** of information.
        
- Why “bit” matters:
    
    - It is the basic unit of digital information.
        
    - Computers store and transmit data using bits.
        
    - Information theory gives a way to measure the informational content of messages independently of whether they are text, images, DNA, sound, sensor data, or numbers.
        

---

## 3. Self-information: information from one event

- **Self-information** measures how surprising a single event is.
    
- Formula:
    
    $$I(x) = -\log_2 P(x)$$
    
- Where:
    
    - `I(x)` = information content of event `x`
        
    - `P(x)` = probability of event `x`
        
    - `log₂` means logarithm base 2, so the answer is measured in bits
        
- Intuition:
    
    - If an event is very likely, it gives little information.
        
    - If an event is very unlikely, it gives lots of information.
        
- Examples:
    
    - If `P(x) = 1/2`:
        
        $$I(x) = -\log_2(1/2) = 1 \text{ bit}$$
        
    - If `P(x) = 1/4`:
        
        $$I(x) = -\log_2(1/4) = 2 \text{ bits}$$
        
    - If `P(x) = 1/8`:
        
        $$I(x) = -\log_2(1/8) = 3 \text{ bits}$$
        
- Important pattern:
    
    - The less probable the event, the more bits it carries.
        

---

## 4. Why logarithms appear

- Information theory uses logarithms because information should add when independent events happen together.
    
- Example:
    
    - Suppose you flip two fair coins.
        
    - Each coin gives 1 bit.
        
    - Two independent coin flips should give 2 bits.
        
- Probability of getting a specific two-flip sequence, such as `Heads, Tails`:
    
    $$P = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$$
    
- Information:
    
    $$I = -\log_2(1/4) = 2 \text{ bits}$$
    
- The logarithm converts multiplication of probabilities into addition of information:
    
    $$\log(ab) = \log(a) + \log(b)$$
    
- This is why information from independent events can be added cleanly.
    

---

## 5. Entropy: average uncertainty

- **Entropy** is the average amount of information produced by a random variable.
    
- Formula:
    
    $$H(X) = -\sum_x P(x)\log_2 P(x)$$
    
- Where:
    
    - `X` is a random variable.
        
    - `x` represents possible outcomes.
        
    - `P(x)` is the probability of each outcome.
        
- Intuition:
    
    - Entropy measures uncertainty before observing the outcome.
        
    - It also measures the average surprise after observing outcomes.
        
- Example: fair coin
    
    - Outcomes:
        
        - Heads: `P = 1/2`
            
        - Tails: `P = 1/2`
            
    - Entropy:
        
        $$H(X) = -\left(\frac{1}{2}\log_2\frac{1}{2} + \frac{1}{2}\log_2\frac{1}{2}\right) = 1 \text{ bit}$$
        
- Example: biased coin
    
    - Outcomes:
        
        - Heads: `P = 0.99`
            
        - Tails: `P = 0.01`
            
    - Entropy is much less than 1 bit.
        
    - Why?
        
        - Because you can almost always guess Heads.
            
        - The result is less uncertain.
            
- Key intuition:
    
    - Maximum entropy happens when all outcomes are equally likely.
        
    - Lower entropy happens when some outcomes are much more likely than others.
        

---

## 6. Entropy examples

### 6.1 Fair coin

- Random variable:
    
    - `X = coin flip`
        
- Outcomes:
    
    - Heads
        
    - Tails
        
- Both are equally likely.
    
- Entropy:
    
    - `H(X) = 1 bit`
        

### 6.2 Fair die

- A fair six-sided die has six equally likely outcomes.
    
- Entropy:
    
    $$H(X) = \log_2 6 \approx 2.585 \text{ bits}$$
    
- Interpretation:
    
    - A die roll contains more uncertainty than a coin flip.
        
    - But it is not exactly 3 bits because 3 bits can represent 8 possible states, while a die has only 6.
        

### 6.3 English text

- English letters are not equally likely.
    
    - `e` is common.
        
    - `q`, `x`, and `z` are rare.
        
- Therefore English text has redundancy.
    
- Because of redundancy, English can be compressed.
    

### 6.4 Weather

- Suppose a city is sunny 90% of the time and rainy 10% of the time.
    
- The weather forecast carries less entropy than if sunny and rainy were equally likely.
    
- A forecast saying “sunny” is not very surprising.
    
- A forecast saying “rainy” is more informative.
    

---

## 7. Entropy is not disorder in the everyday sense

- In everyday language, entropy is often described as “disorder.”
    
- In information theory, entropy is better understood as:
    
    - uncertainty
        
    - unpredictability
        
    - average surprise
        
    - missing information
        
- Example:
    
    - A perfectly random string has high entropy.
        
    - A repetitive string has low entropy.
        
- Low entropy string:
    
    ```text
    AAAAAAAAAAAAAAAAAAAA
    ```
    
    - Very predictable.
        
    - Easy to compress.
        
- High entropy string:
    
    ```text
    8Fq9LzP2aX7mQ0rT
    ```
    
    - Harder to predict.
        
    - Harder to compress.
        

---

## 8. Compression: why entropy matters practically

- Compression is possible when data has patterns.
    
- Patterns mean predictability.
    
- Predictability means lower entropy.
    
- Example:
    
    ```text
    AAAAAAAAAAAAAAAAAAAA
    ```
    
    - Instead of storing 20 `A`s, store:
        
    
    ```text
    20A
    ```
    
- This works because the original message has redundancy.
    
- But if data is truly random:
    
    ```text
    J4xQ9pLm2ZaR8tWb
    ```
    
    - There may be no shorter description.
        
    - It cannot be compressed much.
        
- Core principle:
    
    - **Entropy gives the theoretical lower bound for lossless compression.**
        

---

## 9. Lossless vs lossy compression

### 9.1 Lossless compression

- Lossless compression keeps all information exactly.
    
- The original data can be perfectly reconstructed.
    
- Examples:
    
    - ZIP
        
    - PNG
        
    - FLAC
        
    - text compression
        
    - some database compression methods
        
- Use cases:
    
    - Legal documents
        
    - source code
        
    - medical records
        
    - scientific data
        
    - financial data
        
- You cannot lose even one bit if exact reconstruction matters.
    

### 9.2 Lossy compression

- Lossy compression removes information judged less important.
    
- The original data cannot be perfectly reconstructed.
    
- Examples:
    
    - JPEG
        
    - MP3
        
    - AAC
        
    - H.264 / H.265 video
        
- Use cases:
    
    - photos
        
    - music
        
    - video streaming
        
    - speech audio
        
- Why lossy compression works:
    
    - Human perception is limited.
        
    - Some details are invisible or inaudible to us.
        
    - Compression algorithms exploit that.
        
- Example:
    
    - A JPEG may remove tiny color variations that most people do not notice.
        
    - An MP3 may remove frequencies humans are unlikely to hear.
        

---

## 10. Source coding theorem

- Shannon’s source coding theorem says:
    
    - The entropy of a source gives the lower bound on how much it can be compressed without losing information.
        
- In simple terms:
    
    - If a source has entropy `H` bits per symbol, then on average you cannot encode it losslessly using fewer than `H` bits per symbol.
        
- Example:
    
    - If a data source has entropy 3 bits per symbol, the best possible compression averages about 3 bits per symbol.
        
    - You might do worse, but not better in the long run.
        
- This is profound because:
    
    - It separates what is possible from what is impossible.
        
    - It tells engineers the theoretical limit before they build the compressor.
        

---

## 11. Coding: assigning shorter codes to common events

- Information theory explains why common symbols should get short codes and rare symbols should get long codes.
    
- Example:
    
    - Suppose we encode characters:
        
        - `E` appears often.
            
        - `Z` appears rarely.
            
    - Efficient coding gives:
        
        - short code for `E`
            
        - longer code for `Z`
            
- This is the idea behind Huffman coding and related compression methods.
    

### 11.1 Fixed-length code

- Suppose there are 4 symbols:
    
    - A
        
    - B
        
    - C
        
    - D
        
- Fixed-length binary encoding:
    
    ```text
    A = 00
    B = 01
    C = 10
    D = 11
    ```
    
- Every symbol uses 2 bits.
    

### 11.2 Variable-length code

- Suppose probabilities are:
    
    - A: 70%
        
    - B: 15%
        
    - C: 10%
        
    - D: 5%
        
- A better code might be:
    
    ```text
    A = 0
    B = 10
    C = 110
    D = 111
    ```
    
- Common symbols get shorter codes.
    
- Rare symbols get longer codes.
    
- Average message length decreases.
    

---

## 12. Prefix-free codes

- A prefix-free code is a code where no codeword is the prefix of another codeword.
    
- Example of prefix-free code:
    
    ```text
    A = 0
    B = 10
    C = 110
    D = 111
    ```
    
- Why this matters:
    
    - You can decode a sequence unambiguously.
        
- Example encoded message:
    
    ```text
    010110111
    ```
    
- You can parse it as:
    
    ```text
    0 | 10 | 110 | 111
    A | B  | C   | D
    ```
    
- Bad non-prefix-free example:
    
    ```text
    A = 0
    B = 01
    C = 011
    ```
    
- Problem:
    
    - If a message starts with `0`, you do not know whether it is A or the start of B or C.
        

---

## 13. Joint entropy

- **Joint entropy** measures the uncertainty of two variables together.
    
- Formula:
    
    $$H(X,Y) = -\sum_x \sum_y P(x,y)\log_2 P(x,y)$$
    
- Intuition:
    
    - It measures how much information is needed to describe both `X` and `Y`.
        
- If `X` and `Y` are independent:
    
    $$H(X,Y) = H(X) + H(Y)$$
    
- If `X` and `Y` are related:
    
    $$H(X,Y) < H(X) + H(Y)$$
    
- Why?
    
    - Because knowing one gives clues about the other.
        
- Example:
    
    - `X = whether clouds are dark`
        
    - `Y = whether it rains`
        
    - These are not independent.
        
    - Knowing clouds are dark reduces uncertainty about rain.
        

---

## 14. Conditional entropy

- **Conditional entropy** measures how much uncertainty remains about one variable after knowing another.
    
- Formula:
    
    $$H(Y|X) = H(X,Y) - H(X)$$
    
- Interpretation:
    
    - `H(Y|X)` means uncertainty in `Y` given that `X` is known.
        
- Example:
    
    - `Y = whether it rains`
        
    - `X = weather radar reading`
        
    - If radar is highly accurate, then knowing `X` greatly reduces uncertainty about `Y`.
        
    - So `H(Y|X)` is low.
        
- Extreme cases:
    
    - If `X` perfectly determines `Y`:
        
        $$H(Y|X) = 0$$
        
    - If `X` tells us nothing about `Y`:
        
        $$H(Y|X) = H(Y)$$
        

---

## 15. Mutual information

- **Mutual information** measures how much knowing one variable tells you about another.
    
- Formula:
    
    $$I(X;Y) = H(Y) - H(Y|X)$$
    
- Equivalent formula:
    
    $$I(X;Y) = H(X) + H(Y) - H(X,Y)$$
    
- Intuition:
    
    - Mutual information is uncertainty reduction.
        
    - It answers:
        
        - How much does `X` help predict `Y`?
            
- Example:
    
    - `X = smoke alarm sound`
        
    - `Y = fire exists`
        
    - If the alarm is reliable, mutual information is high.
        
    - If the alarm randomly goes off, mutual information is low.
        
- Important properties:
    
    - Mutual information is always non-negative.
        
    - It is symmetric:
        
        $$I(X;Y) = I(Y;X)$$
        
    - It is zero when variables are independent.
        

---

## 16. Mutual information vs correlation

- Correlation measures linear relationship.
    
- Mutual information measures general statistical dependence.
    
- This is important because two variables can have zero correlation but still be strongly related.
    
- Example:
    
    - Let `Y = X²`.
        
    - If `X` is symmetric around zero, linear correlation between `X` and `Y` may be close to zero.
        
    - But `Y` is fully determined by `X`.
        
    - Mutual information detects the dependence.
        
- Therefore:
    
    - Correlation is narrower.
        
    - Mutual information is more general.
        

---

## 17. KL divergence

- **KL divergence** measures how different one probability distribution is from another.
    
- Full name:
    
    - Kullback–Leibler divergence
        
- Formula:
    
    $$D_{KL}(P || Q) = \sum_x P(x) \log_2 \frac{P(x)}{Q(x)}$$
    
- Intuition:
    
    - It measures the extra surprise or extra coding cost when you use the wrong probability model.
        
- Suppose:
    
    - `P` is the true distribution.
        
    - `Q` is your model’s distribution.
        
- Then:
    
    - KL divergence tells you how inefficient it is to assume `Q` when reality is `P`.
        
- Important:
    
    - KL divergence is not symmetric.
        
    
    $$D_{KL}(P || Q) \neq D_{KL}(Q || P)$$
    
- Why this matters:
    
    - Mistaking a rare event for common is not the same as mistaking a common event for rare.
        

---

## 18. Cross-entropy

- **Cross-entropy** measures the average number of bits needed to encode data from the true distribution `P` using a model distribution `Q`.
    
- Formula:
    
    $$H(P, Q) = -\sum_x P(x)\log_2 Q(x)$$
    
- Relationship:
    
    $$H(P, Q) = H(P) + D_{KL}(P || Q)$$
    
- Meaning:
    
    - Cross-entropy = unavoidable uncertainty + penalty for using the wrong model.
        
- Why machine learning uses cross-entropy:
    
    - In classification, the model outputs probabilities.
        
    - Cross-entropy punishes the model when it assigns low probability to the correct answer.
        
- Example:
    
    - True label: cat
        
    - Model says:
        
        - cat: 0.90
            
        - dog: 0.05
            
        - bird: 0.05
            
    - Low loss.
        
    - Another model says:
        
        - cat: 0.01
            
        - dog: 0.98
            
        - bird: 0.01
            
    - High loss.
        

---

## 19. Channel: communication through noise

- A **channel** is a system that transmits information from sender to receiver.
    
- Examples:
    
    - phone line
        
    - radio signal
        
    - Wi-Fi
        
    - fiber-optic cable
        
    - satellite communication
        
    - DNA replication
        
    - human speech
        
    - writing
        
    - email
        
- Channels can be noisy.
    
    - Noise means the received message may differ from the sent message.
        
- Example:
    
    ```text
    Sent:     HELLO
    Received: H3LLO
    ```
    
- Information theory asks:
    
    - How much information can be transmitted reliably through a noisy channel?
        
    - How much redundancy is needed to correct errors?
        

---

## 20. Channel capacity

- **Channel capacity** is the maximum rate at which information can be transmitted reliably over a noisy channel.
    
- In simple terms:
    
    - Every channel has a speed limit.
        
    - Below that limit, reliable communication is possible with proper coding.
        
    - Above that limit, reliable communication becomes impossible.
        
- This is one of Shannon’s deepest results.
    
- Intuition:
    
    - Noise corrupts messages.
        
    - Redundancy can help correct errors.
        
    - But redundancy takes space.
        
    - Channel capacity tells us the best possible balance.
        

---

## 21. Noisy channel coding theorem

- Shannon’s noisy channel coding theorem says:
    
    - It is possible to communicate with arbitrarily low error if the transmission rate is below channel capacity.
        
    - It is impossible to communicate reliably above channel capacity.
        
- This is powerful because it says reliable communication is possible even with noise.
    
- Before Shannon, people often thought noise inevitably limited reliability directly.
    
- Shannon showed that clever coding can overcome noise up to a theoretical limit.
    
- Practical impact:
    
    - mobile phones
        
    - internet communication
        
    - deep-space probes
        
    - satellite links
        
    - Wi-Fi
        
    - error-correcting memory
        
    - QR codes
        
    - CDs and DVDs
        

---

## 22. Error detection and correction

### 22.1 Error detection

- Error detection tells you whether something went wrong.
    
- Example:
    
    - Add a parity bit.
        
    - If the number of 1s should be even but becomes odd, an error is detected.
        
- Problem:
    
    - Detection does not necessarily tell you how to fix the error.
        

### 22.2 Error correction

- Error correction adds enough redundancy that the receiver can infer the intended message.
    
- Example:
    
    - Instead of sending one bit:
        
        ```text
        1
        ```
        
    - Send it three times:
        
        ```text
        111
        ```
        
    - If received:
        
        ```text
        101
        ```
        
    - Majority vote says the original was probably `1`.
        
- This is simple but inefficient.
    
- Modern error-correcting codes are far more sophisticated.
    

### 22.3 Real-world examples

- QR codes still scan when partly damaged.
    
- CDs can play despite scratches.
    
- Spacecraft can send data across millions of kilometers.
    
- Internet packets can be checked and retransmitted.
    

---

## 23. Redundancy

- Redundancy means repeated or predictable information.
    
- Redundancy has two opposite roles:
    
    - In compression, redundancy is removed.
        
    - In error correction, redundancy is added.
        

### 23.1 Compression removes redundancy

- Example:
    
    ```text
    the the the the the
    ```
    
- Highly redundant.
    
- Can be compressed.
    

### 23.2 Error correction adds redundancy

- Example:
    
    ```text
    message + extra check bits
    ```
    
- Redundancy helps recover the original message if noise corrupts part of it.
    

### 23.3 The key tradeoff

- More redundancy:
    
    - better reliability
        
    - lower effective data rate
        
- Less redundancy:
    
    - higher speed
        
    - more vulnerability to errors
        

---

## 24. Information theory and probability

- Information theory is deeply tied to probability.
    
- Main relationship:
    
    - Probability describes uncertainty.
        
    - Information measures the reduction of uncertainty.
        
- If you know probabilities, you can calculate:
    
    - self-information
        
    - entropy
        
    - conditional entropy
        
    - mutual information
        
    - KL divergence
        
    - cross-entropy
        
- Without probability, information theory loses its mathematical foundation.
    

---

## 25. Information theory and Bayesian reasoning

- Bayesian reasoning updates beliefs using evidence.
    
- Information theory measures how much uncertainty evidence removes.
    
- Bayesian update:
    
    - Prior belief → observe evidence → posterior belief
        
- Information-theoretic interpretation:
    
    - Evidence is valuable when it changes your probability distribution.
        
- Example:
    
    - You suspect a machine may be faulty.
        
    - A test result changes your belief from:
        
        - 10% faulty
            
        - to 80% faulty
            
    - That test result carried significant information.
        
- If a test result does not change your beliefs, it carried little useful information.
    

---

## 26. Information theory and statistics

- Statistics often asks:
    
    - What model explains the data best?
        
    - How uncertain are we?
        
    - How much evidence supports one model over another?
        
- Information theory provides tools for these questions.
    

### 26.1 Maximum likelihood

- Maximum likelihood chooses the model that makes observed data most probable.
    
- Information-theoretic view:
    
    - It chooses the model that gives the shortest code length to the observed data.
        

### 26.2 AIC and model selection

- The Akaike Information Criterion uses information-theoretic ideas.
    
- It balances:
    
    - goodness of fit
        
    - model complexity
        
- Why?
    
    - A more complex model may fit current data better but generalize worse.
        
    - Information criteria try to avoid overfitting.
        

### 26.3 Sufficient statistics

- A statistic is sufficient if it preserves all information in the data relevant to a parameter.
    
- Example:
    
    - For some distributions, the sample mean contains all relevant information about a parameter.
        

---

## 27. Information theory and machine learning

- Information theory appears throughout machine learning.
    

### 27.1 Classification

- Cross-entropy loss is widely used for classification.
    
- It rewards assigning high probability to the correct class.
    

### 27.2 Decision trees

- Decision trees often use information gain.
    
- Information gain:
    
    $$IG = H(parent) - H(children)$$
    
- It measures how much a split reduces uncertainty.
    
- Example:
    
    - A split that separates cats from dogs well has high information gain.
        
    - A split that leaves classes mixed has low information gain.
        

### 27.3 Representation learning

- A good representation keeps useful information and discards irrelevant noise.
    
- Example:
    
    - In image recognition, the model should preserve information about objects.
        
    - It should ignore irrelevant details such as tiny lighting changes.
        

### 27.4 Bottlenecks

- The information bottleneck idea asks:
    
    - What compressed representation of `X` preserves the most information about `Y`?
        
- This is central to learning useful abstractions.
    

### 27.5 Generative models

- Generative models try to learn probability distributions over data.
    
- Good generative models assign high probability to realistic data and low probability to unrealistic data.
    
- This connects directly to entropy, likelihood, KL divergence, and cross-entropy.
    

---

## 28. Information theory and neural networks

- Neural networks can be viewed as systems that transform information.
    
- Input layer:
    
    - receives raw data
        
- Hidden layers:
    
    - transform data into internal representations
        
- Output layer:
    
    - produces predictions, probabilities, or generated outputs
        
- Information-theoretic questions:
    
    - How much information about the input is retained?
        
    - How much irrelevant noise is discarded?
        
    - How much information about the target is preserved?
        
    - Does the model compress representations as it learns?
        
- Practical connections:
    
    - cross-entropy loss
        
    - variational autoencoders
        
    - diffusion models
        
    - contrastive learning
        
    - self-supervised learning
        
    - representation learning
        

---

## 29. Information theory and language

- Language contains structure, predictability, and redundancy.
    
- Example:
    
    - In English, after the phrase:
        
        ```text
        peanut butter and
        ```
        
    - The next word is likely:
        
        ```text
        jelly
        ```
        
- Because language is predictable, it can be compressed and modeled.
    
- Language models exploit statistical structure:
    
    - common word sequences
        
    - grammar
        
    - semantic associations
        
    - context
        
    - long-range dependencies
        
- A language model is partly a probability model over sequences.
    
- It tries to assign high probability to plausible text and low probability to implausible text.
    

---

## 30. Perplexity

- **Perplexity** measures how uncertain a model is when predicting data.
    
- It is closely related to cross-entropy.
    
- Formula:
    
    $$Perplexity = 2^{H}$$
    
- Where `H` is cross-entropy in bits.
    
- Intuition:
    
    - Perplexity is like the effective number of choices the model is confused between.
        
- Example:
    
    - Perplexity = 10 means the model is roughly as uncertain as choosing among 10 equally likely options.
        
    - Lower perplexity usually means better prediction.
        
- In language modeling:
    
    - A lower perplexity model predicts text more confidently and accurately.
        

---

## 31. Information theory and cryptography

- Cryptography is about secrecy, uncertainty, and adversaries.
    
- Information theory helps define perfect secrecy.
    

### 31.1 Perfect secrecy

- A cipher has perfect secrecy if observing the encrypted message gives no information about the original message.
    
- Formally:
    
    $$I(Message; Ciphertext) = 0$$
    
- Meaning:
    
    - The ciphertext tells the attacker nothing about the plaintext.
        

### 31.2 One-time pad

- The one-time pad can achieve perfect secrecy if:
    
    - the key is truly random
        
    - the key is as long as the message
        
    - the key is used only once
        
    - the key is kept secret
        
- Problem:
    
    - Key management is difficult.
        

### 31.3 Compression before encryption

- Good encryption makes data look random.
    
- Random-looking data is hard to compress.
    
- Therefore, compression is usually done before encryption.
    

---

## 32. Information theory and physics

- Information theory connects deeply with physics, especially thermodynamics.
    
- In physics, entropy measures the number of microscopic states compatible with a macroscopic state.
    
- In information theory, entropy measures uncertainty over possible states.
    
- These are connected because:
    
    - uncertainty about microscopic states can be treated informationally.
        

### 32.1 Maxwell’s demon

- Maxwell’s demon is a thought experiment where a tiny demon appears to reduce entropy by sorting fast and slow molecules.
    
- The information-theoretic resolution involves the cost of acquiring, storing, and erasing information.
    

### 32.2 Landauer’s principle

- Landauer’s principle links information erasure to physical energy cost.
    
- It suggests information is not merely abstract.
    
- Information has physical consequences.
    

---

## 33. Information theory and biology

- Biology is full of information systems.
    

### 33.1 DNA

- DNA stores genetic information using four bases:
    
    - A
        
    - C
        
    - G
        
    - T
        
- Since there are four possible bases, each base can represent up to:
    
    $$\log_2 4 = 2 \text{ bits}$$
    
- But biological constraints and correlations affect actual information content.
    

### 33.2 Evolution

- Evolution can be viewed as a process that accumulates information about the environment through selection.
    
- Organisms embody information about what has historically worked for survival and reproduction.
    

### 33.3 Neural systems

- Nervous systems encode sensory information.
    
- Questions include:
    
    - How much information does a neuron carry?
        
    - How efficiently does the brain encode stimuli?
        
    - How does noise affect perception?
        

---

## 34. Information theory and economics

- Economics involves agents making decisions under uncertainty.
    
- Information is valuable when it reduces uncertainty relevant to action.
    

### 34.1 Market prices

- Prices can be viewed as information signals.
    
- A price compresses many dispersed facts:
    
    - supply
        
    - demand
        
    - expectations
        
    - scarcity
        
    - risk
        
    - preferences
        

### 34.2 Asymmetric information

- One party may know more than another.
    
- Examples:
    
    - used car sellers know more than buyers
        
    - borrowers know more about their risk than lenders
        
    - managers know more than shareholders
        
- Information asymmetry can cause:
    
    - adverse selection
        
    - moral hazard
        
    - market breakdown
        

### 34.3 Value of information

- Information has value if it changes decisions.
    
- Example:
    
    - A mining company pays for geological surveys.
        
    - The survey is valuable only if it changes drilling decisions or reduces uncertainty.
        

---

## 35. Information theory and engineering

- Engineering uses information theory wherever systems measure, transmit, store, or control data.
    

### 35.1 Communications engineering

- Core applications:
    
    - modulation
        
    - coding
        
    - noise reduction
        
    - signal processing
        
    - wireless networks
        
    - satellite communication
        

### 35.2 Control systems

- A controller needs information about the system state.
    
- Sensor noise limits control performance.
    
- Delayed or incomplete information can destabilize systems.
    

### 35.3 Environmental and civil engineering

- Information theory can apply to:
    
    - sensor networks
        
    - flood monitoring
        
    - rainfall prediction
        
    - water quality monitoring
        
    - uncertainty in models
        
    - risk-based infrastructure planning
        
- Example:
    
    - A stormwater sensor network should place sensors where they reduce the most uncertainty about flooding.
        
    - Mutual information can help choose sensor locations.
        

---

## 36. Information theory and maps / spatial data

- Spatial data often contains patterns and redundancy.
    
- Examples:
    
    - elevation maps
        
    - rainfall maps
        
    - land-use maps
        
    - soil maps
        
    - flood-risk maps
        
    - environmental constraint maps
        
- Information-theoretic questions:
    
    - Which spatial layer gives the most useful information?
        
    - Which regions are most uncertain?
        
    - Where should sensors be placed?
        
    - How much does one map layer explain another?
        
- Example:
    
    - Suppose you have:
        
        - soil type
            
        - slope
            
        - rainfall intensity
            
        - land cover
            
        - flood occurrence
            
    - Mutual information can estimate which variables are most informative about flood risk.
        

---

## 37. Maximum entropy principle

- The maximum entropy principle says:
    
    - When choosing a probability distribution under constraints, choose the distribution with maximum entropy.
        
- Why?
    
    - It is the least biased distribution consistent with what you know.
        
- Example:
    
    - If all you know is that a die has six sides and no other information, assume uniform probabilities:
        
        ```text
        P(1)=P(2)=P(3)=P(4)=P(5)=P(6)=1/6
        ```
        
- But if you know the die is biased, you should incorporate that constraint.
    
- The principle prevents you from pretending to know more than you actually know.
    

---

## 38. Minimum description length

- The Minimum Description Length principle says:
    
    - The best model is the one that compresses the data best.
        
- This means the best explanation balances:
    
    - model complexity
        
    - fit to data
        
- Overly simple model:
    
    - short model description
        
    - poor data fit
        
- Overly complex model:
    
    - excellent fit
        
    - long model description
        
    - may overfit noise
        
- Good model:
    
    - explains patterns compactly
        
    - avoids memorizing noise
        
- This connects information theory with scientific explanation.
    

---

## 39. Kolmogorov complexity

- Kolmogorov complexity measures the length of the shortest program that can produce a given object.
    
- Example 1:
    
    ```text
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    ```
    
- Short description:
    
    ```text
    print 'A' 32 times
    ```
    
- Low Kolmogorov complexity.
    
- Example 2:
    
    ```text
    7Gq92LpQx18VmNz4Bka0
    ```
    
- No obvious shorter description.
    
- Higher Kolmogorov complexity.
    
- Important difference:
    
    - Shannon entropy is about random variables and probability distributions.
        
    - Kolmogorov complexity is about individual objects and shortest descriptions.
        

---

## 40. Algorithmic information vs Shannon information

### 40.1 Shannon information

- Deals with probability distributions.
    
- Asks:
    
    - How surprising is this outcome under a distribution?
        
    - What is the average uncertainty of a source?
        

### 40.2 Algorithmic information

- Deals with individual strings or objects.
    
- Asks:
    
    - What is the shortest program that generates this object?
        

### 40.3 Example comparison

- Shannon view:
    
    - A random-looking string from a known random process has high entropy.
        
- Algorithmic view:
    
    - A string is complex if no short program can generate it.
        
- Both are related but not identical.
    

---

## 41. The entropy chain rule

- Entropy follows a chain rule:
    
    $$H(X,Y) = H(X) + H(Y|X)$$
    
- Meaning:
    
    - The uncertainty in `X` and `Y` together equals:
        
        - uncertainty in `X`
            
        - plus remaining uncertainty in `Y` after knowing `X`
            
- More generally:
    
    $$H(X_1, X_2, ..., X_n) = \sum_i H(X_i | X_1, ..., X_{i-1})$$
    
- This is important in sequence modeling.
    
- Example:
    
    - A sentence can be modeled word by word:
        
        ```text
        P(sentence) = P(word1) × P(word2|word1) × P(word3|word1,word2) ...
        ```
        
- Language models use this kind of structure.
    

---

## 42. Entropy rate

- Entropy rate measures average uncertainty per symbol in a sequence-generating process.
    
- Example:
    
    - A sequence of independent fair coin flips has entropy rate 1 bit per symbol.
        
- But English text has lower entropy rate than independent random letters because letters and words are predictable from context.
    
- Entropy rate matters for:
    
    - language modeling
        
    - speech compression
        
    - time-series analysis
        
    - genetic sequences
        
    - sensor streams
        

---

## 43. Markov chains and information

- A Markov chain is a process where the next state depends only on the current state, not the full past.
    
- Example:
    
    - Weather model:
        
        - tomorrow’s weather depends mostly on today’s weather
            
- Information theory asks:
    
    - How much does the current state tell us about the next state?
        
    - How uncertain is the future given the present?
        
- Conditional entropy in a Markov chain:
    
    $$H(X_{t+1}|X_t)$$
    
- If this is low:
    
    - the process is predictable.
        
- If this is high:
    
    - the process is noisy or chaotic.
        

---

## 44. Surprise vs meaning

- A crucial distinction:
    
    - Information theory measures surprise, not human meaning.
        
- Example:
    
    - Random string:
        
        ```text
        XQ7ZL9M2P
        ```
        
    - It may have high Shannon information.
        
    - But it may mean nothing to a person.
        
- Another example:
    
    - “I love you” may be meaningful emotionally.
        
    - But if expected in context, it may carry low Shannon surprise.
        
- Therefore:
    
    - Information theory is powerful but narrow.
        
    - It measures uncertainty reduction, not semantic value.
        

---

## 45. Semantic information

- Semantic information concerns meaning, truth, and relevance.
    
- Shannon information intentionally avoided meaning because he wanted a mathematical theory of communication.
    
- However, many modern fields try to connect Shannon information with meaning.
    
- Questions include:
    
    - When is information useful?
        
    - When does data represent something real?
        
    - How does a model form meaningful abstractions?
        
    - How does information guide action?
        
- Practical distinction:
    
    - Shannon information: how unpredictable is the message?
        
    - Semantic information: what does the message mean?
        
    - Pragmatic information: how does the message affect decisions?
        

---

## 46. Information and decision-making

- Information is valuable when it changes action.
    
- Example:
    
    - You are deciding whether to carry an umbrella.
        
    - A weather forecast is valuable if it changes your decision.
        
- If the forecast says what you already knew, it has little decision value.
    
- In decision theory:
    
    - The value of information depends on how much it improves expected outcomes.
        
- Information theory measures uncertainty reduction.
    
- Decision theory measures action value.
    
- Together they explain why some information is useful and other information is merely interesting.
    

---

## 47. Signal and noise

- A **signal** is the part of data that carries useful structure.
    
- **Noise** is random or irrelevant variation.
    
- Information theory helps separate signal from noise.
    
- Example:
    
    - A rainfall sensor records true rainfall plus measurement error.
        
    - The true rainfall is signal.
        
    - The measurement error is noise.
        
- But signal and noise depend on purpose.
    
- Example:
    
    - For a photographer, tiny image texture may be signal.
        
    - For a traffic detection system, the same texture may be irrelevant noise.
        

---

## 48. Rate-distortion theory

- Rate-distortion theory studies lossy compression.
    
- It asks:
    
    - How many bits are needed to represent data within an acceptable error level?
        
- Key tradeoff:
    
    - Lower bit rate means smaller file size.
        
    - But lower bit rate usually means more distortion.
        
- Example:
    
    - A high-quality JPEG uses more bits and has less distortion.
        
    - A low-quality JPEG uses fewer bits and has more distortion.
        
- Rate-distortion theory provides the theoretical limit for this tradeoff.
    

---

## 49. Fisher information

- Fisher information is related but distinct from Shannon information.
    
- It measures how much a random variable tells us about an unknown parameter.
    
- Example:
    
    - Suppose you measure a physical quantity with noisy instruments.
        
    - Fisher information tells you how much the measurements reveal about the true parameter.
        
- High Fisher information:
    
    - parameter can be estimated precisely.
        
- Low Fisher information:
    
    - parameter remains uncertain.
        
- Applications:
    
    - statistics
        
    - experimental design
        
    - physics
        
    - machine learning
        
    - signal processing
        

---

## 50. Common misconceptions

### 50.1 “More data always means more useful information”

- False.
    
- More data can mean more noise.
    
- Useful information depends on relevance and uncertainty reduction.
    

### 50.2 “Information theory measures meaning”

- Not directly.
    
- It measures uncertainty and surprise.
    

### 50.3 “Random data is always valuable”

- Not necessarily.
    
- Random data may have high entropy but no usefulness.
    

### 50.4 “Compression always loses data”

- False.
    
- Lossless compression preserves everything.
    
- Lossy compression discards details.
    

### 50.5 “Encrypted data is compressed data”

- False.
    
- Encrypted data may look random, but encryption and compression are different.
    

---

## 51. Worked example: entropy of a biased coin

- Suppose a coin has:
    
    - Heads: 0.9
        
    - Tails: 0.1
        
- Entropy:
    
    $$H(X) = -[0.9\log_2(0.9) + 0.1\log_2(0.1)]$$
    
- Approximate values:
    
    $$\log_2(0.9) \approx -0.152$$
    
    $$\log_2(0.1) \approx -3.322$$
    
- So:
    
    $$H(X) \approx -[0.9(-0.152) + 0.1(-3.322)]$$
    
    $$H(X) \approx 0.469 \text{ bits}$$
    
- Interpretation:
    
    - A biased coin has less than 1 bit of entropy.
        
    - You are less uncertain because Heads is very likely.
        

---

## 52. Worked example: information gain in a decision tree

- Suppose you are classifying emails as spam or not spam.
    
- Parent dataset:
    
    - 50 spam
        
    - 50 not spam
        
- Entropy is high because classes are evenly mixed.
    
- Now split by whether the email contains the word “prize.”
    
- Child group 1: contains “prize”
    
    - 40 spam
        
    - 5 not spam
        
- Child group 2: does not contain “prize”
    
    - 10 spam
        
    - 45 not spam
        
- The split creates more pure groups.
    
- Therefore uncertainty decreases.
    
- Information gain is positive.
    
- Meaning:
    
    - The word “prize” contains information about whether the email is spam.
        

---

## 53. Worked example: mutual information for rain and clouds

- Variables:
    
    - `X = cloudy or not cloudy`
        
    - `Y = rain or no rain`
        
- If clouds and rain were independent:
    
    - knowing clouds would not help predict rain.
        
    - mutual information would be zero.
        
- But in reality:
    
    - cloudy weather increases probability of rain.
        
- Therefore:
    
    - `I(X;Y) > 0`
        
- The stronger the relationship, the higher the mutual information.
    

---

## 54. Worked example: KL divergence intuition

- Suppose the true weather distribution is:
    
    ```text
    P(sunny) = 0.8
    P(rainy) = 0.2
    ```
    
- But your model says:
    
    ```text
    Q(sunny) = 0.5
    Q(rainy) = 0.5
    ```
    
- Your model is less accurate than the true distribution.
    
- KL divergence measures the penalty for using `Q` instead of `P`.
    
- If your model exactly matches reality:
    
    $$D_{KL}(P || Q) = 0$$
    
- If your model is very wrong:
    
    - KL divergence becomes larger.
        

---

## 55. Information theory as a way of thinking

- Information theory trains you to ask:
    
    - What is uncertain?
        
    - What reduces uncertainty?
        
    - What is predictable?
        
    - What is redundant?
        
    - What is noise?
        
    - What is the limit of compression?
        
    - What is the limit of communication?
        
    - What information is actually useful for prediction or action?
        
- This way of thinking applies widely:
    
    - engineering
        
    - statistics
        
    - machine learning
        
    - economics
        
    - biology
        
    - physics
        
    - decision-making
        
    - computer science
        

---

## 56. The big conceptual map

- Information theory can be organized around a few central concepts:
    

### 56.1 Uncertainty

- Measured by entropy.
    

### 56.2 Surprise

- Measured by self-information.
    

### 56.3 Dependence

- Measured by mutual information.
    

### 56.4 Wrong models

- Measured by KL divergence and cross-entropy.
    

### 56.5 Compression

- Limited by entropy.
    

### 56.6 Communication

- Limited by channel capacity.
    

### 56.7 Error correction

- Achieved by adding structured redundancy.
    

### 56.8 Learning

- Can be viewed as reducing uncertainty and building useful compressed representations.
    

---

## 57. Minimal formula sheet

- Self-information:
    
    $$I(x) = -\log_2 P(x)$$
    
- Entropy:
    
    $$H(X) = -\sum_x P(x)\log_2 P(x)$$
    
- Joint entropy:
    
    $$H(X,Y) = -\sum_x \sum_y P(x,y)\log_2 P(x,y)$$
    
- Conditional entropy:
    
    $$H(Y|X) = H(X,Y) - H(X)$$
    
- Mutual information:
    
    $$I(X;Y) = H(Y) - H(Y|X)$$
    
- Mutual information alternative:
    
    $$I(X;Y) = H(X) + H(Y) - H(X,Y)$$
    
- KL divergence:
    
    $$D_{KL}(P || Q) = \sum_x P(x)\log_2 \frac{P(x)}{Q(x)}$$
    
- Cross-entropy:
    
    $$H(P,Q) = -\sum_x P(x)\log_2 Q(x)$$
    
- Cross-entropy relation:
    
    $$H(P,Q) = H(P) + D_{KL}(P || Q)$$
    
- Perplexity:
    
    $$Perplexity = 2^H$$
    

---

## 58. Learning path

### 58.1 Beginner level

- Understand:
    
    - probability
        
    - logarithms
        
    - bits
        
    - entropy
        
    - compression intuition
        
- Practice:
    
    - calculate entropy of coins, dice, and simple distributions.
        

### 58.2 Intermediate level

- Understand:
    
    - joint entropy
        
    - conditional entropy
        
    - mutual information
        
    - KL divergence
        
    - cross-entropy
        
    - source coding
        
    - channel coding
        
- Practice:
    
    - implement entropy and mutual information in Python.
        
    - build a simple Huffman coder.
        
    - simulate a noisy binary channel.
        

### 58.3 Advanced level

- Understand:
    
    - rate-distortion theory
        
    - channel capacity
        
    - information bottleneck
        
    - maximum entropy models
        
    - Fisher information
        
    - Kolmogorov complexity
        
    - information geometry
        
- Practice:
    
    - implement error-correcting codes.
        
    - estimate mutual information from data.
        
    - apply information gain to decision trees.
        
    - study compression algorithms.
        

---

## 59. Simple Python projects to understand information theory

### 59.1 Entropy calculator

- Input:
    
    - list of probabilities
        
- Output:
    
    - entropy in bits
        
- Example:
    
    ```python
    import math
    
    def entropy(probs):
        return -sum(p * math.log2(p) for p in probs if p > 0)
    
    print(entropy([0.5, 0.5]))
    print(entropy([0.9, 0.1]))
    print(entropy([1/6] * 6))
    ```
    

### 59.2 Text entropy estimator

- Input:
    
    - a text file
        
- Process:
    
    - count character frequencies
        
    - calculate entropy per character
        
- What you learn:
    
    - English text is not random.
        
    - Some characters occur much more often than others.
        

### 59.3 Huffman coding toy implementation

- Build a small compressor using symbol frequencies.
    
- Observe:
    
    - common symbols get short codes.
        
    - rare symbols get long codes.
        

### 59.4 Noisy channel simulator

- Send bits through a simulated channel.
    
- Flip each bit with probability `p`.
    
- Add repetition coding and majority voting.
    
- Compare error rates.
    

### 59.5 Mutual information feature ranking

- Dataset:
    
    - features and labels
        
- Goal:
    
    - estimate which features contain the most information about the target.
        
- Example applications:
    
    - spam detection
        
    - rainfall prediction
        
    - flood-risk classification
        
    - customer churn prediction
        

---

## 60. How information theory connects to real systems

- A real information system usually has:
    

### 60.1 Source

- Generates messages.
    
- Example:
    
    - weather station
        
    - human speaker
        
    - camera
        
    - DNA sequence
        

### 60.2 Encoder

- Converts message into a transmissible or storable form.
    
- Example:
    
    - audio codec
        
    - text encoding
        
    - image compressor
        

### 60.3 Channel

- Carries the message.
    
- Example:
    
    - internet
        
    - radio
        
    - fiber optic cable
        

### 60.4 Noise

- Distorts the message.
    
- Example:
    
    - interference
        
    - packet loss
        
    - sensor error
        

### 60.5 Decoder

- Reconstructs the message.
    

### 60.6 Receiver

- Uses the message.
    
- This source-channel model is one of the most important mental models in engineering.
    

---

## 61. Summary in one nested outline

- Information theory
    
    - Studies uncertainty, information, compression, and communication.
        
    - Core unit:
        
        - bit
            
    - Core event-level measure:
        
        - self-information
            
    - Core distribution-level measure:
        
        - entropy
            
    - Core relationship measures:
        
        - joint entropy
            
        - conditional entropy
            
        - mutual information
            
    - Core model-mismatch measures:
        
        - KL divergence
            
        - cross-entropy
            
    - Core compression idea:
        
        - entropy limits lossless compression
            
    - Core communication idea:
        
        - channel capacity limits reliable transmission
            
    - Core reliability idea:
        
        - redundancy can detect and correct errors
            
    - Core learning idea:
        
        - good models reduce uncertainty and represent useful structure
            

---

## 62. Most important takeaways

- Information is reduction in uncertainty.
    
- Surprise is mathematically linked to low probability.
    
- Entropy is average uncertainty.
    
- Compression is possible when data has redundancy.
    
- No compression algorithm can beat entropy in the long run for lossless compression.
    
- Noisy communication can be reliable if transmission stays below channel capacity.
    
- Mutual information measures how much one variable tells us about another.
    
- KL divergence measures how costly it is to use the wrong probability model.
    
- Cross-entropy is central to machine learning because it penalizes confident wrong predictions.
    
- Information theory does not directly measure meaning, but it provides the mathematical foundation for reasoning about uncertainty, data, models, and communication.
    

---

## 63. Suggested next step

- To make this practical, the best next exercise is to build three tiny Python programs:
    
    - entropy calculator
        
    - text entropy estimator
        
    - noisy channel simulator
        
- These three projects make the abstract ideas concrete:
    
    - entropy → uncertainty
        
    - compression → redundancy
        
    - noisy channels → error correction and communication limits
