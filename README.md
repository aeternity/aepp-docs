aepps.com developer documentation

For `.md` files to be automatically linked in the sidebar, please use the following method being configured in `_data/nav.yaml`.

```
- section: Introduction
  subpages:
    - page:
        label: Home
        link: /
    - page:
        label: Installation
        link: /aepp-docs/aepp-sdk-docs/Installation.md

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
