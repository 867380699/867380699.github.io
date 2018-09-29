---

layout: post
title: "JavaScript笔记"
date: 2018-09-29
tags: [ javascript ]
---


# 浏览器对象
`window` 对象不但表示浏览器窗口, 而且充当全局作用域
`window.innerWidth`,`window.innerHeight` - 网页的净宽高
`navigator` 对象表示浏览器的信息
`screen` 对象表示屏幕信息
`location` 对象表示当前页面的URL信息
`document` 对象表示当前页
`history` 对象保存了浏览器的历史记录

## DOM
```js
document.getElementById()
document.getElementsByTagName()
document.getElementsByClassName()
//CSS选择器
document.querySelectorAll()
```
DOM节点对象的 `style` 属性对应节点的CSS

### CRUD
```js
document.getElementById('su').text='Hello World!';
document.getElementById('su').style.fontSize='100px';
node = document.createElement('p');
node.innerText = 'Java';
document.getElementById('su').appendChild(java);
parentElement.insertBefore(newElement, referenceElement);
parentElement.removeChild(element);
```

### 表单操作

```js
// <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>
var tue = document.getElementById('tuesday');
tue.checked;    //是否选中
var form = document.getElementById('test-form');
form.submit();
```

#### AJAX
web的运作原理:一次HTTP请求对应一个页面
如果要让用户留在当前页面,同时发出新的HTTP请求,就必须用JavaScript发送这个请求,接收到数据后,再用JavaScript更新页面.
注意AJAX请求是异步执行的,也就是说,要通过回调函数获得响应
在现代浏览器上写AJAX主要依靠 `XMLHTTPRequest` 对象
默认情况下,`JavaScript`在发送 `AJAX` 请求时,URL的域名必须和当前页完全一致
意思是`www.example.com` 不等于 `example.com`,协议要相同,端口要相同

##### 跨域名AJAX
1. Flash 
2. Proxy 
3. JSONP
JSONP只能使用GET请求,并且要求返回JavaScript,这种方式实际上是利用了浏览器允许跨域引用JavaScript资源.

# 自执行函数(IIFE)
形式如下 `;(function(){}());`
方法里的变量不会污染外部的变量,在引用多个JS文件时不会相互覆盖.
```js
;(function(){var al=100;console.log('run~')}());
```

```js
//此处的this是Window
;(function(){console.log(this)}());
```

# call() & apply() & bind()
`call()` 和 `apply()` 可以用来更改**this**！

一个JavaScript函数有四个内置方法：

- call() - 更改this，参数以（this,param1,param2,param3...）
- apply() - 更改this，参数以（this,[param1,param2,param3...]）
- bind() - 更改this，并不调用。
- toString() - 输出源码

# prototype
Every JavaScript object has a prototype. The prototype is also a object.
All JavaScript object inherit their properties and methods from prototype.

使用对象构造函数来创建一个prototype

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}

var worker = new Person('smith', 21);
```

# Canvas

```js
//得到一个CanvasRenderingContext2D对象,所有的绘图操作都需要通过这个对象完成
var ctx = canvas.getContext('2d');
```

# 内置对象

## JSON
支持筛选需要序列化的键,也支持传入函数预处理内容

```js
JSON.stringify(obj)
JSON.parse(string)
```

## Date
``` js
// 获取当前时间
var now = new Date()
```

## RegExp
```js
var re = /\d+/
re.test('232432')    //true
re.test('ascddf')    //false
'a   b   c   de f'.split(/\s+/)    //["a","b","c","de","f"]
re = /.*共(\d+)页.*/
//返回group
re.exec('balalab共50页balabala')    //["balalab共50页balabala", "50"]
```

# Tips

**不要省略分号**
与或非 和 Java 一致
注释与 Java 一致
`==` 自动转换类型比较
`===` 不自动转换类型比较
尽量不要使用 `==` 做比较

如果一个变量没有通过var声明就被使用,那么该变量就自动被申明为全局变量
`'use strict';` - 强制要求使用`var`申明变量
**尽量使用strict模式,使用`var`申明变量**
`\x##` 16进制表示
`\u####` unicode字符
\`...\` 多行字符串(ES6)
\` ...${name}\` 模板字符串(ES6)
特别注意,字符串是不可变的
所以诸如`toUpperCase`,`substring`这类方法都是返回一个新字符串
**JS数组越界不会报错!**

---

JS 的对象的定义和 Python 的字典类似,多了一个`xxx.xxx`的功能,而且key可以省略`''`
JavaScript使用`{...}`表示一个对象,键值对以`xxx:xxx`申明,用`,`隔开**注意最后一个键值对不要加`,`,可能报错**
JS可以自由的给对象添加删除属性...Python也可以
键必须是字符串

---

for循环,while循环和if语句和Java一致
多一个for..in

---

Map和Set (ES6)
`for... of` 和 python的`for...in`类似

---

**JavaScript函数允许接收任意个参数!**
变量提升:JavaScript的函数定义有个特点,它会先扫描整个函数体的语句,把所有申明的变量提升到函数顶部.只提升声明,不提升赋值语句
**所以,请严格遵守在函数内首先声明所有变量这一规则**
JS有一个默认全局对象`window`,所有的全局变量都是绑定在这个对象上的
所以不同文件中的全局变量也会冲突的...并且很难发现
**`this`**是JavaScript的巨坑,很难控制
不过在正常的Java写法没有多大问题
将函数作为参数的函数叫做高阶函数(与python一致)
`map()`,`reduce()`,`filter()`,`sort()`定义在Array中
sort()默认吧元素转换成string,使用字典序排列
**`sort`会对Array内容进行修改!!**
闭包就是一个带状态的函数
JS函数也是对象,可以设置许多的属性

---

```js
//一个小技巧,赋予默认值
var x = i || 0;
```

---

构造函数如果不加 `new` 会被当做普通函数使用.


# ES6
`let` - 替代var可以生成一个块级作用域的变量
`const` - 申明常量


## 箭头函数
类似Lambda
可以规避this指针的问题

## generator
和python类似

##class
和Java类似

## promise
在JavaScript的世界中,所有代码都是单线程执行的.
因此JavaScript的所有网络操作,浏览器事件,都必须是异步执行.
promise 可以简化异步

## 默认参数
```js
handlePageInfo ({count = 0, limit = 20, page = 1} = {}) {
    this.count = count
    this.pageLimit = limit
    this.currentPage = page
}
```

# JQuery
JQuery可以帮我们干这些事:
- 消除浏览器差异
- 更加简洁的DOM操作
- 轻松实现动画,修改CSS等各种操作

```js
<!--引用JQuery -->
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
window.jQuery === window.$    //true
//多级查找
$('#test').find('li')
$('li').addClass('highlight')
//显示/隐藏
$('left').show().hide()
//浏览器宽高
$(window).width();
//网页宽高
$(document).width();
```

## 事件
```js
$('a#link').click(function(){alert('hello')})
$('a#link').on('click',function(){alert('hello')})
//DOM完成初始化后触发,且只触发一次
$(document).ready(function(){})
//同上
$(function(){})
//监听鼠标
$('#testMouseMoveDiv').mousemove(function (e) {        
    $('#testMouseMoveSpan').text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);    
});
```
## 动画

```js
$().fadeIn(1000).fadeOut(1000).fadeTogle(1000)
$().slideUp(1000).slideDown(1000).slideTogle(1000)
$().show(1000).hide(1000).togle(1000)
```
链式调用会依次执行
自定义动画: `animate()`

## AJAX
```js
$.ajax()
$.get()
$.post()
```

## 扩展
```js
$.fn.method = function(){...;return this;}
```

# underscore
函数式编程库 
`underscore` 把自己绑定到 `_` 全局变量上了
map,filter,object,max,min,zip,unzip...