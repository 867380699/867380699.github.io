---

layout: post
title: "JavaScript笔记"
date: 2018-09-29
tags: [ javascript ]
---

<link href="/css/fa-solid.css" rel="stylesheet">
<link href="/css/fontawesome.css" rel="stylesheet">

 `first-class functions` 意思是说 JavaScript中函数和其他变量一样，可以作为参数，返回值，也可以直接赋值给变量。

 `prototype-based` 一种面向对象的实现方式，通过对实例添加原型和函数实现面向对象，创建对象时不必指明类型。



# 浏览器对象
`window` 对象不但表示浏览器窗口, 而且充当全局作用域
    `window.innerWidth`,`window.innerHeight` - 网页的净宽高
`screen` 对象表示屏幕信息
`location` 对象表示当前页面的URL信息
`navigator` 对象表示浏览器的信息
`document` 对象表示当前页
`history` 对象保存了浏览器的历史记录

## location
```js
// 重新加载页面
location.reload()
```

```js
location.href
location.protocol
location.host
location.hostname
location.port
location.pathname
location.search // ?q=a&b=etc
location.hash
```

## navigator
`userAgent` - Returns the user agent string for the current browser.

`language` - the preferred language of the user. The null value is returned when this is unknown.

`cookieEnabled` - Returns false if setting a cookie will be ignored and true otherwise.
`onLine`
`hardwareConcurrency`

<i class="fas fa-exclamation-triangle"></i> `vendor` - Returns the vendor name of the current browser *(e.g., "Google Inc.", "Apple Computer, Inc.")*.

<i class="fas fa-flask"></i> `connection`
<i class="fas fa-flask"></i> `deviceMemory` 
<i class="fas fa-flask"></i> `platform` 

## DOM

### CRUD
```js
// read / query
document.getElementById()
document.getElementsByTagName()
document.getElementsByClassName()
// by CSS Selector
document.querySelector();
document.querySelectorAll()
// update
document.getElementById('su').text='Hello World!';
document.getElementById('su').style.fontSize='100px';
// create
node = document.createElement('p');
node.innerText = 'Java';
document.getElementById('su').appendChild(node);
parentElement.insertBefore(newElement, referenceElement); // referenceElement 为 null 则在末尾插入
// delete
parentElement.removeChild(element);
```

### classList

- `contains`
- `add`
- `remove`
- `toggle`

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

## Element
`Element` is the most general base class from which all objects in a `Document` inherit.

```                                       
+-------------+      +-------------+      +-------------+
| EventTarget | <--- |    Node     | <--- |   Element   |
+-------------+      +-------------+      +-------------+
```

### HTMLElement
```
+-----------+         +---------------+
|  Element  | <------ |  HTMLElement  |
+-----------+         +---------------+
```

Inherits properties from its parent, `Element`, and implements those from `GlobalEventHandlers` and `TouchEventHandlers`.

**GlobalEventHandlers**
onblur, onfocus, onchange, onclick, onkeydown, onkeypress, onload, onwheel, onplay, onresize, onscroll, onselect, onsubmit, ...

**dataset**
The dataset property on the `HTMLElement` interface provides read/write access to all the **custom data attributes** *(data-*)* set on the element.

## Event
```js
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { /* ... */ }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

**用于调试** *(比如触发弹窗控件)*:
```js
var evt = document.createEvent("MouseEvents"); 
evt.initMouseEvent("mouseenter", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); 
$0.dispatchEvent(evt); 
```

```
Event
├── UIEvent
│   ├── MouseEvent
│   │   ├── DragEvent
│   │   └── WheelEvent
│   ├── TouchEvent
│   ├── KeyboardEvent
│   ├── InputEvent
│   └── FocusEvent
├── ProgressEvent
├── PopStateEvent
├── HashChangeEvent
└── ...
```

### event types

MouseEvent: click, dblclick, mouseenter, mouseleave, mousedown, mouseup, mousemove, mouseover, mosueout
TouchEvent: touchstart, touchmove, touchend, touchcancel
KeyboardEvent: keydown, keypress, keyup

> <https://developer.mozilla.org/en-US/docs/Web/Events>


# 内置对象

## 数据类型
### Number
### Boolean
### String
```js
str.replace(regexp|substr, newSubStr|function)
```

```js
s = '1a2b3c';
s.replace(/\d/g, function(d){
    return parseInt(d)+1;
});
// '2a3b4c'
```

### Object
```js
Object.defineProperty(obj, propName, {
    configurable: false, // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
    enumerable: false, // true if and only if this property shows up during enumeration of the properties on the corresponding object.
    value: undefined, // The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
    writable: false, // true if and only if the value associated with the property may be changed with an assignment operator.
    get: undefined, // A function which serves as a getter for the property,
    set: undefined, // A function which serves as a setter for the property
})
```
### Function
### NaN
## 集合

### Array

```js
arr = [1,2,3];
arr.forEach(function(item, index, arr){
    console.log(item, index, arr);
});
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
```

**clear**
```js
arr = [1, 2, 3];
arr.length = 0;
```
**remove by value**
```js
arr = [1,2,3,4,7,8,9];
const index = arr.indexOf(value);
if (index) arr.splice(index, 1);
// If the item doesn't exist in the list, splice removes the last item in the list
```

**prototype**

`pop`, `push`, `splice`, `shift`, `unshift`, `slice`, `concat`, `fill`, `join`, `reverse`, 

`find`, `findIndex`, `includes`, `indexOf`, `lastIndexOf`, `keys`, `values`,

`map`, `reduce`, `filter`, `sort`, `flat`, `forEach`, `every`, `some`, ...


### Map

### Set

## Date
``` js
// 获取当前时间
var now = new Date()
```

## JSON
支持筛选需要序列化的键,也支持传入函数预处理内容
```js
JSON.stringify(obj)
JSON.parse(string)
```

## Math
```js
// 0-1之间的随机数
Math.random()
```

abs pow exp sqrt
round floor ceil
max min
sin cos ...


## RegExp
```js
var re = /\d+/
re.test('232432')    // true
re.test('ascddf')    // false
'a   b   c   de f'.split(/\s+/)    // ["a","b","c","de","f"]
'a b c de  f'.split(/(\s+)/)    // ["a", " ", "b", " ", "c", " ", "de", "  ", "f"] 捕获内容会留在结果中
re = /.*共(\d+)页.*/
//返回group
re.exec('balalab共50页balabala')    // ["balalab共50页balabala", "50"]
```

## Promise
在JavaScript的世界中，所有代码都是单线程执行的。
因此JavaScript的所有网络操作，浏览器事件，都必须是异步执行。
promise 可以简化异步

```js
new Promise(function(resolve, reject) { ... } );
```
![Promise](/assets/promises.png)

## 内置函数
decodeURI() encodeURI()

# Operators

## Unary
### delete

### typeof
possible return values:

- `"undefined"`
- `"boolean"`
- `"number"`
- `"bigint"`
- `"string"`
- `"function"`
- `"object"`
- `"symbol"`

```js
typeof /regex/ === 'object';
typeof class C {} === 'function';
// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';
// This stands since the beginning of JavaScript
typeof null === 'object';
```

```js
// All constructor functions, with the exception of the Function constructor, will always be typeof 'object'
var str = new String('String');
var num = new Number(100);

typeof str; // It will return 'object'
typeof num; // It will return 'object'
var func = new Function();
typeof func; // It will return 'function'
```

### void
The `void` operator specifies an expression to be evaluated without returning a value. 

```js
void (expression)
void expression
```

```html
<a href="javascript:void(0)">Click here to do nothing</a>
```
The following code creates a hypertext link that submits a form when the user clicks it.

```html
<a href="javascript:void(document.form.submit())">Click here to submit</a>
```

## Relational
### in
Returns true if the specified property is in the specified object.

### instanceof


# Canvas

```js
//得到一个CanvasRenderingContext2D对象,所有的绘图操作都需要通过这个对象完成
var ctx = canvas.getContext('2d');
```

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

```js
for (let o of foo()) {
    console.log(o);
}
```

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

---
获取计算后的属性
```js
getComputedStyle($0).position
```

**下载文件**
```js
var link = document.createElement("a");
link.download = 'filename';
link.href = dataURI;
link.click();
```

**下载JSON**

```js
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
```

---

`new Function`

```js
let sum = new Function('a', 'b', 'return a + b');
sum(1, 2) // 3
```

可以用于动态生成函数，比如从服务端获取代码

---

获取数组中的最大值/最小值
```js
var nums = [1, 2, 3]
Math.min.apply(Math, nums)    // 1
Math.max.apply(Math, nums)    // 3

// destructuring
Math.min(...nums)    // 1
Math.max(...nums)    // 3
```

# ES6
`let` - 替代 var 可以生成一个块级作用域的变量
`const` - 声明常量，必须初始化且不可修改


## 箭头函数

箭头函数没有 `arguments` 没有 `prototype` 也没有自己的 `this`。

只有一个参数时 `()` 可省略。

`(p1, p2) => expression` 等价于 `(p1, p2) => { return expression; }`

返回一个对象可写作 `params => ({foo: bar})`

```js
let arr = [1,2,3];
arr.filter(item => item === 2);
arr.map(item => item * 2);
arr.reduce((acc, cur) => acc + cur);
```

## 解构赋值

```js
let a = 1, b = 2;
[a, b] = [b, a]
```

## 剩余/扩展运算符
**扩展**
```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6]; //[ 1, 2, 3, 4, 5, 6 ]
```

**剩余**
```js
function first(first, ...rest){
    console.log(first);
    console.log(rest);    
};

first(1,2,3,4,5,6);
// 1
// [ 2, 3, 4, 5, 6 ] // rest 是一个数组
```

## 对象属性/方法简写
**属性简写**
```js
let a = 1;
let obj = {
    a
};
obj.a; // 1
```

与解构赋值一同使用：

```js
let f = () => ({a: 1, b: 2, c: 3});
let {a, b, c} = f();
```

**方法简写**

```js
let objES5 = {
    f1: function(){
        // ...
    }
}
let objES6 = {
    f1(){
        // ...
    }
}
```

## 计算属性名
```js
let obj = {
    foo: "bar",
    [ "baz" + quux() ]: 42
}
```

with ES5:

```js
var obj = {
    foo: "bar"
};
obj[ "baz" + quux() ] = 42;
```

## 默认参数
```js
handlePageInfo ({count = 0, limit = 20, page = 1} = {}) {
    this.count = count
    this.pageLimit = limit
    this.currentPage = page
}
```

## generator
和python类似

## class
和Java类似

## Module
`export` `import`

## Symbol
每个从 `Symbol()` 返回的`symbol`值都是唯一的。一个`symbol`值能作为对象属性的标识符；这是该数据类型仅有的目的。

### Well-known symbols
`Symbol.iterator`
A method returning the default iterator for an object. Used by `for...of`.


> [近一万字的ES6语法知识点补充 - juejin.im](https://juejin.im/post/5c6234f16fb9a049a81fcca5)

# 模块化

## CommonJS
可以在`nodeJS`中使用，浏览器不支持，需要工具转化

```js
module.exports = {
    name: 'xxx',
}
```

```js
const m1 = require('m1');
```

## AMD
```js
require(['m1', 'm2'], function(m1, m2) {
    // ...
});
```

## ES6
```js
export const name = 'aaa';
```
```js
import { name } from 'm1';
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
// 迭代
$('li').each(function(index, el){
    console.log(el);
});
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

# lodash

## Collection

`sample` - gets a random element from collection

`shuffle` - creates an array of shuffled values