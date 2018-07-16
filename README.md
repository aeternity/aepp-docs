aepps.com developer documentation

<<<<<<< HEAD
For `.md` files to be automatically linked in the sidebar, please use the following method being configured in `_data/nav.yaml`.

```
# single page link
- section: Introduction
  link: /

# section with subpages, external links
- section: Online tools
  subpages:
    - page:
        label: Contract Editor
        link: https://contracts.aepps.com
        external: true
    - page:
        label: Blockchain Explorer
        link: https://explorer.aepps.com
        external: true

# single page link
- section: […]
  link: […]

# section with subpages
- section: […]
  subpages:
    - page:
        label: […]
        link: […]
    - page:
        label: […]
        link: […]

[…]
```

The `.md` files will be rendered at [https://dev.aepps.com](https://dev.aepps.com)
=======
For README.md files to be automatically indexed, please add the following at the very top of the file.

```
---
layout: page
title: [TITLE FOR SIDEBAR]
navigation: [NUMBER OF FILES + 1]
---
```

The README.md files will be rendered at [https://dev.aepps.com](https://dev.aepps.com)
>>>>>>> eb729b74ed45c402a061190a8f3ba147bad10be1
