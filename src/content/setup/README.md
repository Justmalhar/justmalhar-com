# Setup Content

This directory contains setup items for the /setup page.

Each item is an MDX file with the following frontmatter:

```yaml
---
title: "Tool Name"
category: "editor"  # hardware|os|editor|terminal|ai|browser|productivity|deploy
description: "Short description"
url: "https://example.com"  # optional
icon: "💻"  # optional emoji
order: 1  # sort order within category
---
```

The body contains a longer description of why you chose this tool.
