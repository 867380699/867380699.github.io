---

layout: post
title: "SpringIoC"
date: 2018-03-07

---

# 简介
控制反转（IoC）又称作依赖注入（DI）

在 Spring 中 IoC容器 管理的对象叫做 `Bean`

IoC容器负责配置和实例化 `Bean`

`org.springframework.context.ApplicationContext` 就是一个 Ioc容器 接口

## 容器简介

使用容器需要我们提供配置元数据(Configuration metadata)，它告诉Spring如何实配置，组装，实例化 应用中的对象。

Spring 提供了许多方式来为程序提供配置元数据，如XML，注解，Java代码。

使用XML进行配置时，根节点为`beans`，里面包含了许多的`bean`节点。
使用 Java 配置通常在 `@Configuration` 类中使用 `@Bean` 注解。
另外还可以是用 Spring’s Groovy Bean Definition DSL 来提供配置元数据。

这些 Bean 对应了真实应用中的对象，比如典型的 服务层类，持久层类，DAOs，Hibernate SessionFactories，JMS Queues 等等。

`ApplicationContext` 接口是一个高级工厂，它为 Bean 及其依赖维护了一个注册表，使用 `T getBean(String name, Class<T> requiredType)` 方法就可以检索 Bean 的实例。

`ApplicationContext` 可以让你用以下的方式编写代码。
```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

## Bean 简介

容器自身使用 `BeanDefinition` 类来表述 Bean 的定义，它包含了以下元数据：
- 一个带包名的完整类名 - 通常是bean的实现类
- Bean的行为控制元素 - 作用域，生命周期回调等等
- 其他Bean的引用 - 通常也叫做协作者或依赖
- 对Bean实例的其他配置 - 如线程池的大小


| Property | Explained in…​ |
| --- | --- |
| class | Instantiating beans |
| name | Naming beans |
| scope | Bean scopes |
| constructor arguments | Dependency Injection |
| properties | Dependency Injection |
| autowiring mode | Autowiring collaborators |
| lazy-initialization mode | Lazy-initialized beans |
| initialization method | Initialization callbacks |
| destruction method | Destruction callbacks |


每个Bean都有一个或多个标识符(Identifier)，这些标识符在Bean所处的容器中必须是唯一的。

**Bean 的命名约定**
和在Java中命名成员变量一样，使用小驼峰命名法。
'accountManager', 'accountService', 'userDao', 'loginController'

**Bean 的实例化**
通常是使用构造函数，也可以通过静态工厂方法和实例工厂方法

## 依赖

容器会在创建Bean时注入它们的依赖。

DI只通过 `使用构造方法的参数`，`使用工厂方法的参数`，`对象实例化后再对对象设置属性` 这几个方法来处理依赖。

DI一般分为两类，一种是基于构造方法的，另一种则是基于Setter方法。

那么如何选择呢？

由于我们可以同时使用这两种方式，所以我们可以使用构造方法处理必要的依赖，使用Setter处理可选的依赖。

Spring的团队更加提倡使用构造方法的方式，因为使用这种方式可以确保依赖完整，依赖的所有者始终能得到一个完全初始化的Bean。

Setter的实现方式主要用于依赖可以有合理默认值的情况，否则，在代码的各个地方都要判断依赖是否为空。

如果 Bean 的作用域是 `Singleton`，那么它将在container创建时被创建，其他情况下 Bean 只在被需要用到时被创建。

循环依赖
当我们大量使用构造函数来完成依赖注入时，可能会产生循环依赖，如果Spring在运行时发现循环依赖，就会抛出`BeanCurrentlyInCreationException`,
解决办法就是修改源码，对一些Bean使用Setter处理依赖。

Spring会在container加载时检测配置是否有问题，比如依赖的Bean不存在或是存在循环依赖。








# 疑问

## 为何使用IoC
首先是方便测试，依赖都在接口或是抽象类中，这样就可以方便的在unitTest中使用 `Stub`, `Mock`。

## 为何使用XML来配置
低耦合，低侵入。


# 参考资料
> [reference: spring-core](https://docs.spring.io/spring/docs/5.0.4.RELEASE/spring-framework-reference/core.html#spring-core)