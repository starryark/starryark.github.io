---
layout: post
title: Practical Paradigm
description: 
categories: []
tags: []
---


---

## 5. The Paradigm Shift: "Prompting as the Bottleneck"

The industry is moving from viewing code as the bottleneck to viewing the **prompt** (or specification) as the bottleneck.

### The "Software 3.0" Concept

* **Andrej Karpathy:** Argues that prompts are the new programs, natural language replaces programming languages, and the LLM is a new kind of computer. ("Vibe coding").
* **Sean Grove:** Asserts that we should stop treating prompts as ephemeral artifacts. Specifications, not code, become the primary engineering artifact.

> *"Throwing away the prompt and keeping only the code is like throwing away the source code and keeping the binary."*

### Context & Harness Engineering

* **Recycling Prompts:** Feel free to recycle chunks of a prompt or feed the same specification to different models. A spec can target multiple architectures.
* **Evolving Terminology:** "Prompt engineering" (2022–2024) is giving way to "context engineering" (2025) and "harness engineering" (2026+). The real skill is providing all the context needed for a task to be plausibly solvable.

---

## 6. Verification: The Ultimate Bottleneck

### The Math Case (Terence Tao)

In Terence Tao's formalization of the Prime Number Theorem, the machine wasn't the bottleneck—human usability and specification were. AI can produce arguments that look polished but hide weak steps.

* **Formal Verification:** Using languages like Lean guarantees correctness line-by-line.
* This objective verifier is what makes *"recycling the prompt across models"* safe.
* *Caveat:* Framing is load-bearing. How you frame the math definitions interacts with the model's training data.

### Jason Wei's Verifier's Law

> *"Any task that is possible to solve and easy to verify will be solved by AI."*

* **The Asymmetry of Verification:** Tasks are often far easier to check than to solve (e.g., Sudoku).
* The paradigm of "prompting as the bottleneck" is strongest where a cheap, objective verifier exists (Lean for math, compilers for code).
* Where no verifier exists (prose, strategy, design), the bottleneck quietly moves from writing the output to **reviewing** it (Brandolini's Law).

---

## 7. Core Best Practices for the New Paradigm

If you adopt the "prompt as source artifact" stance, follow these rules:

1. **Treat specs as versioned code:** Store them, diff them, and code-review them. Editing the spec should propagate through the system.
2. **Be intent-first and model-agnostic:** Write the spec clearly, then run it on a cheap model for routine work and a frontier model for hard parts.
3. **Regenerate, don't patch:** If the output is flawed, fix the source prompt and "recompile" (regenerate). Hand-patching AI output is a bad habit.
4. **Build or borrow a verifier:** Lean heavily on tests, JSON schemas, type checkers, or eval harnesses because generation is stochastic.
5. **Calibrate human involvement:** Auto-loop where a verifier exists; keep a human reviewing where one doesn't.
