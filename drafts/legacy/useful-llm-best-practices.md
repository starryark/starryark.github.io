---
layout: post
title: Useful-LLM-Best-Practices
description: Here are some best practices for using LLMs that I found to be useful and often times neccessary to keep in mind when navigating complex tasks and intellectually challenging problems. 
categories: [How-to]
tags: [LLM, Best-Practices, Tips]
---
# Useful LLM Best Practices

## 1. Rule of Thumbs 

### Don't reinvent the wheel

If you asked LLM a question or to build something, assume a good human solution/template already exist (and fed into the LLM's training data). You can follow up with a prompt like this:

```text
Search in depth for existing open-source tools that perform the functions you described. Be very thorough with your search since I wish to give appropriate credit.

```

*Note: that telling LLM to be thorough with the search (and why it should be thorough) __usually__ makes it search more thorough.*

### Use XML Tags

Wrapping each content type in its own tag reduces misinterpretation and creates a clear hierarchy. 

* Use consistent, descriptive tag names, for example: `<context>...</context>`, `<task>...</task>`, `<instructions>...</instructions>`.
  
* wrap links in `<https://...>`.
  
* Provide necessary resources and documentation directly in the prompt, for example:

```text
Refer to the following Anthropic documentation on best practices of prompting: 

<https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices>

and ...

```

### Be Authoritative

Instead of saying, *"Do not use markdown,"* tell the model: *"OUTPUT IN PROSE!!!."* 

**Formatting steering:** If you want prose, write the prompt as prose.

*  Using ALL CAPS helps. Phrases like `"SEARCH AND EXPLAIN IN DEPTH"` or `"OUTPUT ONLY IN ..."` provide clear directives.

### Ask Me

You can tell LLMs to ask you to make decision or supplement additional information (especially useful in Claude Code or other coding agent).

1. **For example:** Add *"Ask me any clarifying questions before you begin"* or **"If you are uncertain, ask me."**
2. **Meta-prompting:** Paste the prompt and ask the model to critique and rewrite it. You can also use the **prompt enhancer** feature by many LLM providers.

---

## 2. Lost in Middle & Few-Shot 

### The ["Lost in the Middle"](  https://doi.org/10.48550/arXiv.2307.03172) Effect

In Long context, models attend best to the beginning and end of a prompt, but degrade in the middle.

* **Long Text Placement:** Put long documents and data near the top of the prompt, above your query and instructions. 
* **Quote-grounding:** For needle-in-a-haystack tasks, tell the model to *"quote the relevant parts of the documents first, then answer."*

### [Language Models are Few-Shot Learners](https://doi.org/10.48550/arXiv.2005.14165)

Providing examples is one of the single most reliable ways to steer format, tone, and structure.

* Show 3–5 examples of what "good" looks like.
* Or tell LLM to refer to a website, document, text etc.

---

## 3. Nuances 

### The Limits of Persona Prompting

While assigning a persona (e.g., *"You are an expert coder"*) helps structure tone and format, it does **not** unlock hidden capabilities.

* [**When “A Helpful Assistant” Is Not Really Helpful:**](https://arxiv.org/html/2311.10054v3) shows personas help with alignment tasks (writing, role-play), but for pretraining-dependent tasks (math, coding), they can produce worse results.

### Model Selection

* Use extended reasoning and State-of-the-Art (SOTA) models (e.g., `Gemini 3.1 Pro Extended`, `Claude 4.8 Opus Max`) for mission-critical tasks and searches. Use cheaper models for repeating similar, solved actions.
 
