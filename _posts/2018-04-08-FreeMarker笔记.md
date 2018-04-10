---

layout: post
title: "FreeMarker笔记"
date: 2018-04-08
tag: [java]

---

# 简介
Apache FreeMarker™ 是一个模板引擎。模板使用FreeMarker模板语言（FTL）编写。
在模板中关注数据如何呈现，在模板外关注要呈现什么数据。

![freemarker](/assets/freemarker.png)

FreeMarker 代码可以分为下几类：
`${...}` interpolation，FreeMarker会把它替换成其中表达式的值。

`FTL tags` 不会输出内容。与html类似，但是标签使用`#`开头，自定义的标签使用`@`开头。

`Comments` `<#--` and `-->`

其余的文本都是静态文本。

## 数据类型
像字典一样的变量称为 `hashes`。
存储单值的变量称为 `scalars`。
像列表一样的变量称为 `sequences`。

`Scalars` 可以进一步分为以下几类：

- String
- Number
- Date-like
- Boolean

## 取值
FreeMarker 取值依赖于 getter/setter。

animals.mouse.price

animals[0].name

## 指令（directives）
### 分支
`if`
```html
<h1>Welcome ${user}<#if user == "Big Joe">, our beloved leader</#if>!</h1>
```
`else` and `elseif`
```ftl
<#if animals.python.price < animals.elephant.price>
  Pythons are cheaper than elephants today.
<#elseif animals.elephant.price < animals.python.price>
  Elephants are cheaper than pythons today.
<#else>
  Elephants and pythons cost the same today.
</#if>
```
### 遍历
`list`
```html
<table border=1>
  <#list animals as animal>
    <tr><td>${animal.name}<td>${animal.price} Euros
  </#list>
</table>
```
避免空数组，可以使用以下写法。
```html
<#list misc.fruits>
  <ul>
    <#items as fruit>
      <li>${fruit}
    </#items>
  </ul>
</#list>
```
### 其他
`include`

`built-ins`
所谓 `built-ins` 就是一些不来自data-model的子变量，这些变量是由 Freemarker 添加的。使用 `?` 来访问。
```
user?length 
user?upper_case
animal.protected?string("Y", "N")
```

### 处理空值
空值存在两种情况，值不存在或是值为null，FreeMarker把这两种情况当做同一种情况处理。

设置默认值，使用 `!`
```html
<h1>Welcome ${user!"visitor"}!</h1>
```
在变量后使用 `??` 配合 `#if`
```html
<#if user??><h1>Welcome ${user}!</h1></#if>
```
对于长链使用`(...)`,如 `(animals.python.price)!0` ， `(animals.python.price)??`，


# 参考资料
> [freemarker 官网](https://freemarker.apache.org/)