---

layout: post
title: "AngularJS笔记"
date: 2018-12-10

---

# Template
{% raw %}
```html
<html ng-app="phonecatApp">
<head>
  ...
  <script src="bower_components/angular/angular.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body ng-controller="PhoneListCtrl">
  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>
</html>
```

- The `ng-repeat="phone in phones"` attribute in the `<li>` tag is an Angular repeater directive.
- The expressions wrapped in curly braces `({{phone.name}}` and `{{phone.snippet}})` will be replaced by the value of the expressions.

## Two-way Data Binding
```html
<h1>Hello {{name}}!!</h1>
<input type="text" ng-model="name" placeholder="Enter a name here">
<select ng-model="orderProp">
  <option value="name">Alphabetical</option>
  <option value="age">Newest</option>
</select>
```

```js
$scope.name="Jerry";
$scope.orderProp = 'age';
```

## Event Handlers
```html
<img ng-src="{{mainImageUrl}}" class="phone">

<ul class="phone-thumbs">
  <li ng-repeat="img in phone.images">
    <img ng-src="{{img}}" ng-click="setImage(img)">
  </li>
</ul>
```

```js
$scope.mainImageUrl = data.images[0];

$scope.setImage = function(imageUrl) {
  $scope.mainImageUrl = imageUrl;
};
```

## Images
```html
<img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}"></a>
```
Using Angular markup like `{{hash}}` in a src attribute doesn't work right: The browser will fetch from the URL with the literal text `{{hash}}` until Angular replaces the expression inside `{{hash}}`. The ngSrc directive solves this problem.

## Filter
```html
Search: <input ng-model="query">
<ul class="phones">
<li ng-repeat="phone in phones | filter:query">
  {{phone.name}}
  <p>{{phone.snippet}}</p>
</li>
</ul>
```

`currency`, `date`, `json`, `number`, 

`lowercase`, `uppercase`

`orderBy`, `filter`, `limitTo`

# Directives
`ngApp` `ngController`
`ngModel` `ngClass` `ngStyle`
`ngClick` 
`ngIf` `ngShow` `ngHide` `ngRepeat` `ngSwitch`  `ngInclude`    

{% endraw %}

# Controller
The controller is simply a constructor function that takes a `$scope` parameter:

```js
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
```

# Scope
`Scope` is an object that refers to the application model.

# Functions

`angular.bind`
`angular.copy`
`angular.element`
`angular.equals`
`angular.extend`
`angular.forEach`
`angular.merge`
`angular.noop`

`angular.isArray`
`angular.isDate`
`angular.isDefined`
`angular.isElement`
`angular.isFunction`
`angular.isNumber`
`angular.isObject`
`angular.isString`
`angular.isUndefined`

`angular.lowercase`
`angular.uppercase`

`angular.fromJson`
`angular.toJson`

# Providers
Each web application you build is composed of objects that collaborate to get stuff done. These objects need to be instantiated and wired together for the app to work. In Angular apps most of these objects are instantiated and wired together automatically by the `injector service`.

The injector creates two types of objects, `services` and `specialized objects`.

**Services** are objects whose API is defined by the developer writing the service.

**Specialized objects** conform to a specific Angular framework API. These objects are one of `controllers`, `directives`, `filters` or `animations`.

The injector needs to know how to create these objects. You tell it by registering a "recipe" for creating your object with the injector. There are five recipe types.

The most verbose, but also the most comprehensive one is a `Provider` recipe. The remaining four recipe types — `Value`, `Factory`, `Service` and `Constant` — are just syntactic sugar on top of a provider recipe.

---

During application bootstrap, before Angular goes off creating all services, it configures and instantiates all providers. We call this the configuration phase of the application life-cycle. During this phase, services aren't accessible because they haven't been created yet.

Once the configuration phase is over, interaction with providers is disallowed and the process of creating services starts. We call this part of the application life-cycle the run phase.

# Directive

```js
var myModule = angular.module(...);

myModule.directive('directiveName', function factory(injectables) {
  var directiveDefinitionObject = {
    priority: 0,
    template: '<div></div>', // or // function(tElement, tAttrs) { ... },
    // or
    // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
    transclude: false,
    restrict: 'A',
    templateNamespace: 'html',
    scope: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    controllerAs: 'stringIdentifier',
    bindToController: false,
    require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
      // or
      // return function postLink( ... ) { ... }
    },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or
    // link: function postLink( ... ) { ... }
  };
  return directiveDefinitionObject;
});
```

**`require`**
**Require another directive and inject its controller as the fourth argument to the linking function.**

- (no prefix) - Locate the required controller on the current element.
- `^` - Locate the required controller by searching the element and its parents.
- `^^` - Locate the required controller by searching the element's parents.

> `?`, `?^`, `?^^`, - pass `null` to the `link` fn if not found.

# Routing

# $http

# Debug

```js
$scope = angular.element($0).scope()
```

```js
$($0).scope()
```

```js
$($0).injector().get('serviceName')
```
> [Debugging-AngularJS - ng-book](https://www.ng-book.com/p/Debugging-AngularJS/)

# AngularUI
AngularUI - The companion suite(s) to the AngularJS framework.
> [angular-ui.github.io](https://angular-ui.github.io/)

## UI-Router
> <https://github.com/angular-ui/ui-router/wiki>


# Misc
## Google Closure's Type Expressions

`?number` **Nullable type**
`!Object` **"Non-nullable type"**
`@param {number=}` **Optional parameter**

`?`  **UNKNOWN type**

> [google closure compiler - A JavaScript checker and optimizer. ](https://github.com/google/closure-compiler)
[Annotating-JavaScript-for-the-Closure-Compiler - Wiki](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler)