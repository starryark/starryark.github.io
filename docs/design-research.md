# Design research and decisions

Updated October 20, 2026. This revision keeps the text-first layout adapted from Forrest Sheldon’s site, borrows the dense, dated structure of Shengyu Liu’s academic homepage (interestinglsy.github.io), and reorganizes the content around verifiable work. The primary audience, chosen by the author, is prospective collaborators and investors in AmadeusBio.ai.

## What the research found (October 2026)

Four parallel research passes covered: the frontier of AI doing research (Anthropic’s automated alignment researchers, AI results in mathematics, AI agents in biology); hiring and signaling since generative AI; personal websites that researchers and founders admire; and hiring in AI-for-biology. Their conclusions agree.

**Cheap now, so weak or harmful as signals**

- Fluent prose, tailored applications, and polished pages. After LLMs, employers stopped rewarding tailored writing and moved to signals that are hard to fake (Galdin and Silbert, arXiv:2511.08785; Cui, Dias and Ye, arXiv:2509.25054). YC calls generic claims weightless; Emergent Ventures rejects AI-written applications.
- Literature review, standard code, and hour-scale analyses. Agents score about 40–52% on BixBench and match the human baseline on Protocol QA.
- Hill-climbing a well-posed benchmark. Anthropic’s automated researchers outperformed 28 human researchers on that task (Aug 2026), and AlphaProof Nexus solved open problems for a few hundred dollars each. On its own, a leaderboard rank means less than it used to.
- Skill lists, buzzwords, inflated titles, and numbers without a source, date, or denominator.

**Scarce, so still credible**

- Choosing the problem and the measure. In Anthropic’s study, humans chose the failures and built the benchmarks, and seeding the agents with human ideas did not improve the search.
- Verification and evaluation design: catching overfitting, best-of-N inflation, and fabrication. Without its reliability modules, Google’s Co-Scientist fabricated key results in 46% of papers.
- Real data and wet-lab work. Every biology system reviewed still has humans running or authorizing the physical experiments.
- Getting from raw data to correct outputs end to end. The best agent scores 0.48 on the study-scale tasks of BixBench3.
- Honest reporting of limits and failures, which machine output tends to omit.
- Dated public artifacts with history: commits, releases, datasets, and posters with named coauthors.

## How the site applies it

| Finding                                                    | Element                                                                                                                                                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lead with a factual role line; less famous people need one | Homepage: a portrait, one sentence on what I founded and what it does, one on training, what I am open to, then email and primary profiles. The first work item plays its film in place. |
| Dates are the main trust device                            | Every entry sits in a dated ledger (IBM Plex Mono date column); the footer shows when the facts were last updated                                                                        |
| Evidence attached to each item                             | Each work entry lists its public evidence. Entries with nothing public say so.                                                                                                           |
| Verification and limits are the scarce skill               | Every full entry on `/work/` gives my **Role**, including what AI did, and **Limits** where there are any                                                                                |
| A rank alone is now cheap                                  | Competition results appear only once the AmadeusBio.ai report is public, with their phase and limits stated                                                                              |
| Show the method, not adjectives                            | “How I work with AI agents” opens with a line from the Molecular Animation principles. It follows with four practices, each from a public README or workflow, with links                 |
| Wet-lab work is a moat                                     | Both lab projects are listed with PIs, mentors, posters, and techniques; unpublished data are not shown                                                                                  |
| Say how the site is made                                   | `/colophon/` states how the site is built and where its facts come from                                                                                                                  |
| Legible to AI assistants                                   | Facts live in `src/profile.ts` and feed the visible pages, `llms.txt`, and ProfilePage JSON-LD, so they cannot drift apart. No hidden text.                                              |
| Hobbies show a person, but sit below the work              | One of my own paintings, with one line on illustration, visual novels, and crows, closes the homepage. Hugging Face, Discord, and Steam appear only on About.                            |

## Presentation

- The homepage keeps only what is strong: the intro, two selected items, the method, and outside work. Background lives on the CV. Writing returns to the homepage once there are posts worth featuring, and “Now” appears only when there is news.

- Source Sans Pro for text and IBM Plex Mono for dates and status labels, both self-hosted.
- White page, charcoal text, blue links, and a pale gray header. Dark mode uses the same tokens.
- Status labels are outlined, never filled: green for released, amber for interim results, teal for presented, gray for superseded. Each meets WCAG AA contrast in both themes.
- No hero art, gradients, or icons standing in for content. Images are evidence: a portrait, a Molecular Animation film (click to play, served from amadeusbio.ai with the GitHub release as fallback), and one of my own paintings.
- `/cv/` prints to one page of PDF and contains no phone number or student ID. Coursework is on the web page only. The build renders the same print stylesheet to `/cv.pdf`, so the download has no browser headers or footers. Its text extracts in reading order for résumé parsers; dates sit in a grid, not in positioned boxes, to keep it that way.
- Skills follow a survey of 51 AI-for-biology postings (October 2026). They are grouped lines in the postings' own terms, such as "Model Context Protocol (MCP)", "evals", and "CI/CD", with the most requested item first. Organism names (C. elegans) live in Experience, not Skills, and bare generics such as Git and Office tools are left out. Screening tools look for evidence across the whole CV, so the Founder entry uses the same terms.

## Excluded on purpose

- Phone number, student ID, and transcript. The GPA, honors, and verifiable diploma ID are published with the author’s consent.
- Unpublished lab data. Lab projects show only the poster title, coauthors, and techniques.
- Hobby datasets and models on Hugging Face. The profile is linked, but they are not featured as work.
- Anything the AmadeusBio.ai release rules keep private. Company facts are copied only from its public site and repositories.
- Credentials the author chose not to list.

## Open items

- Competition results wait until their AmadeusBio.ai report is published on amadeusbio.ai. Then add an entry to `src/profile.ts` that links the report.
- The About page is the author’s own prose. Any edits are proposed to the author and applied only with approval, as with the October 2026 revision.

## Earlier history

The September 2026 version replaced an ivory-and-terracotta design with oversized serif headings and decorative crow illustrations. That design stays retired. The original Chirpy source is preserved in the `chirpy-archive-2026-09-05` checkout and the repository history. `public/sw.min.js` loads `public/sw.js` to retire old Chirpy installations.
