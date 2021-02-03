> <https://class-component.vuejs.org/>

## install

```
npm install --save vue vue-class-component
```

TypeScript

Babel

## Data

```html
<template>
  <div>{{ message }}</div>
</template>
```
```js
@Component
export default class HelloWorld extends Vue {
  // Declared as component data
  message = 'Hello World!'
}
```

## Methods
```html
<template>
  <button v-on:click="hello">Click</button>
</template>
```
```js
@Component
export default class HelloWorld extends Vue {
  // Declared as component method
  hello() {
    console.log('Hello World!')
  }
}
```

## Computed
Computed properties can be declared as class property getter / setter:

```html
<template>
  <input v-model="name">
</template>
```

```js
@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  // Declared as computed property getter
  get name() {
    return this.firstName + ' ' + this.lastName
  }

  // Declared as computed property setter
  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
```

## Hooks

`data`, `render` and all Vue lifecycle hooks can be directly declared as class prototype methods.

## Other Options
For all other options, pass them to the decorator function:

```js
@Component({
  components: {
    OtherComponent
  },
  setup(rops, context) {
    // ...
  }
})
export default class HelloWorld extends Vue {}
```

## Additional Hooks
```js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
```

## Custom Decorators

## Property Type Declaration

```js
@Component({
  computed: mapGetters([
    'posts'
  ]),

  methods: mapActions([
    'fetchPosts'
  ])
})
export default class Posts extends Vue {

  posts!: Post[]

  fetchPosts!: () => Promise<void>

}
```

## $refs

```js
export default class InputFocus extends Vue {

  $refs!: {
    input: HTMLInputElement
  }

  // ...
}
```

## Property Decorator

> <https://github.com/kaorun343/vue-property-decorator>