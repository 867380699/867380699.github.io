---

layout: post
title: "SpringCore笔记"
date: 2018-04-10
tag: [java, spring]

---

# Validation
Spring Framework 4.0 支持 Bean Validation 1.0 (JSR-303) 和 Bean Validation 1.1 (JSR-349) ，并将它们应用于 `Validator` 接口。
## JSR-303
当处理一个应用程序的业务逻辑时，数据校验是必须要考虑的事情。应用程序必须通过某种手段来确保输入进来的数据从语义上来讲是正确的。在通常的情况下，应用程序是分层的，不同的层由不同的开发人员来完成。很多时候同样的数据验证逻辑会出现在不同的层，这样就会导致代码冗余和一些管理的问题，比如说语义的一致性等。为了避免这样的情况发生，最好是将验证逻辑与相应的域模型进行绑定。

[Bean Validation 介绍及最佳实践 - ibm.com](https://www.ibm.com/developerworks/cn/java/j-lo-jsr303/)

Spring 使用 `Validator` 接口来校验对象。使用 `Errors` 对象来接收校验的错误信息。

```java
public class Person {

    private String name;
    private int age;

    // the usual getters and setters...
}
```

```java
public class PersonValidator implements Validator {

    /**
     * This Validator validates *just* Person instances
     */
    public boolean supports(Class clazz) {
        return Person.class.equals(clazz);
    }

    public void validate(Object obj, Errors e) {
        ValidationUtils.rejectIfEmpty(e, "name", "name.empty");
        Person p = (Person) obj;
        if (p.getAge() < 0) {
            e.rejectValue("age", "negativevalue");
        } else if (p.getAge() > 110) {
            e.rejectValue("age", "too.darn.old");
        }
    }
}
```

[validator demo - spring.io](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#validator)

# Data Binding
Data binding 可以把用户的输入动态的绑定给应用的领域模型。Spring 使用 `DataBinder` 来实现这个功能。

# BeanWrapper
`BeanWrapper` 提供了嵌套获取属性的功能。BeanWrapper 也提供了设置`PropertyChangeListeners`的能力。`BeanWrapper` 通常不会被直接使用，但是`DataBinder`和`BeanFactory`都使用了它。
使用 `setPropertyValue(s)` 和 `getPropertyValue(s)` 来读写属性。

| Expression | Explanation |
| --- | --- |
| name | getName() or isName() and setName(..) |
| account.name | getAccount().setName() or getAccount().getName() |
| account[2] | Indicates the third element of the indexed property account. |
| account[COMPANYNAME] | Indicates the value of the map |



