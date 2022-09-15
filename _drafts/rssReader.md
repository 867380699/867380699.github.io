---
layout: post
title: "rssReader"
date: 2021-01-14
---

# 功能

- 订阅源管理
  + [x] 增删改查
  + 分组
  + 更新内容
    * 手动/自动
- 订阅列表
  + 展示
    * 分订阅源配置
  + 查看详情
  + [x] 已读/未读/星标
  + [x] 访问源链接
- 详情页
  - 内容
    + 文字
    + 图片
      * Gallery - PhotoSwipe
      * 下载
    + 视频
    + [x] 直达链接
- [x] 本地存储 *Dexie*
- 跨平台
- 多端数据同步
  + 账号
- 配置
- 清理缓存
- 导入/导出
- 保存到手机

# MVP
- 订阅源管理
  + [x] 增删查
  + 更新内容
    * 手动
    * [x] 自动
- 订阅列表
  + [x] 展示
  + [x] 查看详情
  + [x] 已读/未读
  + [x] 收藏



# Path


# 服务端

# 技术栈

- TypeScript
- Vue3
- RxJS
- Ionic
- Tailwind
- pnpm
- lodash
- vite
- vueuse
- unplugin-vue-component
- Dexie
- date-fns
- cloudflare
- Electron
- Tauri

# Draft

```js
// url
/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/
```

缓存策略

- 每个 `FeedItem` 缓存第一张图片
- 最常浏览的 `3` 个 `Feed` 缓存 `3` 个 `Item` 的图片


# Lib

> <https://github.com/cure53/DOMPurify>
> <https://tailwindcss.com/>

> dexie

## dexie

```js
db.friends.put(
  name: 'catalina',
  age: 20,
  picture: await getBlob('catalina.png')
)
```

> <https://dexie.org/docs/API-Reference#query-items>

### Pro/Con

- `LiveQuery`

- 没有 `GroupBy`
- `TypeScript` 支持还不够完善

## Ionic

- router path 不同就会创建新的实例，即便只改了 router params

# 调研

`localStorage` 上限约 `5M`
`IndexedDB` 的上限很高

- `Node`
  + `nodeType`
    * `1` - element
    * `2` - attribute
    * `3` - text
    * `4` - CDATA section
    * ...
  + `nodeName`
    * `#cdata-section`
    * `Element` *tagName*
      * `IMG`
    * `#text`

`fetch` 获取图片不能渐进加载

- `JPEG`
  + Magic Code `FFD8FF`

| --- | --- | --- | --- | --- |
| `FF` `C0` | `00` `11` | `08`      | `02` `22` | `02` `09` |
| Marker    | Length    | Precision | Height    | Width     |

- `PNG`
  + `Filter` -> `LZSS` -> `Huffman`
- `GIF`

- `ServiceWorker`
  + opaque response
    * 跨域的图片请求无法被缓存
    * status - `0`
    * chrome 上每个 `opaque response cache` 会占用大约 `7M` 的空间

# 表结构

- feed
  + id - INTEGER PRIMARY KEY
  + title - TEXT
  + description - TEXT
  + link - TEXT
  + imageUrl - TEXT

- feedItem
  + id
  + title
  + description
  + link


# 设计

- 主 Feed 流
  + Sticky Avatar + Title + Date

# RSS SPEC

## 2.0