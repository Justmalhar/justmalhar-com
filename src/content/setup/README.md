# Setup Content

MDX files in this directory power `/setup`.

## Frontmatter

```yaml
---
title: "Tool Name"
category: "editor"  # hardware | os | editor | terminal | ai | browser | productivity | deploy
description: "One-line description shown on the page"
url: "https://example.com"  # optional external link
icon: "code"  # SetupIcon name (see src/components/SetupIcon.astro)
order: 1  # sort order within category
---
```

Body text is optional (not currently rendered on the index; useful as notes for later detail pages).
