# Website screenshots and purchase copy — 2026-11-04

The homepage and product illustrations were refreshed from current HelpMeLearn renderer components, using isolated synthetic learning data. These are interface examples, not live model evaluations or private customer sessions.

## Assets

- learning-home: `tests/fixtures/domain-workspace-ui.html?home-learning&home-shell&home-reference&theme=dark`; current Home, AppToolbar and JourneySidebar.
- learning-journey-dialogue / learning-dialogue: current JourneyWorkspace with a writing-habit discussion example.
- learning-journey-map / learning-journey-concepts: current ConceptMapPanel and its full-screen region overview, from the same example.
- learning-journey-records: current journey records panel. This is now separate from the domain records screenshot.
- domain-workspace-rc3-safe / domain-cognitive-map / domain-records: current AgentDomainWorkspacePanel; filenames preserved for existing references, not an RC3 version claim.
- value-compass: current ValueCompass component with built-in example directions.
- Capture fixtures for journey/domain are isolated copies in HelpMeLearn `.artifacts/site-capture/`, derived from `tests/fixtures/`, with synthetic content and no Vault/model access.
- Source PNGs remain editable inputs. `npm run images:optimize` regenerates lossless WebP renditions and the hashed manifest. Tests compare source hashes to prevent replacing a PNG without refreshing served assets.
- Legacy interest-compass / concept-graph PNGs are not referenced by current product pages. Brand icons, contact QR and social illustration were checked; no product-version claim requires replacing those assets.

## Content

- Download: free allowance, primary download action, platform/version/size; installation and hash details collapsed.
- Purchase: price, duration and device limit in one shared component; model charges and no auto-renewal remain visible.
- Pricing: activation, expiry, data access and independent Skill use available in FAQ.
- Removed repeated licensing paragraphs and the obsolete stage 3/4 poster label. Guides now describe the same writing/feedback example shown in their screenshots.
- No change to licensing rules, shop URLs, downloads or release metadata.

## Verification

Production build / TypeScript and 25 checks pass. Browser checks at 1440 and 390 px cover home, pricing and download: no horizontal overflow, pricing links and visible model-charge notes checked. Existing Windows static-preview RSC prefetch 404s are distinct from image loading; public deployment is validated separately.
