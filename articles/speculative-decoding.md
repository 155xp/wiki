---
title: Speculative decoding
description: A technique that speeds up autoregressive language model inference by drafting tokens cheaply and verifying them in parallel with the full model.
updated: 2026-10-28
infobox:
  title: Speculative decoding
  Type: Inference acceleration technique
  Applies to: Autoregressive models, including transformer language models
  Introduced: 2022 (Leviathan, Kalman and Matias); 2023 (Chen et al., as speculative sampling)
  Precursor: Blockwise parallel decoding (2018)
  Output: Identical distribution to the target model
  Reported speedup: About 2–3× in the original papers
---

**Speculative decoding** is a method for making [[Large language model|large language models]] and other autoregressive models generate text faster without changing what they generate. A small, fast *draft* model proposes several next tokens, and the large *target* model checks all of them in a single forward pass, keeping the longest run it agrees with.[^leviathan] Because the acceptance rule is a form of rejection sampling, the tokens that come out follow exactly the target model's distribution.[^leviathan][^chen]

The idea was published independently by researchers at Google, who called it speculative decoding,[^leviathan] and at DeepMind, who called it speculative sampling.[^chen] It has since become a standard feature of inference engines and the subject of a large body of follow-up work.[^survey]

## Background

An autoregressive model produces one token per forward pass, and each pass depends on the previous token, so generating *K* tokens normally takes *K* sequential runs of the model.[^leviathan] For large models, each step is limited less by arithmetic than by moving the model's parameters from high-bandwidth memory to the accelerator, which leaves compute idle during decoding.[^medusa] Scoring several candidate tokens in one pass costs about the same wall-clock time as producing a single token, which is the slack speculative decoding exploits.[^chen]

An earlier approach, *blockwise parallel decoding*, predicted several future positions at once and backed off to the longest prefix validated by a scoring model. It reported up to a 2× reduction in decoding iterations with no loss in quality for greedy decoding.[^stern]

## Method

### Drafting

At each step a cheaper approximation model, often a smaller model from the same family, generates a short block of *γ* candidate tokens autoregressively. Leviathan et al. observed that hard language-modelling tasks often contain easier subtasks that a much smaller model approximates well.[^leviathan]

### Verification

The target model then runs once over the prefix plus all *γ* draft tokens, producing its own probability for every position in parallel. Each draft token *x* is accepted with probability min(1, *p*(*x*) / *q*(*x*)), where *p* is the target distribution and *q* is the draft distribution. At the first rejection, a replacement token is sampled from the normalised residual distribution max(0, *p* − *q*), and the rest of the draft is discarded. If every draft token is accepted, the target model's distribution at the next position yields one extra token for free.[^leviathan][^chen]

This modified rejection sampling guarantees that the output distribution matches the target model's, within hardware numerics,[^chen] so speculative decoding is *lossless*: it changes latency, not quality.

### Speedup

The gain depends on how often draft tokens are accepted and on how cheap the draft model is relative to the target. Leviathan et al. reported a 2–3× acceleration on T5-XXL with identical outputs,[^leviathan] and Chen et al. reported a 2–2.5× decoding speedup on the 70-billion-parameter Chinchilla model in a distributed setup.[^chen]

## Variants

Much follow-up work removes the need for a separate draft model or raises the acceptance rate.

- **Medusa** adds extra decoding heads to the target model that predict several future tokens, and verifies a tree of candidate continuations with tree-based attention. Its authors report over 2.2× speedup with a frozen backbone, and 2.3–3.6× when the heads and backbone are fine-tuned together.[^medusa]
- **EAGLE** drafts at the level of the model's second-to-top-layer features rather than tokens, and reports a 2.7–3.5× latency speedup on LLaMA2-Chat 70B while preserving the output distribution.[^eagle]
- **Lookahead decoding** is an exact, parallel decoding algorithm that needs no auxiliary draft model or data store, trading extra computation per step for fewer total decoding steps.[^lookahead][^lookahead]
- **Assisted generation** is the name used by the Hugging Face Transformers library for its draft-model implementation.[^hf]

A 2024 survey groups these approaches by how drafts are produced and how they are verified.[^survey]

## See also

- [[Large language model]]
- [[KV cache]]
- [[Beam search]]

[^leviathan]: Leviathan, Y.; Kalman, M.; Matias, Y. (2022). "Fast Inference from Transformers via Speculative Decoding". ICML 2023. [arXiv:2211.17192](https://arxiv.org/abs/2211.17192).
[^chen]: Chen, C.; Borgeaud, S.; Irving, G.; Lespiau, J.-B.; Sifre, L.; Jumper, J. (2023). "Accelerating Large Language Model Decoding with Speculative Sampling". [arXiv:2302.01318](https://arxiv.org/abs/2302.01318).
[^stern]: Stern, M.; Shazeer, N.; Uszkoreit, J. (2018). "Blockwise Parallel Decoding for Deep Autoregressive Models". NeurIPS 2018. [arXiv:1811.03115](https://arxiv.org/abs/1811.03115).
[^medusa]: Cai, T.; Li, Y.; Geng, Z.; Peng, H.; Lee, J. D.; Chen, D.; Dao, T. (2024). "Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads". [arXiv:2401.10774](https://arxiv.org/abs/2401.10774).
[^eagle]: Li, Y.; Wei, F.; Zhang, C.; Zhang, H. (2024). "EAGLE: Speculative Sampling Requires Rethinking Feature Uncertainty". [arXiv:2401.15077](https://arxiv.org/abs/2401.15077).
[^lookahead]: Fu, Y.; Bailis, P.; Stoica, I.; Zhang, H. (2024). "Break the Sequential Dependency of LLM Inference Using Lookahead Decoding". [arXiv:2402.02057](https://arxiv.org/abs/2402.02057).
[^hf]: Gante, J. (2023). "Assisted Generation: a new direction toward low-latency text generation". Hugging Face blog. [huggingface.co/blog/assisted-generation](https://huggingface.co/blog/assisted-generation).
[^survey]: Xia, H.; Yang, Z.; Dong, Q.; Wang, P.; Li, Y.; Ge, T.; Liu, T.; Li, W.; Sui, Z. (2024). "Unlocking Efficiency in Large Language Model Inference: A Comprehensive Survey of Speculative Decoding". [arXiv:2401.07851](https://arxiv.org/abs/2401.07851).
