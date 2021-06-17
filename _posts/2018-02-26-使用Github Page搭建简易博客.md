---

layout: post
title: "Github Page 简易博客搭建"
date: 2018-02-26
tags: [jekyll]

---

# Github部分
在github新建一个新的repository。

repository命名格式为 `<username>.github.io`

在根目录下添加 **index.html** 就可以有一个主页了。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index</title>
</head>
<body>
    Hello world!
</body>
</html>
```
直接访问 `<username>.github.io` 即可看到我们的主页了。

在根目录下再添加一个 **about.html**。

可以通过 `<username>.github.io/about.html` 来访问。

> 参考链接   
> [https://pages.github.com/](https://pages.github.com/)

## 默认启用的插件

- [jekyll-coffeescript](https://github.com/jekyll/jekyll-coffeescript)
- [jekyll-default-layout](https://github.com/benbalter/jekyll-default-layout)
- [jekyll-gist](https://github.com/jekyll/jekyll-gist)
- [jekyll-github-metadata](https://github.com/jekyll/github-metadata)
- [jekyll-optional-front-matter](https://github.com/benbalter/jekyll-optional-front-matter)
- [jekyll-paginate](https://github.com/jekyll/jekyll-paginate)
- [jekyll-readme-index](https://github.com/benbalter/jekyll-readme-index)
- [jekyll-titles-from-headings](https://github.com/benbalter/jekyll-titles-from-headings)
- [jekyll-relative-links](https://github.com/benbalter/jekyll-relative-links)

> <https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins>

## 插件白名单

- [jemoji](https://github.com/jekyll/jemoji)
- [jekyll-avatar](https://rubygems.org/gems/jekyll-avatar)
- [jekyll-feed](https://rubygems.org/gems/jekyll-feed)
- [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme)
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag)
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap/)

- *themes* 
  -  *minima, swiss, architect, cayman, dinky, hacker, leap-day, merlot, midnight, minimal, modernist, primer, slate, tactile, time-machine*
- *jekyll-mentions*
- *jekyll-redirect-from*
- *github-pages-health-check*


> <https://pages.github.com/versions/>

## emoji
`Gemfile`:
```rb
gem 'jemoji'
```
`_config.yml`:
```yaml
plugins:
  - jemoji
emoji:
  src: "https://github.githubassets.com/images/icons/"
```

重启 :smiley:! *效果不是很理想*:pensive:

> [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#subdivision-flag)
> [emojipedia](https://emojipedia.org/)
> [twemoji preview](https://twemoji.maxcdn.com/2/test/preview.html)

# Jekyll部分

```bash
# 一些可能没安装的依赖
sudo apt install build-essential zlib1g zlib1g-dev ruby-dev
# Install Jekyll and Bundler gems through RubyGems
gem install bundler jekyll github-pages
```
接着在根目录新建一个 **Gemfile**, 内容如下

```
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```

```bash
# Build the site on the preview server
bundle exec jekyll serve
```

这样就在本地启动了一个服务，可以通过 `127.0.0.1:4000` 来访问你的博客了。
使用参数`--host=0.0.0.0` 可以实现局域网内访问，方便调试移动端
```bash
bundle exec jekyll serve --host=0.0.0.0
```

同时jekyll会自动生成页面并放在 `_site` 目录下，所以我们要把它加入`.gitignore`

## 代码高亮
Jekyll大概是默认支持代码高亮的。
我们只需要添加一份上色的CSS即可。
```html
<link rel="stylesheet" type="text/css" href="/css/pastie.css">

```
这是我目前正在使用的上色CSS: [pastie.css](/css/pastie.css)


## 数学公式支持

### MathJax
使用MathJax可以很方便的在页面上显示数学公式。
在页面上添加如下代码即可。
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript">
</script>
```
MathJax默认不开启单个 `$` 的行内公式，在页面中添加下面的配置即可开启。
```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        processEscapes: true
      }
    });
</script>
```

> [Getting Started - docs.mathjax.org](http://docs.mathjax.org/en/latest/start.html)

### katex

> [Katex Mathjax Comparison](https://www.intmath.com/cg5/katex-mathjax-comparison.php)
> [Supported Function](https://katex.org/docs/supported.html)

## TOC生成

在 Layout 中添加 TOC 的方法

> [一种不使用插件或JS的实现](https://allejo.io/blog/a-jekyll-toc-without-plugins-or-javascript/)

kramdowm 支持 TOC

```
- TOC
{:toc}
```

## Tag 生成
> [github-jekyll-tag](http://longqian.me/2017/02/09/github-jekyll-tag/)
> [tag_generator](https://github.com/qian256/qian256.github.io/blob/master/tag_generator.py)

## 基础搜索
> [instant-jekyll-search - blog.webjeda.com](https://blog.webjeda.com/instant-jekyll-search/)
> [Simple-Jekyll-Search - github.com](https://github.com/christian-fei/Simple-Jekyll-Search)

## Archive
> <https://www.mitsake.net/2012/04/archives-in-jekyll/>

## Liquid
{% raw %}
Liquid 代码可以分为三类，对象（Object），标签（tags），过滤器（filters）。

对象告诉Liquid在哪放置页面内容。对象和变量名使用 `{{` 和 `}}` 包围 
```liquid
{{ page.title }}
```

标签为模板提供了逻辑和控制流，使用 `{%` 和 `%}`包围
标签标记不会产生任何可见文本，因此你可以分配变量，使用条件和循环，而不用担心在页面上显示任何Liquid逻辑。

```liquid
{% if user %}
    Hello {{ user.name }}!
{% endif %}
```

标签可以分为三类：控制流，迭代，变量分配。

过滤器可以改变Liquid对象的输出，他们在输出中使用，使用 `|` 分割。
```liquid
{{ "/my/fancy/url" | append: ".html" }}
```

可以同时使用多个过滤器
```liquid
{{ "adam!" | capitalize | prepend: "Hello " }}
```
### Array
```liquid
{% assign fruits = "orange,apple,peach" | split: ',' %}
{% for fruit in fruits %}
  {{ fruit }}
{% endfor %}
```

{% endraw %}


> [Liquid官方文档](http://shopify.github.io/liquid/basics/introduction/)

## scss
当文件后缀为 `.scss` 且文件开头有两行三杠时，Jeyll 即可识别此文件。
```scss
--- 
--- 

.post {
  p {
    font-size: 1.2em;
  }
  //...
}
```

## Data Files
Jekyll supports loading data from `YAML`, `JSON`, and `CSV` files located in the  `_data` directory. 

`_data/members.csv`:

```
name,github
Eric Mill,konklone
Parker Moore,parkr
Liu Fengyun,liufengyun
```
This data can be accessed via `site.data.members` (notice that the filename determines the variable name).

{% raw %}
```liquid
<ul>
{% for member in site.data.members %}
  <li>
    <a href="https://github.com/{{ member.github }}">
      {{ member.name }}
    </a>
  </li>
{% endfor %}
</ul>
```
{% endraw %}

> <https://jekyllrb.com/docs/datafiles/>

## kramdown

### Applying classes

```
This is a paragraph that for some reason we want blue.
{: .blue}
```

> 可以结合 Bootstrap 使用

### Custom IDs

```
#### A blue heading
{: .blue #blue-h}
```

### Custom Attributes

```
#### A simple example
{: style="margin-top:0"}
```

### ALD

```
{:c1: .tts .color-table}

Paragraph *with emphasis*{:c1}
second line of paragraph
{:c1}
```

### Styles
One of the most useful features is the ability to add `<style>` tags to our markdown file too! We can do that for simply styling our web page without affecting the entire site.

### Iframes

We can embed anything within `<iframe>` tags, such as **YouTube** and **Vimeo** videos, Google and **OneDrive** documents and anything else available in iframes.

> [markdown-kramdown-tips-and-tricks - gitlab.com](https://about.gitlab.com/2016/07/19/markdown-kramdown-tips-and-tricks/)

## config

`_config.yaml`

## jekyll 4.x

`Gemfile`
```
# gem 'github-pages', group: :jekyll_plugins
```

```bash
bundle update jekyll
```

```
mkdir -p .github/workflows
touch .github/workflows/gh-pages.yml
```

{% raw %}
```yaml
name: Build and deploy Jekyll site to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: helaili/jekyll-action@2.0.1
        with:
          token: ${{ secrets.IO }}
```
{% endraw %}

Config `TOKEN`

<https://jekyllrb.com/docs/continuous-integration/github-actions/#providing-permissions>

`.gitignore`
```
.jekyll-cache/**
```


# Nginx部署
Jekyll也可以使用Nginx在自己的服务器上进行部署

默认配文件 `/etc/nginx/sites-enabled/default`

修改try_files 添加 `$uri.html`。
```nginx
try_files $uri.html $uri $uri/ =404;
```
修改root，大致修改如下
```
# root /var/www/html;
root /home/ubuntu/jekyll-site/_site;
```
也可以使用jekyll的build参数 `--destination`
```bash
jekyll build --source /root/myblog --destination /home/wwwroot/example.com --incremental --watch&
```

> [Jekyll + Nginx 配置指南](https://www.bennythink.com/jekyll-nginx.html)
> [用 Jekyll/Nginx/Let'sEncrypt 搭建一个博客站点](https://tomisacat.xyz/tech/2017/02/27/Deploy-a-blog-site-with-Jekyll-and-Nginx.html)

# 样式
>[表格样式-moxfive.xyz](http://moxfive.xyz/2016/03/04/markdown-table-style/)


# 参考链接   
> [https://jekyllrb.com/docs/quickstart/](https://jekyllrb.com/docs/quickstart/)

> [https://jekyllrb.com/docs/pages/](https://jekyllrb.com/docs/pages/)

> [http://jmcglone.com/guides/github-pages/](http://jmcglone.com/guides/github-pages/)

> [bundle卡住的问题](https://ruby-china.org/topics/8578)