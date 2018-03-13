---

layout: post
title: "Github Page 简易博客搭建"
date: 2018-02-26

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

# Jekyll部分
```bash
# Install Jekyll and Bundler gems through RubyGems
gem install jekyll bundler
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

## TOC生成

在 Layout 中添加 TOC 的方法

> [一种不使用插件或JS的实现](https://allejo.io/blog/a-jekyll-toc-without-plugins-or-javascript/)

## Tag 生成
> [github-jekyll-tag](http://longqian.me/2017/02/09/github-jekyll-tag/)

## 基础搜索
> [instant-jekyll-search - blog.webjeda.com](https://blog.webjeda.com/instant-jekyll-search/)
> [Simple-Jekyll-Search - github.com](https://github.com/christian-fei/Simple-Jekyll-Search)

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

{% endraw %}


> [Liquid官方文档](http://shopify.github.io/liquid/basics/introduction/)

# 样式
>[表格样式-moxfive.xyz](http://moxfive.xyz/2016/03/04/markdown-table-style/)


# 参考链接   
> [https://jekyllrb.com/docs/quickstart/](https://jekyllrb.com/docs/quickstart/)

> [https://jekyllrb.com/docs/pages/](https://jekyllrb.com/docs/pages/)

> [http://jmcglone.com/guides/github-pages/](http://jmcglone.com/guides/github-pages/)