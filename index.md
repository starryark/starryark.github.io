---
layout: page
title: In here we met, Nice to Meet You!
---

> *Internet is huge, thank you for visiting here.*

---

<style>
.timeline-wrapper {
    /* UCSD-derived accent palette (sampled from the seal SVG) */
    --accent-1: #182b49; /* UCSD navy */
    --accent-2: #c69214; /* UCSD gold */
    --accent-3: #2c4a7c; /* lightened navy */
    --accent-4: #8a6914; /* deep bronze */
    --accent-5: #e0a838; /* warm light gold */

    --rail-color: #e6e8eb;
    --ring-color: #ffffff;
    --muted: #6c757d;

    position: relative;
    padding-left: 1.75rem;
    margin: 2.25rem 0;
    list-style: none;
    border-left: 3px solid var(--rail-color);
}

.timeline-wrapper li {
    --accent: var(--accent-1);
    position: relative;
    margin-bottom: 2.5rem;
    padding-left: 0.25rem;
}

.timeline-wrapper li:last-child {
    margin-bottom: 0;
}

.time-label {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.78rem;
    color: var(--accent);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 0.4rem;
}

.time-label::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
}

/* Ringed accent dot, vertically centered on the time-label so it sits next to
   the date text regardless of the entry's flex layout. */
.time-label::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    left: calc(-2rem - 8.5px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--accent);
    border: 3px solid var(--ring-color);
    border-radius: 50%;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 45%, transparent);
}

.timeline-title {
    font-weight: 700;
    font-size: 1.15rem;
    line-height: 1.3;
    margin-bottom: 0.4rem;
}

.timeline-content {
    margin: 0;
    line-height: 1.6;
    color: var(--muted);
}

/* Two-column row inside an entry: text left, emblem right */
.timeline-entry {
    display: flex;
    align-items: center;
    gap: 1.25rem;
}

.timeline-text {
    flex: 1;
    min-width: 0;
}

.timeline-emblem {
    flex: 0 0 96px;
    width: 96px;
    height: 96px;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

@media (max-width: 576px) {
    .timeline-entry {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
    }
    .timeline-emblem {
        flex: 0 0 auto;
        width: 80px;
        height: 80px;
        align-self: flex-start;
    }
}

/* System-preference dark mode */
@media (prefers-color-scheme: dark) {
    .timeline-wrapper {
        /* Lighten navy-family accents so the dot reads against the dark surface */
        --accent-1: #6b88b8;
        --accent-3: #9ab5dd;
        --rail-color: #3a3f45;
        --ring-color: #1b1f22;
        --muted: #9aa0a6;
    }
    .timeline-emblem {
        filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.65));
    }
}

/* Chirpy manual toggle: explicit dark */
html[data-mode="dark"] .timeline-wrapper {
    --accent-1: #6b88b8;
    --accent-3: #9ab5dd;
    --rail-color: #3a3f45;
    --ring-color: #1b1f22;
    --muted: #9aa0a6;
}
html[data-mode="dark"] .timeline-emblem {
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.65));
}

/* Chirpy manual toggle: explicit light (overrides prefers-color-scheme when user forces light) */
html[data-mode="light"] .timeline-wrapper {
    --accent-1: #182b49;
    --accent-3: #2c4a7c;
    --rail-color: #e6e8eb;
    --ring-color: #ffffff;
    --muted: #6c757d;
}
html[data-mode="light"] .timeline-emblem {
    filter: none;
}
</style>
<ul class="timeline-wrapper">
    <li style="--accent: var(--accent-1);">
        <div class="timeline-entry">
            <div class="timeline-text">
                <div class="time-label">2026 - Current</div>
                <div class="timeline-title">AmadeusBio.ai</div>
                <p class="timeline-content">Developing agentic system for bioinformatic analysis.</p>
            </div>
            <a class="timeline-emblem img-link"
               href="https://www.amadeusbio.ai"
               target="_blank"
               rel="noopener"
               aria-label="AmadeusBio.ai (opens in new tab)"
               style="background-image: url('{{ '/assets/img/AmadeusBio_Logo_UpperRight.svg' | relative_url }}'); background-size: 80%; filter: none;"></a>
        </div>
    </li>
    <li style="--accent: var(--accent-1);">
        <div class="timeline-entry">
            <div class="timeline-text">
                <div class="time-label">2023 - 2025</div>
                <div class="timeline-title">B.S. Molecular and Cell Biology</div>
                <p class="timeline-content">University of California, San Diego. Cum Laude</p>
            </div>
            <a class="timeline-emblem img-link"
               href="https://ucsd.edu"
               target="_blank"
               rel="noopener"
               aria-label="University of California, San Diego (opens in new tab)"
               style="background-image: url('{{ '/assets/img/Seal_of_the_University_of_California,_San_Diego.svg' | relative_url }}');"></a>
        </div>
    </li>
</ul>

---

### What I am up to:

After graduation, I had been exploring around with programming, and I am especially interested in agentic application in biological research setting. 

I had a lot of fun learning and playing around with coding, and two free resources I found especially useful are: [MIT Missing Semester](https://missing.csail.mit.edu/) and [Anthropic Academy](https://anthropic.skilljar.com/).

I am also attending lots of neuroscience, machine learning and biology seminars on and near UC San Diego, I learnt a lot from the talks given by various people.

---

### How to contact me:

I live near UC San Diego campus, and you can message me through email, discord or even Steam chat that is on the bottom-left corner of this website. 

---

### Has AI changed my life:

Yeah, I will say definitely. AI changed many micro and macro aspects of my life.

Micro:

1. As opposed to "reading" papers, now I listen to paper narrated by AI walking, biking, sitting etc. using [Paper2Audio](https://www.paper2audio.com/). And I found myself able to go through a magnitude more paper in a week.
2. I found chatting with LLMs a more efficient learning method than what I was used to (flashcards, review videos, doing homework etc.). And I gave up taking notes completely since I found reviewing notes really inefficient when almost all course materials are digitized.
3. AI made my internet search much more enjoyable. Previously I often spend hours scrolling through search engine optimized junks even for a single piece of information. This is especially horrible with Chinese internet, and LLMs allows me to learn much more knowledge that would otherwise been buried under trash.

Macro:

1. LLMs forced me to seriosuly question the value of memorization, when looking up knowlege become extremely accessible. Thus I want to pivot towards learning skills over recalls, which makes assessments including MCAT seems even more absurd for me.
2. I feel more comfortable navigating novel areas of knowledge on my own, without systematic or institutional training (often times there are none because of novelty). I truly felt universities lags significantly behind in knowlege about AI, yet many professors I saw seems complacent about their ignorance. This probably exacerbated my authority issues and I found my previous ivory tower dream delusional.

---
Browse my [posts](/posts/) or learn more [about me](/about/).
