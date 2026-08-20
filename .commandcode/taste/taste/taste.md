# Taste
- Sends very short, terse instructions ("Continue", "Lets go", "Subagent", single letters) and expects the agent to carry an established plan forward autonomously without re-confirming each step. Confidence: 0.7
- Prefers placeholder content over blocking on real content — asked to "add placeholder i will change later" rather than supplying final copy/images up front. Confidence: 0.8
- Drives development through the superpowers workflow: `/superpowers:brainstorming`, then a written plan executed via implementation + review subagents. Confidence: 0.7
- Expects finished work pushed to their GitHub; specified a private repo for the personal project. Confidence: 0.6
- Self-identifies as a product designer and design engineer; favors a very minimal aesthetic (asked for a "very minimal" hero-only portfolio page; during review asked to remove both placeholder nav links and the entire hero bio/social-button block). Confidence: 0.75
- Uses Figma as the design source of truth — shares Figma links when requesting an implementation. Confidence: 0.6
- Default web stack: React + Next.js (App Router, TypeScript), with three.js / React Three Fiber for hero-section animation. Confidence: 0.6
rts (selector, intent "remove"/"change") instead of describing edits in prose. Confidence: 0.6
- Removes non-functional placeholder nav links (href="#") during review rather than leaving dead links in the UI. Confidence: 0.5
