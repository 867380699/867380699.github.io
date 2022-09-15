---

layout: post

---

- `Safari` not support `WebP`
- What’s the best lossless image format? Comparing PNG, WebP, AVIF, and JPEG XL
  + <https://siipo.la/blog/whats-the-best-lossless-image-format-comparing-png-webp-avif-and-jpeg-xl>
  + OxiPNG - 基于 `Rust` 的图片压缩工具，非常快
  + WebP - 出色的无损压缩，兼顾压缩率和效率
- 我优化了进度条，页面性能竟提高了70%
  + <https://juejin.cn/post/6976810016930005029>
  + `animation-play-state: running/pause;`
  + chrome > devtools > performance > EventLog
  + `transform` 启用 `GPU` 加速
- 为什么现在我更推荐 pnpm
  + https://juejin.cn/post/6932046455733485575
  + `pnpm`
- warriorjs
  + https://github.com/olistic/warriorjs
  + https://warriorjs.com
- 命令行功夫
  + https://member.selfhostedserver.com/kungfu/
  + 一些命令行指令
  + inxi - print system information
  + trans - command-line translator
  + fx - Command-line JSON processing tool
- HapiGo 2.0：拼音搜索支持最好的高颜值启动神器
  + https://sspai.com/post/69896
- SKATELAB - 滑板实验室
  + https://mp.weixin.qq.com/s/EgEHE0SO03Ml42ejxHZung
- 正确开启Mockjs的三种姿势：入门参考（一）
  + https://www.cnblogs.com/soyxiaobi/p/9846057.html
  + ```js
      // express 跨域问题
      app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
    ```
- queries the Unicode database from the commandline.
  + https://github.com/arp242/uni
  + ```sh
      # search emoji
      uni e zodiac
      # > ♈	Aries              (ram, zodiac)
      # > ♉	Taurus             (bull, ox, zodiac)
      # > ...
    ```
- 在组件上使用 v-model
  + https://juejin.cn/post/6889988292482662413
  + `v-model:checked="form.checked"`
- 开源字体
  + dejavu
- MagicaVoxel
- Townscaper
  + https://oskarstalberg.com/Townscaper/
- 个人博客
  + https://unsafe.sh
  + 安全相关的比较多
- 博客软件
  + 小宇宙
- GIF 工具
  + https://ezgif.com/optimize
  + GIF Maker, Video to GIF, Resize, Rotate, Crop, Cut, Optimize, Effects, Split, Add text, WebP, APNG, AVIF
- Evrone 对 尤雨溪 的采访
  + https://mp.weixin.qq.com/s/uOHnWIkP0I0VDZCV2kOmsA
  + 可参考的复杂 Vue 项目
    * vue-dev-tool
    * vue-cli ui 
- 个人博客
  + https://hellogithub.com
  + 主要分享 Github 上的项目
- Github 项目
  + https://github.com/YJLAugus/Inios
  + 从 0 开始开发一个操作系统
- 有趣的网站
  + https://www.templatemaker.nl/zh-cn/
  + 收录了各种纸盒子的制作方法
- 有趣的网站
  + https://magi.com
  + 人工智能驱动的搜索引擎（知识引擎）
- windows 工具
  + PowerToys
  + https://github.com/microsoft/PowerToys
  + 文档 https://docs.microsoft.com/zh-cn/windows/powertoys/
  + 窗口置顶，保持唤醒，颜色选取，窗口管理，批量图片 Resize，键盘映射，查找鼠标，批量重命名，启动器
- 工具
  + https://dict.hjenglish.com/
  + 沪江小D
  + 查词、翻译
  + 英语，日语，韩语，法语，德语，西语
- JS 教程
  + 《现代 JavaScript 教程》视频课
  + https://github.com/easychen/onlytech-javascript-info
- 有趣的项目
  + 微博热搜榜，记录从 2020-11-24 日开始的微博热门搜索。每小时抓取一次数据，按天归档。
  + https://github.com/justjavac/weibo-trending-hot-search
- 有趣的项目
  + 可视化的手写识别
  + https://okdalto.github.io/VisualizeMNIST_web/
- 舞蹈教程
  + 律动训练课
  + https://www.bilibili.com/video/BV1kK4y1V7py?p=1
- JS 明星项目列表 2021
  + 2021 JavaScript Rising Stars
  + https://risingstars.js.org/2021/en#section-all
- 前端项目
  + JS 状态机
  + https://github.com/jakesgordon/javascript-state-machine
- 微软的 GO 教程
  + https://docs.microsoft.com/zh-cn/learn/paths/go-first-steps/
- 有趣的网站，前端
  + https://jsisweird.com
- Rust 教程
  + https://rust-guide.budshome.com/2-advise.html
  + 共计 27 章
- Rust 教程
  + actix-web 中文文档
  + https://actix-web.budshome.com
- 许多 Rust 相关的文档
  + https://books.budshome.com
- MIT 深度学习教程
  + https://github.com/lexfridman/mit-deep-learning
  + collection of tutorials for MIT Deep Learning courses
- Spring 项目
  + https://github.com/lihengming/spring-boot-api-project-seed
  + 基于Spring Boot & MyBatis的种子项目
- ZSH AI 插件
  + https://github.com/tom-doerr/zsh_codex
  + OpenAI's powerful Codex AI
- pinia
  + Vue 状态库
  + https://pinia.vuejs.org/introduction.html
- 参考项目
  + Zettlr - A Markdown Editor for the 21st century.
  + https://github.com/Zettlr/Zettlr
  + Vue + Electron
- 博客
  + 腾讯云数据库 TencentDB
  + https://cloud.tencent.com/developer/user/1002332
  + 数据库，MySQL，SQL，Redis，MongoDB
- 前端库
  + https://github.com/tauri-apps/tauri
  + Electron alternative, build on Rust
- 前端资讯
  + bestofjs
  + https://bestofjs.org
  + 前端项目的 Github Trending，日榜，周榜，月榜，年榜
- 工具
  + https://mremoteng.org
  + 远程连接工具，开源
- 有趣的项目
  + 赫蹏 - 专为中文网页内容设计的排版样式增强
  + https://mremoteng.org
  + https://github.com/sivan/heti
  + 用于排版文言文，诗词
  + 特色功能：行间距，竖排版
  + 《中文排版需求》：https://w3c.github.io/clreq/
- 信息源
  + Linux 中国
  + https://linux.cn
- 前端项目
  + turborepo - blazing fast build system for `JavaScript`/`TypeScript` monorepos
  + https://turborepo.org
  + https://github.com/vercel/turborepo
- 资源
  + LoreFree-去中心化免费电子书共享社区
  + https://ebook2.lorefree.com
  + 可下载电子书和论文
  + 区块链技术，IPFS存储协议
- 资源
  + 自 2009 年起免费图书馆
  + https://zh.z-lib.org
- 资源
  + Project Gutenberg - a library of over 60,000 free eBooks
  + https://www.gutenberg.org
- 资源
  + 英文小说网
  + http://novel.tingroom.com
- 博客
  + 王垠
  + http://www.yinwang.org
- 前端游戏
  + http://www.wesane.com
  + 小蝌蚪 - http://www.wesane.com/game/921/
  + 2022 年初已有 800+ 个小游戏
- 政府信息源
  + 工业和信息化部网络安全威胁和漏洞信息共享平台
  + https://cstis.cn
  + 漏斗预警，权威发布
- windows 工具
  + TaskbarX
  + https://github.com/ChrisAnd1998/TaskbarX
  + win11 还原 win10 时期的 Taskbar
- 好看的网页
  + jetbrains - fleet
  + https://www.jetbrains.com/zh-cn/fleet/
- 前端库
  + tween.js - engine for easy animations
  + https://github.com/tweenjs/tween.js
  + http://tweenjs.github.io/tween.js/
- 资讯站
  + 前端早早聊
  + https://www.zaozao.run
  + https://www.zaozao.run/posts
- 前端库
  + http://tether.io
  + https://github.com/shipshapecode/tether
  + tether - popper.js alternative
- 前端库
  + JSHint, A Static Code Analysis Tool for JavaScript
  + https://github.com/jshint/jshint
- 在线工具
  + https://versus.com/cn
  + 万物皆可对比
  + 手机，平板，相机，CPU，显卡，路由，耳机
- 在线工具
  + https://wikidiff.com
  + 比较单词
- Info
  + http://www.kailing.pub/raft/index.html
  + Raft 容易理解的 Distributed Consensus 分布式共识算法
- 文章
  + https://markodenic.com/html-tips/
  + `<details>` & `<summary>`
- 文章
  + https://pustelto.com/blog/css-vs-css-in-js-perf/
  + runtime CSS-in-JS can have a noticeable impact on your webpage.
  + build-time CSS-in-JS
- 工具
  + Free Universal Database Tool
  + https://dbeaver.io
- 在线工具
  + 数列规律查询
  + https://oeis.org
- Awesome
  + 摄影，插画，矢量图，视频，图案，纹理，字体，图标，色板，模板
  + https://github.com/neutraltone/awesome-stock-resources
- 文章
  + 你知道的 JavaScript 知識都有可能是錯的
  + https://blog.huli.tw/2022/01/30/how-to-validate-javascript-knowledge/
  + JS 规范
  + https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
  + JS 源码
  + https://github.com/v8/v8
- 资源
  + 片库 - 电影，剧集，动漫
  + https://www.btnull.org
- 资源
  + 4K UHD破解蓝光原盘电影
  + https://www.hao4k.cn/4KUHD/
- 工具
  + btop - 命令行资源监视器
  + https://github.com/aristocratos/btop
- 项目
  + vsCode todo
  + https://github.com/usernamehw/vscode-todo-md
  + todoItem `+Project` `#tag` `@context`
  + `(A)` - priority
- 博客
  + github 官方
  + https://github.blog
- 前端项目
  + Color Thief - 图片色板提取
  + https://github.com/lokesh/color-thief
  + [demo page](https://lokeshdhakar.com/projects/color-thief/)
- 工具项目
  + PlayCover - Run iOS apps & games on M1 Mac
  + https://github.com/iVoider/PlayCover
- 工具
  + PearOCR
  + https://pearocr.com/#/
  + 本地运算，无上传，WASM
- 工具
  + Pandoc - 万能文本格式转换
  + https://pandoc.org/
- 政府
  + 浙江省行政处罚结果信息公开
  + https://www.zjzwfw.gov.cn/zjzw/punish/frontpunish/showadmins.do?webId=1
- 资源
  + 4k 原盘，付费
  + https://www.hao4k.cn/4KUHD/
- 资源
  + 独立开发变现周刊
  + https://github.com/ljinkai/weekly
- 博客
  + 张鑫旭-鑫空间-鑫生活
  + https://www.zhangxinxu.com/wordpress/
  + 《CSS新世界》作者
  + RSS - https://www.zhangxinxu.com/wordpress/feed/
- 项目 (D) #Go
  + bettercap 
  + https://github.com/bettercap/bettercap
  + 安全研究，逆向工程
- 资源 (B)
  + 安卓优秀/破解应用收集 – Aneeo Blog
  + https://aneeo.com/apk
  + 抖音国际版，bilibili 联通免流，苹果账号
- 教程（B）
  + 出境游
  + https://sspai.com/post/41651
  + 付费解锁（￥29）
  + https://sspai.com/post/41681
- 教程（B）
  + B 站免费学设计
  + https://www.uisdc.com/bilibili-learning-design-2
  + [优设基础训练营](https://space.bilibili.com/39990344/video)
  + iPad插画
    * [插画设计师-西瓜](https://space.bilibili.com/152824451/video)
  + 手绘板插画
    * [饺紫猫](https://space.bilibili.com/1746341/channel/detail?cid=895)
  + AE/PR
    * [OtatoB土豆](https://space.bilibili.com/692233/video)
  + 交互动效设计
    * [Guoen_0](https://space.bilibili.com/738096/video)
  + 游戏设计
    * [M_Studio](https://space.bilibili.com/370283072/video) *#Unity*
  + 时装走秀
    * [云边小太阳](https://space.bilibili.com/411225049/video)
  + 水彩绘画
    * [彩水清](https://space.bilibili.com/74125129/video)
  + ...
- 工具 (A)
  + 正则可视化工具
  + https://jex.im/regulex/
  + 可以直观方便的理解某个正则表达式
- 教程 (A)
  + React 性能优化
  + https://overreacted.io/before-you-memo/
  + 两种基础的优化方式
    * 降低 `state` 的层级来减少不必要的重新渲染
    * 使用 `children` 将不必要的子组件分离出去
- 资料
  + 文本编辑器性能对比
  + https://github.com/jhallen/joes-sandbox/tree/master/editor-perf
  + 内存使用: 小文件(Hello World), 大文件(5.8M XML)
    + vim:    5,336 | 11,952
    + emacs:  34,924 | 42,892
    + code:   339,512 | 391,496
- 资源
  + Skyline webcams
  + https://www.skylinewebcams.com
  + 延时摄影，旋转，缩放
  + 米兰大教堂，罗马竞技场，埃特纳火山，比萨斜塔
- 游戏
  + Wordle - A daily word game
  + https://www.powerlanguage.co.uk/wordle/
  + 每日猜单词
- 文章
  + 2020前端面试秘籍
  + https://juejin.cn/post/6864398060702760968#heading-72
  + 笔记
    * ```html
      <meta name="description" content="">
      ```
    * ```js
      $('meta[name="description"]')
      ```
    * ```html
      <!-- 适配 IE，不兼容 IE 可移除 -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      ```
    * `H5` - mobile version of websites opened in mobile browsers
      * [参考链接](https://medium.com/chia-ux/what-do-chinese-clients-mean-h5-its-not-html-5-actually-8fb0bb32cbb9)
    * `HTML5` vs `HTML`
      * `<audio>` and `<video>` *（以前得用 flash）*
      * `SQL database` *（以前得用 Cookie）*
      * `web worker`
      * `<svg>`
      * `<canvas>`
      * semantic element *(`<nav>`, `<aside>`, ...)*
      * Drag & Drop
      * GeoLocation
      * ...
    * `useCapture` 捕获阶段执行回调
      * `stopPropagation()` 终止事件传播
    * `BFC`
      * 根元素、表格、float、absolute & fixed、inline-block、`overflow`、flex 的直接子元素、`flow-root`、...
      * 包含浮动元素，防止 margin 合并，不会被浮动元素覆盖
      * BFC 内的布局不会影响到外面
    * css 优先级
      * `!important` > `style` > `#id` > `.class` > element > * > 继承 > 默认
    * `border-radius` 是在 2005 年左右兴起的，`IE9` 之前不支持
    * IE
      * IE8 - 2008 *（Win7 默认浏览器）*
      * IE9 - 2011
      * IE11 - 2013 *(最后一版)*
    * 不要用 `for-in`
      * ```js
          Array.prototype.method=function(){
            console.log(this.length);
          }
          var myArray=[1,2,4,5,6,7]
          myArray.name="数组"
          // 遍历的是索引
          for (var index in myArray) {
            console.log(myArray[index]);
          }
          // 遍历的是值，不可遍历对象，可遍历 Map
          for (var value of myArray) {
            console.log(value);
          }
        ```
    * `Cookie` 容量 `4KB`
    * `localStorage` 容量 `4.98MB`
    * `require` 是复制，`import` 是引用
- 文章
  + https://trends.vc/trends-0015-open-startups/
  + 开放式创业*（open startups）*
    * 分享收入、用户、流量等指标
  + 数据废气*（data exhaust）*
- 博客
  + https://productdisrupt.com/index.html
  + 一个 Open Startup 网站
  + 一个学习产品设计的资源列表
  + [收入、开支、订阅、浏览](https://twitter.com/WeirdoWizard/status/1256984974894469123?s=20)
- 问题
  + webstorm pinia template
  + https://github.com/vuejs/pinia/discussions/774#discussioncomment-1597802
  + `defineStore({id: 'myStore', /* ... */});`
- 博客
  + https://trends.vc/archives/
  + Discover New Markets and Ideas
- 论坛
  + https://www.indiehackers.com
  + Indie Hackers: Work Together to Build Profitable Online Businesses
  + 类似的中文站 <https://w2solo.com>
- 工具 (C)
  + Chimera Painter
  + https://storage.googleapis.com/chimera-painter/index.html
  + GAN 奇美拉生成器
  + 效果一般
- 工具 (C)
  + Monster Mash: New Sketch-Based Modeling and Animation Tool
  + 效果一般
- 博客 (C)
  + 腾讯技术 - 知乎专栏
  + https://www.zhihu.com/column/tencent-TEG
  + 各种技术都有
- 文章 (B)
  + Understanding CSS Layout And The Block Formatting Context
  + https://www.smashingmagazine.com/2017/12/understanding-css-layout-block-formatting-context/
- 网站 (B)
  + https://irocore.com
  + 颜色相关的日语单词
- 项目 (B)
  + https://github.com/gpujs/gpu.js
  + GPU 通用计算库
- 项目 (C)
  + https://github.com/google/brotli
  + Brotli - 一种压缩算法
- 微博 (B)
  + https://weibo.com/u/2668943002
  + 牙齿矫正周博士 - 同事推荐
- 文章 (B)
  + https://sspai.com/post/42039
  + Advanced Download Manager
    * 多线程下载的好处：服务器会根据同时下载数来分配带宽给每一个下载的用户
  + Aria2App
- 网站 (B)
  + https://radar.cloudflare.com
  + Worldwide Data | Cloudflare Radar
- 博客 (B)
  + https://github.com/rimochan
  + Galgame 引擎、文本去码、...
  + 项目还挺有意思
- 笔记（B）
  + 香草社 - Vanillaware
  + 幻想战记 - 2006 - PC
  + 格林魔书 - 2007 - PS2
  + 奥丁领域 - 2007 - PS2
  + 可爱熊之家 - 2008 - NDS
  + 胧村正 - 2009 - Wii
  + 大骑士物语 - 2011 - PSP
  + 胧村正 - 2013 - PSV
  + 龙之皇冠 - 2013 - PS3/PS4/PSV
  + 奥丁领域：里普特拉西尔 - 2016 - PS3/PS4/PSV
  + 十三机兵防卫圈 - 2019 - PS4/Switch
- Lib
  + https://daisyui.com/
  + Tailwind CSS component Library
- Lib
 + https://date-fns.org/
 + date-fns is like lodash for dates. It has 200+ functions for all occasions.
- Site
  + https://realfavicongenerator.net/
  + The ultimate favicon generator.
- Lib
  + https://opensumi.com/en
  + 阿里开源的框架，用于快速构建 IDE
- Article
  + https://css-tricks.com/rems-ems/
  + 一个 `font-size` 方案
    * `html` 使用 `px`
    * 组件使用 `rem`
    * 组件内部使用 `em`
- Video
  + https://www.bilibili.com/video/BV1RY4y1v7nr
  + 雀河 ACE 虚拟歌姬
  + 调的很好，像人声，没有机器人的感觉
  + 有移动端 App *ACE虚拟歌姬*
- Article
  + https://github.com/rwaldron/idiomatic.js
  + `+number` - 使用一元运算符 `+` 转换为 `number`
  + `l.indexOf(e) !== -1` === `~l.indexOf(e)`
    * 虽然不推荐，但很好玩 `~-1 === 0`
  + `rDesc = //;` - 一种正则命名规范
  + `var self = this;` -> `.bind(this)`
- Twitter
  + <https://twitter.com/steve8708/status/1508502291170484224>
  + ```js
      const object = {}
      object[dynamicKey] = value

      // better performance
      const map = new Map()
      map.set(dynamicKey, value)
    ```
    * 可惜 `Map` 不支持 `destructuring` 也不能用 `Object.assign`
  + <https://perf.link/>
    * 一个 JS Benchmarks 网站
- Article
  + [Vue 跨平台性能优化的十个技巧](https://zhuanlan.zhihu.com/p/419443426)
    * `Object.freeze(list);` - 非响应式数据 *(1000x10 的表格加载快了 4 倍)*
    * `v-for` 事件代理 -> 减少监听器数量 -> 减少内存支出
- Lib
  + [Alpine.js - Your new, lightweight, JavaScript framework.](https://alpinejs.dev)
    * `x-data`, `x-bind`, `x-on`, ...
    * `$store`, `$el`, `$dispatch`, `$watch`, ...
- Lib
  + 一些 vue 的 UI 框架
    * [Vuetify](https://vuetifyjs.com/)
    * [Quasar](https://quasar.dev/)
    * [Wave](https://antoniandre.github.io/wave-ui/)
    * [Prime](https://www.primefaces.org/primevue/)
    * [Buefy](https://buefy.org/)
- Lib
  + [Gogs - 一款极易搭建的自助 Git 服务](https://gogs.io/)
  + <https://github.com/gogs/gogs>
- Lib
  + [ulid](https://github.com/ulid/spec)
  + Universally Unique Lexicographically Sortable Identifier
  + 一个 `UUID` 的其他选项 - `01G9F5YQ2M0FBE5EXPBB3N6BQP`
- Article
  + https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
  + Tailwind 作者的 CSS 演进
  + Phase 1: "Semantic" CSS
    * [CSS Zen Garden](http://www.csszengarden.com/)
    * HTML 独立，CSS 依赖 HTML，在 HTML 不变的情况下可以替换不同的样式
  + Phase 2: Decoupling styles from structure
    * Bootstrap
    * CSS 独立，HTML 依赖 CSS，在 CSS 不变的情况下可以运用在 HTML 的各个地方
  + Phase 3: Content-agnostic CSS components
  + Phase 4: Content-agnostic components + utility classes
  + Phase 5: Utility-first CSS
    * 可复用的 CSS
    * 有限的 class 保障 CSS 的连续性
- Site (C)
  + https://maniahero.com
  + 一个游戏策划的博客
- Site (A)
  + [C 语言教程](https://wangdoc.com/clang/index.html)
  + 简洁
- Tips
  + `iframe` 有一个属性 `allowfullscreen`
  + ```js
      iframe.requestFullscreen().then();
      document.exitFullscreen().then();
    ```
- Site
  + [汉兜 - 汉字 Wordle](https://handle.antfu.me)
- Article (A)
  + [ESLint 工作原理探讨](https://zhuanlan.zhihu.com/p/53680918)
- App
  + [VMOS - 安卓系统内的安卓虚拟系统](https://www.vmos.cn)
- Framework
  + [Chakra UI - Create accessible React apps with speed](https://chakra-ui.com)
- App
  + [TablePlus - Database management made easy](https://tableplus.com/)
  + MacOS, iOS, Windows, Linux
  + PostgreSQL, SQL Server, SQLite, MarinaDB, Redis, Cassandra, MongoDB,...
- Site
  + [sci-hub - knowledge to everyone](https://sci-hub.se/#)
- Framework
  + [Moon - The purely functional user interface library that's fast, tiny, and intuitive.](https://moonjs.org/guide)
- Blog
  + [腾讯技术 - 知乎专栏](https://www.zhihu.com/column/tencent-TEG)
- Framework
  + [GitLab UI](https://gitlab-org.gitlab.io/gitlab-ui/)
- Lib
  + [Algorithms written in Rust](https://github.com/douchuan/algorithm)
- Site
  + [海外名校课堂](https://space.bilibili.com/631189494?from=search&seid=7039771700602488707)
- Site
  + [程序员成长指北 - Node](http://www.inode.club/node/)
- Tool
  + [uTools - 新一代效率工具平台](https://u.tools)
- Article
  + [上海购房知识汇总 - 2020](https://github.com/ayuer/shanghai_house_knowledge)
- Lib
  + [MDX-deck - React MDX-based PPT](https://github.com/jxnblk/mdx-deck)
- Lib (A)
  + [slidev - Presentation slides for developers ](https://github.com/slidevjs/slidev)
    * Code Highlight Sequence
    * directly use Vue Component
    * directly use Vue Setup
    * Animations power by `@vueuse/motion`
    * mermaid / plantuml
- Lib
  + [文言 - 编程语言](https://wy-lang.org/)
  + [文言 - online IDE](https://ide.wy-lang.org/)
  + [文言 - github](https://github.com/wenyan-lang/wenyan)
- App
  + [lunarvim -  IDE layer for Neovim](https://www.lunarvim.org)
    * [Tree-sitter - a parser generator tool and an incremental parsing library](https://github.com/tree-sitter/tree-sitter)
- Toturial
  + [WebGL2](https://webgl2fundamentals.org/webgl/lessons/zh_cn/)
- Article
  + [使 PWA 更像 Native App 的 6 个技巧](https://fehey.com/5-pwa-tips/)
- Blog (A)
  + [鱼·后花园](https://blog.iccfish.com/)
  + #路由器#
- Article
  + [PT 下载从入门到养老篇一：站点介绍及生存指南](https://iecho.cc/2019/01/09/PT-%E4%B8%8B%E8%BD%BD%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E5%85%BB%E8%80%81/)
    * HDChina 瓷器
    * CHDbits 彩虹岛
- Blog (S)
  + [antfu.me - projects](https://antfu.me/projects)
- Post
  + [n5095核显直通成功（有教程），emby依旧无法硬解](https://www.right.com.cn/forum/thread-8237925-1-1.html)
  + [N5095 开一个贴有什么消息欢迎留言](https://www.openos.org/threads/n5095.4025/page-2)
  + (CAN INTER 11TH GEN PROCESSORS ENABLE HARDWARE DECODING ON UNRAID?（N5095）)[https://forums.unraid.net/topic/122146-can-inter-11th-gen-processors-enable-hardware-decoding-on-unraid%EF%BC%88n5095%EF%BC%89/page/3/]
- Blog (A)
  + [GXNAS](https://wp.gxnas.com/)
    * #黑群晖# #路由器# #ESXi# #PVE# #OpenWrt# 
- Blog
  + [Jinlife - Blog](https://blog.jinlife.com/)
    * #群晖# #家庭网络#
- Site
  + [哔嘀影视 - 热门电影，最新电影，最新电视剧，免费下载，磁力下载，免费在线观看](https://www.btbdys.com/)
  + [域名发布页](bdys.me)
- Repo
  + [微博热搜榜](https://github.com/justjavac/weibo-trending-hot-search)
    * 记录从 2020-11-24 日开始的微博热门搜索。每小时抓取一次数据，按天归档。
- App
  + [Obsidian - a powerful knowledge base on top of a local folder of plain text Markdown files.](https://obsidian.md)
  + 拥有丰富且强大的社区插件
- Site
  + [神奇代码岛 - 多人联机3D创作平台](https://box3.codemao.cn/)
- Toturial
  + [Build Your Own Text Editor in C](https://viewsourcecode.org/snaptoken/kilo/)
- Article (A)
  + [CONTENT-AWARE IMAGE RESIZING IN JAVASCRIPT](https://trekhleb.dev/blog/2021/content-aware-image-resizing-in-javascript/)
- Repo (A)
  + [Fluent Emoji - modern emoji from Microsoft](https://github.com/microsoft/fluentui-emoji)
  + 3D, Flat, High Contrast, SVG, Metadata, 1546+ emoji
- Site
  + [THIS_IS_ISAAC](https://isaacnewton.tilda.ws/)
  + [Tilda](https://tilda.cc/) pwoered site
- Site
  + [Bangumi 番组计划](https://bangumi.tv/)
- Site (A)
  + [JS Is Weird](https://jsisweird.com)
- Article (S)
  + [An Introduction and Guide to the CSS Object Model (CSSOM)](https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/)
    * modify an individual keyframe’s properties on the fly!
    * [styled components](https://styled-components.com/)
- Site
  + [CodinGame - Play with Programming](https://www.codingame.com/home)
- Blog
  + [Deep Dark Fantasy](https://martins3.github.io/)
  + QEMU 源码分析
- Article
  + <https://www.thisdot.co/blog/how-to-setup-a-typescript-project-using-rollup-js>
  + ```js
      // src/math/index.ts
      export { add, substract } from './math';
    ```
- Tool
  + [lightningcss - An extremely fast CSS parser, transformer, bundler, and minifier.](https://lightningcss.dev)
- Site
  + [polyfill.io](https://polyfill.io/v3/)
    * accepts a request for a set of browser features
    * returns only the polyfills that are needed by the requesting browser
- Article (A)
  + [Styled Components VS Linaria](https://pustelto.com/blog/css-vs-css-in-js-perf/)
  + TLDR; - Don’t use runtime CSS-in-JS if you care about the load performance.
    * Simply less JS = Faster Site. 
  + [Linaria - Zero-Runtime CSS in JS](https://linaria.dev)
- Article (A)
  + [速度与压缩比如何兼得？压缩算法在构建部署中的优化](https://tech.meituan.com/2021/01/07/pack-gzip-zstd-lz4.html)
    * Gzip - Brotli - Zstd - LZ4 - PigZ - ISA-L - Pzstd
    * | 压缩率 | 耗时 | 速度 | 解压耗时 |
    * 一期采取 `ISA-L` 的方式加速, 节省 90% 的时间
- blog
  + [Zlatan Eevee](https://ieevee.com/archives/)
  + | istio | k8s | spark |
- Blog
  + [运维咖啡吧](https://blog.ops-coffee.cn)
  + | DevOps | 系统运维 | Elastic | Python | Django | WebSSH | BPMN | LDAP |
- Blog
  + [code秘密花园](https://blog.conardli.top/archives/)
  + | JS | React | 
  + [2022 年的 React 生态](https://blog.conardli.top/2022/04/11/react/react-community/)
- Lib
  + [Bun - a fast all-in-one JavaScript runtime](https://bun.sh)
- Blog
  + [HopoL's Blog](https://www.hopol.cn/)
  + | unRAID | DSM | 开心版 | 路由 | 树莓派 |
- Site (S)
  + [CSS LAYOUT](https://csslayout.io/)
  + | Display | Feedback | Input | Layout | Navigation |
  + [Practical, real world React examples of IntersectionObserver API](https://intersectionobserver.io/)
  + [Tips, tricks and best practices of front-end development](https://getfrontend.tips/)
  + [What is the difference between ˍˍˍ and ˍˍˍ in the front-end development?](https://thisthat.dev/)
  + [Manage HTML DOM with vanilla JavaScript](https://htmldom.dev/)
  + [Favorite JavaScript utilities in single line of code! No more!](https://1loc.dev/)
