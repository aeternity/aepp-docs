aepps.com developer documentation

For .md files to be automatically linked in the sidebar, please add the following properties to `_data/nav.yaml`.

```
- section: Introduction
  subpages:
    - page:
        label: Home
        link: /
    - page:
        label: Installation
        link: /aepp-sdk-docs/Installation.md

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

The .md files will be rendered at [https://dev.aepps.com](https://dev.aepps.com)
