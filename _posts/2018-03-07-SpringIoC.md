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
只通过 `使用构造方法的参数`，`使用工厂方法的参数`，`对象实例化后再对对象设置属性` 这几个方法来处理依赖。

# 疑问

## 为何使用IoC
首先是方便测试

## 为何使用XML来配置
低耦合，低侵入。


# 参考资料
> [reference: spring-core](https://docs.spring.io/spring/docs/5.0.4.RELEASE/spring-framework-reference/core.html#spring-core)