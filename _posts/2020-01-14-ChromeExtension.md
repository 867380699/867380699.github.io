---

layout: post
title: "Chrome 插件"
date: 2020-01-14

---

# Path
Windows
`C:\Users\[login_name]\AppData\Local\Google\Chrome\User Data\Default\Extensions`

Mac
`./Library/Application Support/Google/Chrome/Default/Extensions/`

# manifest.json

Every extension has a `manifest.json`, that provides important information.

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 2
}
```

> https://developer.chrome.com/extensions/manifest