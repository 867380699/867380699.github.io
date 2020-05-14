---

layout: post
title: "AngularJS笔记"
date: 2018-12-10

---

# Hello world

```html
<!doctype html>
<html ng-app>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
  </head>
  <body>
    <div>
      <label>Name:</label>
      <input type="text" ng-model="yourName" placeholder="Enter a name here">
      <hr>
      <h1>Hello {{yourName}}!</h1>
    </div>
  </body>
</html>
```

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

## Expression
An expression doesn’t throw errors if it results in a `TypeError` or a `ReferenceError`.

```html
<h1>Hello {{unknown.a.b.c}}</h1>
<h1>Hello {{unknown[1][2][3]}}</h1>
<h1>Hello {{unknownFunc().a[2]}}</h1>
<!-- etc. -->
```

Angular evaluates expressions by an internal service (called the `$parse `service).

To manually parse an expression, we can inject the `$parse` service into a controller.



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
{% endraw %}

# Directives
`ngApp` `ngController`
`ngModel` `ngClass` `ngStyle`
`ngClick` 
`ngIf` `ngShow` `ngHide` `ngRepeat` `ngSwitch`  `ngInclude`    

## ngApp
The `ng-app` attribute declares that everything inside of it belongs to this Angular app.

When `Angular` starts to run and generate the view, it will create a binding from the root `ng-app` element to the `$rootScope`. This `$rootScope` is the eventual parent of all $scope objects.

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

## Life Cycle

- Creation
- Watcher registration
- Model mutation
- Mutation observation
- Destruction


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

## $provide
The `$provide` service has a number of methods for registering components with the `$injector`. Many of these functions are also exposed on `angular.Module`.

### provider()

`provider(name, provider);`

Register a provider function with the `$injector`. Provider functions are constructor functions, whose instances are responsible for "providing" a factory for a service.

- `name` 
  - *string* - The name of **instance**.
- `provider`
  - *Object* - it should have a `$get` method. The `$get` will be invoked using `$injector.invoke()` when an instance needs to be created.
  - *function()* - Constructor, a new instance  will be created using `$injector.instantiate()`, then treated as object.

```js
aModule.provider('foo', function() {
  this.$get = function() {
    return 1;
  }
});
```

```js
// What this does, is inject into the controller what the $get returns.
aModule.controller('BarCtrl', function(foo) { ... });
```


### factory()

`factory(name, $getFn);`

### service()

### value()

### constant()

## $injector
`invoke(fn, [self], [locals]);`
Invoke the method and supply the method arguments from the `$injector`.

`instantiate(Type, [locals]);`
Create a new instance of JS type. The method takes a constructor function, invokes the new operator, and supplies all of the arguments to the constructor function as specified by the constructor annotation.

- `Type` - Function - Annotated constructor function.

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

`post`
This is the most commonly used for data binding

- Safe to attach event handlers to the DOM element.
- All children directives are linked, so it's safe to access them.
- Never set any data required by the child directive here. Because child directive's will be linked already.

`Pre`
Used rarely. One of the use case is when a child directive requires data from its parent, the parent directive should set it through its pre-link function.

- Set data required for its child directives.
- Safe to attach event handlers to the DOM element.
- Not safe to access DOM elements belong to child directives. They're not linked yet.

**`require`**
**Require another directive and inject its controller as the fourth argument to the linking function.**

- (no prefix) - Locate the required controller on the current element.
- `^` - Locate the required controller by searching the element and its parents.
- `^^` - Locate the required controller by searching the element's parents.

> `?`, `?^`, `?^^`, - pass `null` to the `link` fn if not found.

# Routing

# $http

The `$http` service is a function which takes a single argument — **a configuration object** — that is used to generate an HTTP request and returns a `promise`.

```js
// Simple GET request example:
$http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
```

The `response` object has these properties:

- data – {string|Object} – The response body transformed with the transform functions.
- status – {number} – HTTP status code of the response.
- headers – {function([headerName])} – Header getter function.
- config – {Object} – The configuration object that was used to generate the request.
- statusText – {string} – HTTP status text of the response.

## Shortcut methods
```js
$http.get('/someUrl', config).then(successCallback, errorCallback);
$http.post('/someUrl', data, config).then(successCallback, errorCallback);
```

# $resource
A factory which creates a resource object that lets you interact with `RESTful` server-side data sources.

Return a resource "class" object with methods for the default set of resource actions optionally extended with custom `actions`.

The default set contains these actions:

```js
{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
```


# $q
A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.


`$q` can be used in two fashions --- one which is more similar to Kris Kowal's Q or jQuery's Deferred implementations, and the other which resembles ES6 (ES2015) promises to some degree.

```js
function asyncGreet(name) {
  // perform some asynchronous operation, resolve or reject the promise when appropriate.
  return $q(function(resolve, reject) {
    setTimeout(function() {
      if (okToGreet(name)) {
        resolve('Hello, ' + name + '!');
      } else {
        reject('Greeting ' + name + ' is not allowed.');
      }
    }, 1000);
  });
}

var promise = asyncGreet('Robin Hood');
promise.then(function(greeting) {
  alert('Success: ' + greeting);
}, function(reason) {
  alert('Failed: ' + reason);
});
```

```js
function asyncGreet(name) {
  var deferred = $q.defer();

  setTimeout(function() {
    deferred.notify('About to greet ' + name + '.');

    if (okToGreet(name)) {
      deferred.resolve('Hello, ' + name + '!');
    } else {
      deferred.reject('Greeting ' + name + ' is not allowed.');
    }
  }, 1000);

  return deferred.promise;
}

var promise = asyncGreet('Robin Hood');
promise.then(function(greeting) {
  alert('Success: ' + greeting);
}, function(reason) {
  alert('Failed: ' + reason);
}, function(update) {
  alert('Got notification: ' + update);
});
```

> [q - A promise library for JavaScript](https://github.com/kriskowal/q)

# AngularUI
AngularUI - The companion suite(s) to the AngularJS framework.
> [angular-ui.github.io](https://angular-ui.github.io/)

## UI-Router
> <https://github.com/angular-ui/ui-router/wiki>

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

```js
function getScopeVal($scope, valName) {
  if (!$scope) return;
  if ($scope[valName] ) {
    return $scope[valName];
  } else {
    return getScopeVal($scope.$parent, valName);
  }
}
```

**Chrome Plugin**
ng-inspect for AngularJS

`$s` for scope, `$is` for isolateScope, `$rs` for rootScope, `$el` for jQuery element.

`Services`/`Factories`/`Constants` can be tested/verified using `$get` function.

`$count` function prints number of Scopes, isolateScopes, listeners and watchers. 

> <https://chrome.google.com/webstore/detail/ng-inspect-for-angularjs/cidepfmbgngpdapgncfhpecbdhmnnemf>

# Under the hood
Angular will do a dirty check inside its event loop to ensure everything is consistent.


# Misc
## Google Closure's Type Expressions

`?number` **Nullable type**
`!Object` **"Non-nullable type"**
`@param {number=}` **Optional parameter**

`?`  **UNKNOWN type**

> [google closure compiler - A JavaScript checker and optimizer. ](https://github.com/google/closure-compiler)
[Annotating-JavaScript-for-the-Closure-Compiler - Wiki](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler)