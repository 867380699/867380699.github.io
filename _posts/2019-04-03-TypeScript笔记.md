---

layout: post
title: "TypeScript 笔记"
date: 2019-04-03

---

TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

# Basic Types
```ts
// boolean
let isDone: boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = "blue";

// array
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// tuple
let x: [string, number] = ["hello", 10]; 

// enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

```

# Advanced Types

## Intersection Types
```ts
function extend<First, Second>(first: First, second: Second): First & Second {
  // ...
}
```
## Union Types 
```ts
function getSmallPet(): Fish | Bird {
    // ...
}
```

using type assertion:

```ts
let pet = getSmallPet();

if ((pet as Fish).swim) {
    (pet as Fish).swim();
} else if ((pet as Bird).fly) {
    (pet as Bird).fly();
}

```
Notice that we had to use type assertions several times. It would be much better if once we performed the check, we could know the type of pet within each branch.

It just so happens that TypeScript has something called a `type guard`. A `type guard` is some expression that performs a runtime check that guarantees the type in some scope.


using type predicates:

To define a type guard, we simply need to define a function whose return type is a `type predicate`:
```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```


# tsconfig.json
The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project.

The `tsconfig.json` file specifies the root files and the compiler options required to compile the project. 

## Path mapping 
```json
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

# Refs

> <https://github.com/microsoft/TypeScript>