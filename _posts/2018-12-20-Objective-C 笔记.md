---

layout: post
title: "Objective-C 笔记"
date: 2018-12-20
tags: [ios]

---

# 简介
It’s a **superset** of the **C programming language** and provides object-oriented capabilities and a dynamic runtime.

`Objective-C` 继承了 `C` 的语法，基本类型，控制语句，在此之上添加了定义类和方法的语法。

You have a large library of existing objects available for your use, provided by **Cocoa** *(for OS X)* and **Cocoa Touch** *(for iOS)*.

# Class
define classes in Objective-C by declaring an interface

This interface includes the list of messages that the class can receive, so you also need to provide the class implementation, which contains the code to be executed in response to each message.

Some classes define objects that are **immutable**. This means that the internal contents must be set when an object is created, and cannot subsequently be changed by other objects. In Objective-C, all basic `NSString` and `NSNumber` objects are **immutable**. If you need to represent a different number, you must use a new `NSNumber` instance.

Some immutable classes also offer a mutable version. such as `NSMutableString`.

Objective-C defines a root class from which the vast majority of other classes inherit, called `NSObject`.

![Button Inheritance](/assets/button_inheritance.png)


In Objective-C, the interface and implementation are usually placed in separate files so that you only need to make the interface public.

The Objective-C syntax used to declare a `class interface` looks like this:

```objc
@interface SimpleClass : NSObject

@end
```

Objects often have properties intended for public access.
Declarations for properties should be added inside the interface, like this:

```objc
@interface Person : NSObject
 
@property NSString *firstName;
@property NSString *lastName;

@end
```
Property Attributes Indicate Data Accessibility and Storage Considerations
The examples shown so far all declare properties that are intended for complete public access. This means that other objects can both read and change the values of the properties.

```objc
@interface Person : NSObject

@property (readonly) NSString *firstName;

@end
```

Method Declarations Indicate the Messages an Object Can Receive

In Objective-C terms, one object sends a message to another object by calling a method on that object.

```objc
- (void)someMethod;
```

`-` indicates that it is an instance method

An Objective-C method declaration includes the parameters as part of its name, using colons, like this:

```objc
- (void)someMethodWithValue:(SomeType)value;
```

```objc
- (void)someMethodWithFirstValue:(SomeType)value1 secondValue:(AnotherType)value2;
```
and in fact the secondValue: portion of the method declaration is part of the name of the method:
```
someMethodWithFirstValue:secondValue:
```

**Class Names Must Be Unique**
It’s important to note that the name of each class must be unique within an app, **even across included libraries or frameworks**.

 Objective-C provides a **preprocessor directive** - `#import`, for this purpose. It’s similar to the C `#include` directive, but makes sure that a file is only included once during compilation.

```objc
#import "XYZPerson.h"
 
@implementation XYZPerson
- (void)sayHello {
    NSLog(@"Hello, World!");
}
@end
```

Objective-C string literal, `@"Hello, world!"`
Strings are one of several class types in Objective-C that allow a shorthand literal syntax for their creation.
Specifying `@"Hello, world!"` is conceptually equivalent to saying “An Objective-C string object that represents the string Hello, world!.”

# Working with Objects

## send messages
```objc
[someObject doSomething];
[someObject doSomethingWithFirstValue:value1 secondValue:value2];
```

For the most part, the Automatic Reference Counting (ARC) feature of the Objective-C compiler takes care of these considerations for you.

Whenever you’re writing a method implementation, you have access to an important hidden value, `self`. Conceptually, `self` is a way to refer to “the object that’s received this message.
```objc
@implementation XYZPerson
- (void)sayHello {
    [self saySomething:@"Hello, world!"];
}
- (void)saySomething:(NSString *)greeting {
    NSLog(@"%@", greeting);
}
@end
```

There’s another important keyword available to you in Objective-C, called `super`. Sending a message to `super` is a way to call through to a method implementation defined by a superclass further up the inheritance chain. The most common use of super is when overriding a method.

```objc
@implementation XYZShoutingPerson
- (void)saySomething:(NSString *)greeting {
    NSString *uppercaseGreeting = [greeting uppercaseString];
    [super saySomething:uppercaseGreeting];
}
@end
```

As described earlier in this chapter, memory is allocated dynamically for an Objective-C object. The first step in creating an object is to make sure enough memory is allocated not only for the properties defined by an object’s class, but also the properties defined on each of the superclasses in its inheritance chain.

The `NSObject` root class provides a class method, `alloc`, which handles this process for you:

```objc
+ (id)alloc;
```

You need to combine a call to `alloc` with a call to `init`, another NSObject method:

```objc
- (id)init;
```

The `init` method is used by a class to make sure its properties have suitable initial values at creation.

```objc
NSObject *newObject = [[NSObject alloc] init];
```

Class Factory Methods Are an Alternative to Allocation and Initialization

```objc
+ (NSNumber *)numberWithBool:(BOOL)value;
+ (NSNumber *)numberWithFloat:(float)value;
+ (NSNumber *)numberWithInt:(int)value;
+ (NSNumber *)numberWithLong:(long)value;
```

```objc
NSNumber *magicNumber = [NSNumber numberWithInt:42];
```

Use new to Create an Object If No Arguments Are Needed for Initialization

```objc
XYZObject *object = [XYZObject new];
// is effectively the same as:
XYZObject *object = [[XYZObject alloc] init];
```

Literals Offer a Concise Object-Creation Syntax

```objc
NSString *someString = @"Hello, World!";
```
This is effectively the same as allocating and initializing an NSString or using one of its class factory methods:

```objc
NSString *someString = [NSString stringWithCString:"Hello, World!"
                                            encoding:NSUTF8StringEncoding];
```

The `NSNumber` class also allows a variety of literals:

```objc
NSNumber *myBOOL = @YES;
NSNumber *myFloat = @3.14f;
NSNumber *myInt = @42;
NSNumber *myLong = @42L;
```

Determining Equality of Objects
If you need to test whether two objects represent the same data, you need to call a method like `isEqual:`, available from `NSObject`:

```objc
if ([firstPerson isEqual:secondPerson]) {
    // firstPerson is identical to secondPerson
}
```

This isn’t necessary for object pointers to initialize scalar variables at the time you declare them, because the compiler will automatically set the variable to `nil` if you don’t specify any other initial value.

A `nil` value is the safest way to initialize an object pointer if you don’t have another value to use, because it’s perfectly acceptable in Objective-C to send a message to `nil`. If you do send a message to `nil`, obviously nothing happens.

Note: If you expect a return value from a message sent to `nil`, the return value will be `nil` for object return types, `0` for numeric types, and `NO` for BOOL types. Returned structures have all members initialized to zero.

## Get or Set Property Values
```objc
NSString *firstName = [somePerson firstName];
[somePerson setFirstName:@"Johnny"];
```

By default, these accessor methods are synthesized automatically for you by the compiler, so you don’t need to do anything other than declare the property using `@property` in the class interface.

The synthesized methods follow specific naming conventions:

- The method used to access the value (the getter method) has the same name as the property.
The getter method for a property called `firstName` will also be called `firstName`.

- The method used to set the value (the setter method) starts with the word “set” and then uses the capitalized property name.
The setter method for a property called `firstName` will be called `setFirstName:`.

```objc
@property (getter=isFinished) BOOL finished;
```

```objc
@property (readonly, getter=isFinished) BOOL finished;
```

**Dot Syntax Is a Concise Alternative to Accessor Method Calls**
As well as making explicit accessor method calls, Objective-C offers an alternative dot syntax to access an object’s properties.

```objc
NSString *firstName = somePerson.firstName;
somePerson.firstName = @"Johnny";
```

Dot syntax is purely a convenient wrapper around accessor method calls. When you use dot syntax, the property is still accessed or changed using the getter and setter methods mentioned above:

Getting a value using `somePerson.firstName` is the same as using `[somePerson firstName]`
Setting a value using `somePerson.firstName = @"Johnny"` is the same as using `[somePerson setFirstName:@"Johnny"]`
This means that property access via dot syntax is also controlled by the property attributes. If a property is marked readonly, you’ll get a compiler error if you try to set it using dot syntax.


Access Instance Variables Directly from Initializer Methods

A typical init method looks like this:
```objc
- (id)init {
    self = [super init];
 
    if (self) {
        // initialize instance variables here
    }
 
    return self;
}
```
You should always access the instance variables directly from within an initialization method because at the time a property is set, the rest of the object may not yet be completely initialized.

```objc
- (id)initWithFirstName:(NSString *)aFirstName lastName:(NSString *)aLastName {
    self = [super init];
 
    if (self) {
        _firstName = aFirstName;
        _lastName = aLastName;
    }
 
    return self;
}
```


Use Strong and Weak Declarations to Manage Ownership

```objc
@property (weak) id delegate;
```

Copy Properties Maintain Their Own Copies
```objc
@interface XYZBadgeView : NSView
@property (copy) NSString *firstName;
@property (copy) NSString *lastName;
@end
```

## Customizing Existing Classes

Objects should have clearly-defined tasks, such as modeling specific information, displaying visual content or controlling the flow of information. 

Objective-C allows you to add your own methods to existing classes through categories and class extensions.

### Categories
A category can be declared for any class, even if you don’t have the original implementation source code *(such as for standard Cocoa or Cocoa Touch classes)*. Any methods that you declare in a category will be available to all instances of the original class, as well as any subclasses of the original class.

declare a category 
```objc
@interface ClassName (CategoryName)
 
@end
```
```objc
#import "XYZPerson.h"
 
@interface XYZPerson (XYZPersonNameDisplayAdditions)
- (NSString *)lastNameFirstNameString;
@end
```

Even though any methods added by a category are available to all instances of the class and its subclasses, you’ll need to import the category header file in any source code file where you wish to use the additional methods, otherwise you’ll run into compiler warnings and errors.

As well as just adding methods to existing classes, you can also use categories to split the implementation of a complex class across multiple source code files. 

Because the methods declared in a category are added to an existing class, you need to be very careful about method names.

In order to avoid undefined behavior, it’s best practice to add a prefix to method names in categories on framework classes, just like you should add a prefix to the names of your own classes. 

### Extensions
A class extension bears some similarity to a category, but it can only be added to a class for which you have the source code at compile time (the class is compiled at the same time as the class extension). 

The methods declared by a class extension are implemented in the @implementation block for the original class so you can’t, for example, declare a class extension on a framework class, such as a Cocoa or Cocoa Touch class like NSString.



```objc
@interface ClassName ()
 
@end
```
Because no name is given in the parentheses, class extensions are often referred to as `anonymous categories`.


# Working with Protocols
Objective-C allows you to define protocols, which declare the methods expected to be used for a particular situation. 

A class interface declares the methods and properties associated with that class. A protocol, by contrast, is used to declare methods and properties that are independent of any specific class.

```objc
@protocol ProtocolName
// list of methods and properties
@end
```

Objective-C uses angle brackets to indicate conformance to a protocol. This example declares a weak property for a generic object pointer that conforms to the XYZPieChartViewDataSource protocol.
```objc
@interface XYZPieChartView : UIView
@property (weak) id <XYZPieChartViewDataSource> dataSource;
...
@end
```

**Protocols Can Have Optional Methods**
By default, all methods declared in a protocol are required methods. This means that any class that conforms to the protocol must implement those methods.

It’s also possible to specify optional methods in a protocol. These are methods that a class can implement only if it needs to.

```objc
@protocol XYZPieChartViewDataSource
- (NSUInteger)numberOfSegments;
- (CGFloat)sizeOfSegmentAtIndex:(NSUInteger)segmentIndex;
@optional
- (NSString *)titleForSegmentAtIndex:(NSUInteger)segmentIndex;
@end
```

If a method in a protocol is marked as optional, you must check whether an object implements that method before attempting to call it.

```objc
NSString *thisSegmentTitle;
if ([self.dataSource respondsToSelector:@selector(titleForSegmentAtIndex:)]) {
    thisSegmentTitle = [self.dataSource titleForSegmentAtIndex:index];
}
```
The `respondsToSelector:` method uses a selector, which refers to the identifier for a method after compilation. You can provide the correct identifier by using the `@selector()` directive and specifying the name of the method.

**Protocols Inherit from Other Protocols**
In the same way that an Objective-C class can inherit from a superclass, you can also specify that one protocol conforms to another.

As an example, it’s best practice to define your protocols to conform to the `NSObject` protocol

```objc
@protocol MyProtocol <NSObject>
...
@end
```

**Conforming to Protocols**
The syntax to indicate that a class adopts a protocol again uses angle brackets.


```objc
@interface MyClass : NSObject <MyProtocol, AnotherProtocol, YetAnotherProtocol>
...
@end
```

# Values and Collections

```objc
@implementation XYZCalculator
- (void)increment {
    self.currentValue++;
}
- (void)decrement {
    self.currentValue--;
}
- (void)multiplyBy:(double)factor {
    self.currentValue *= factor;
}
@end
```
Dot syntax is purely a syntactic wrapper around accessor method calls, so each of the operations in this example is equivalent to first using the get accessor method to get the value, then performing the operation, then using the set accessor method to set the value to the result.

The `BOOL` scalar type is defined in Objective-C to hold a Boolean value, which is either `YES` or `NO`. As you might expect, `YES` is logically equivalent to `true` and `1`, while `NO` is equivalent to `false` and `0`.

These types, like `NSInteger` and `NSUInteger`, are defined differently depending on the target architecture. 

It’s best practice to use these platform-specific types if you might be passing values across API boundaries (both internal and exported APIs), such as arguments or return values in method or function calls between your application code and a framework.

For local variables, such as a counter in a loop, it’s fine to use the basic C types if you know that the value is within the standard limits.

The `NSNumber` class is used to represent any of the basic C scalar types, including `char`, `double`, `float`, `int`, `long`, `short`, and the `unsigned` variants of each, as well as the Objective-C Boolean type, `BOOL`.

It’s also possible to create `NSNumber` instances using Objective-C literal syntax:

```objc
NSNumber *magicNumber = @42;
NSNumber *unsignedNumber = @42u;
NSNumber *longNumber = @42l;

NSNumber *boolNumber = @YES;

NSNumber *simpleFloat = @3.14f;
NSNumber *betterDouble = @3.1415926535;

NSNumber *someChar = @'T';
```

**Represent Other Values Using Instances of the NSValue Class**
The `NSNumber` class is itself a subclass of the basic `NSValue` class, which provides an object wrapper around a single value or data item. In addition to the basic C scalar types, `NSValue` can also be used to represent pointers and structures.

you can create an` NSValue` instance by providing a pointer to the structure as well as an encoded Objective-C type. The `@encode()` compiler directive is used to create the correct Objective-C type, like this:

```objc
typedef struct {
    int i;
    float f;
} MyIntegerFloatStruct;

struct MyIntegerFloatStruct aStruct;
aStruct.i = 42;
aStruct.f = 3.14;
 
NSValue *structValue = [NSValue value:&aStruct
                         withObjCType:@encode(MyIntegerFloatStruct)];
```


most collections in Objective-C code are instances of one of the Cocoa and Cocoa Touch collection classes, like `NSArray`, `NSSet` and `NSDictionary`.


The basic `NSArray`, `NSSet` and `NSDictionary` classes are **immutable**, which means their contents are set at creation. Each also has a mutable subclass to allow you to add or remove objects at will.

An `NSArray` is used to represent an ordered collection of objects. The only requirement is that each item is an Objective-C object— there’s no requirement for each object to be an instance of the same class.

```objc
NSArray *someArray = @[firstObject, secondObject, thirdObject];
```

```objc
[someArray containsObject:someString]
[someArray objectAtIndex:0] // someArray[0] // alternative
```

If you need to be able to add or remove objects from an array after initial creation, you’ll need to use `NSMutableArray`, which adds a variety of methods to add , remove or replace one or more objects:

```objc
NSMutableArray *mutableArray = [NSMutableArray array];
[mutableArray addObject:@"gamma"];
[mutableArray replaceObjectAtIndex:0 withObject:@"epsilon"];
```

An `NSSet` is similar to an array, but maintains an unordered group of **distinct** objects.

```objc
NSSet *simpleSet = [NSSet setWithObjects:@"Hello, World!", @42, aValue, anObject, nil];
```

Rather than simply maintaining an ordered or unordered collection of objects, an `NSDictionary` stores objects against given keys, which can then be used for retrieval.

```objc
NSDictionary *dictionary = @{
            @"anObject" : someObject,
         @"helloString" : @"Hello, World!",
         @"magicNumber" : @42,
              @"aValue" : someValue
};
```
There’s also a subscript syntax alternative to using `objectForKey:`, which looks like this:


```objc
NSNumber *storedNumber = dictionary[@"magicNumber"];
```

If you need to add or remove objects from a dictionary after creation, you need to use the `NSMutableDictionary` subclass.

Many collection classes conform to the `NSFastEnumeration` protocol, including `NSArray`, `NSSet` and `NSDictionary`. This means that you can use fast enumeration, an Objective-C language-level feature.

The fast enumeration syntax to enumerate the contents of an array or set looks like this:

```objc
for (<Type> <variable> in <collection>) {
    ...
}
```

# Block
The syntax to define a block literal uses the caret symbol (`^`), like this:

```objc
^{
    NSLog(@"This is a block");
}
```
In the same way that you can use a function pointer to refer to a C function, you can declare a variable to keep track of a block, like this:

```objc
void (^simpleBlock)(void);
```

```objc
void (^simpleBlock)(void) = ^{
    NSLog(@"This is a block");
};
```
Once you’ve declared and assigned a block variable, you can use it to invoke the block:
```objc
simpleBlock();
```

Blocks can also take arguments and return values just like methods and functions.
```objc
double (^multiplyTwoValues)(double, double) =
    ^(double firstValue, double secondValue) {
        return firstValue * secondValue;
    };
 
double result = multiplyTwoValues(2,4);
```

# 附录
![Xcode](/assets/xcode_workspace.png)

