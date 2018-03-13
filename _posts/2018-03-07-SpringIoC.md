---

layout: post
title: "Spring IoC"
date: 2018-03-07

---

# 简介
控制反转（IoC）又称作依赖注入（DI）

在 Spring 中 IoC容器 管理的对象叫做 `Bean`

IoC容器负责配置和实例化 `Bean`

`org.springframework.context.ApplicationContext` 就是一个 Ioc容器 接口

# 容器简介

使用容器需要我们提供配置元数据(Configuration metadata)，它告诉Spring如何实配置，组装，实例化 应用中的对象。

Spring 提供了许多方式来为程序提供配置元数据，如XML，注解，Java代码。

使用XML进行配置时，根节点为`beans`，里面包含了许多的`bean`节点。
使用注解进行配置时，通常使用 `@Component` `@Repository` `@Service` `@Controller`。
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

# Bean 简介

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

# 依赖

容器会在创建Bean时注入它们的依赖。

DI只通过 `使用构造方法的参数`，`使用工厂方法的参数`，`对象实例化后再对对象设置属性` 这几个方法来处理依赖。

DI一般分为两类，一种是基于构造方法的，另一种则是基于Setter方法。

那么如何选择呢？

由于我们可以同时使用这两种方式，所以我们可以使用构造方法处理必要的依赖，使用Setter处理可选的依赖。

Spring的团队更加提倡使用构造方法的方式，因为使用这种方式可以确保依赖完整，依赖的所有者始终能得到一个完全初始化的Bean。

使用Setter的实现方式主要用于依赖可以有合理默认值的情况，否则，在代码的各个地方都要判断依赖是否为空。

如果 Bean 的作用域是 `Singleton`，那么它将在container创建时被创建，其他情况下 Bean 只在被需要用到时被创建。

**循环依赖**
当我们大量使用构造函数来完成依赖注入时，可能会产生循环依赖，如果Spring在运行时发现循环依赖，就会抛出`BeanCurrentlyInCreationException`，解决办法就是修改源码，对一些Bean使用Setter处理依赖。

Spring会在container加载时检测配置是否有问题，比如依赖的Bean不存在或是存在循环依赖。

## 简单类型
基本类型，String 之类的。
Spring’s `conversion service` is used to convert these values from a String to the actual type of the property or argument.
```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="masterkaoli"/>
</bean>
```
另外还有 `p-namespace` 形式的XML配置。

然后还有好几种配置方法。

## 引用其他的Bean
```xml
<ref bean="someBean"/>
```
## Inner Beans
Inner Beans 不需要id或是name，如果有，容器也不会使用这个值。
Inner Beans 也会忽略Scope，Inner Beans是匿名的且由外部Bean来创建。
```xml
<bean id="outer" class="...">
    <!-- instead of using a reference to a target bean, simply define the target bean inline -->
    <property name="target">
        <bean class="com.example.Person"> <!-- this is the inner bean -->
            <property name="name" value="Fiona Apple"/>
            <property name="age" value="25"/>
        </bean>
    </property>
</bean>
```
## 集合
`<list/>, <set/>, <map/>, <props/>` 这些XML元素用来设置 `List, Set, Map, Properties` 类型的属性和参数。

```xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- results in a setSomeList(java.util.List) call -->
    <property name="someList">
        <list>
            <value>a list element followed by a reference</value>
            <ref bean="myDataSource" />
        </list>
    </property>
    <!-- results in a setSomeMap(java.util.Map) call -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key ="a ref" value-ref="myDataSource"/>
        </map>
    </property>
</bean>
```
Map的键值和Set的值可以是以下类型
`bean | ref | idref | list | set | map | props | value | null`

Spring 也支持集合合并。

## null 及 空字符串
```xml
<bean class="ExampleBean">
    <property name="email" value=""/>
</bean>
```
```xml
<bean class="ExampleBean">
    <property name="email">
        <null/>
    </property>
</bean>
```
# 自动装配依赖
自动装配（ autowire ）可以极大的减少 属性 和 构造函数参数 的配置。
自动装配可以自动更新配置，当你添加一个依赖时，不必修改配置文件。

自动装配的几个模式

| 模式 | 解释 |
| --- | --- |
| no | 默认 |
| byName | 查找和属性同名的Bean |
| byType | 在容器中找到对应类型的Bean |
| constructor | 和byType类似，但是应用于构造函数的参数 |

显式声明的依赖会覆盖自动装配的依赖。
简单类型的属性不能自动装配。

# Bean的域
Spring支持6种scope

| scope | 描述 |
| --- | --- |
| singleton | 默认，容器中单例 |
| prototype | Bean可以有任意数量的实例 |
| request | 每个HTTP请求都一个新的实例，只在 `web-aware Spring ApplicationContext` 中有效 |
| session | 与 HTTP Session 同生命周期，只在 `web-aware Spring ApplicationContext` 中有效 |
| application | 与`ServletContext`同生命周期，只在 `web-aware Spring ApplicationContext` 中有效 |
| websocket | 与`WebSocket`同生命周期，只在 `web-aware Spring ApplicationContext` 中有效 |

另外还有 `SimpleThreadScope`，但是需要额外的配置才可以使用。

# 基于注解的容器配置
## @Required
用于Bean的setter方法，标记这个Setter的Bean必须在配置时期就设置好。
```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Required
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```
## @Autowired
可以用于成员变量，构造函数和Setter方法。
```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    private MovieCatalog movieCatalog;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```

## @Resource
@Resource 的参数 name 指定 Bean 的 name，如果没有指明的话，对于成员变量则默认为成员变量名，对于Setter方法，则默认为方法参数名。
```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder")
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```
# Classpath扫描及组件管理
前面提到的注解注入，Bean都是在XML中显示声明的，这节将会讨论通过Classpath扫描隐式检测候选组件。
候选组件 (Candidate components) 是容器中满足一定筛选标准且有对应Bean定义的一些类。

我们也可以通过注解而不是XML来注册Bean。

## @Component 及其他模板注解
`@Component` 是一个通用模板标记，用于标记受Spring管理的组件的。

`@Repository` `@Service` `@Controller` 是特定场景下的 `@Component`。

因此也可以使用 `@Component` 替代他们，但是使用 `@Repository` `@Service` `@Controller` 有利于工具识别，也更方便应用Aspect。

另外也便于后续版本的Spring框架给他们添加新的语义。

所以选择更加详细的注解会比较好。

@Repository is already supported as a marker for automatic exception translation in your persistence layer.

## 元注解
元注解就是可以应用在注解之上的注解。比如@Service的元注解有@Component
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component // Spring will see this and treat @Service in the same way as @Component
public @interface Service {

    // ....
}
```

元注解也可以用来创建复合注解，比如 `RestController` 就是由 `@Controller` 和 `@ResponseBody` 复合而成。

## 自动探测Java类及注册Bean定义
需要在@Configuration类上添加`@ComponentScan`
```java
@Configuration
@ComponentScan(basePackages = "org.example")
public class AppConfig  {
    ...
}
```

## 使用过滤器定制扫描

使用 `@ComponentScan` 

## 自动检测组件的命名
@Component 的 name 参数 就是 组件的名字，如果没有指明，默认为首字母小写的类目，如 MovieFinderImpl 的默认名字为 movieFinderImpl
```java
@Service("myMovieLister")
public class SimpleMovieLister {
    // ...
}
```

## 自动检测组件的作用域

```java
@Scope("prototype")
@Repository
public class MovieFinderImpl implements MovieFinder {
    // ...
}
```

## 生成索引
虽然扫描十分迅速，我们仍然可以优化启动速度。


# 使用 JSR 330 标准注解

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

使用 `@Inject` 取代 `@Autowired`

使用 `@Named("movieListener")` 取代 `@Component("movieListener")`


# 基于Java的容器配置
## @Bean 及 @Configuration
`@Bean` 注解 用于标记一个方法 来为容器实例化，初始化对象。

`@Configuration` 用来标记一个主要功能是为容器提供 Bean 定义的类。

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```
# ApplicationContext 的其他能力

## 使用MessageSource实现国际化

## 标准及自定义事件


# 疑问

## 为何使用IoC
首先是方便测试，依赖都在接口或是抽象类中，这样就可以方便的在unitTest中使用 `Stub`, `Mock`。

## 为何使用XML来配置
低耦合，低侵入。

# 词汇

| English | 中文 |
| --- | --- |
| Autowire | 自动装配 |

# 参考资料
> [reference: spring-core](https://docs.spring.io/spring/docs/5.0.4.RELEASE/spring-framework-reference/core.html#spring-core)