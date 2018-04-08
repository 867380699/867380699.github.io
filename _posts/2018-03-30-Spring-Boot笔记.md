---

layout: post
title: "Spring-Boot笔记"
date: 2018-03-30
tag: [java, spring]

---

# 简介
使用 `Spring Boot`，我们可以更加方便的构建独立的产品级Srping应用。

Spring Boot 的主要目标：

- 开箱即用
- 零代码生成，零XML配置

# 代码结构
建议把 `main application class` 放在其他package的根目录下，这样子 `@ComponentScan` 就不必配置 `basePackage`了，`@EnableAutoConfiguration` 注解也长常常放在 mian class 上，以此给 JPA 提供搜索 `@Entity` 的路径。

这里有一个典型的包结构：
```java
com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```

`Application.java` 中会声明main函数并且会使用一些基本配置：
```java
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```
# Starters
`Starters` 是一些快捷的依赖配置。

比如要使用 `FreeMarker`，只需添加：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

*许多 Starter 都有一个 **spring.provides** 文件，这个文件只是给工具使用的，比如用于实现AutoComplete。*

> [Reference - spring.io](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-build-systems.html#using-boot-starter) 

# @EnableAutoConfiguration
这个注解告诉 Spring Boot 通过依赖来猜测配置。比如依赖了一个 `spring-boot-starter-web`，auto-configuration 就会猜测我们是在开发一个web应用，并依此做出相应的配置。


# 运行
## Maven
```bash
mvn spring-boot:run
```
## Gradle
```bash
gradle bootRun
```

# 打包
## Maven
添加`spring-boot-maven-plugin`，然后使用 `mvn package` 打包，打好的jar包会在 `target` 目录下，使用 `java -jar` 即可运行。
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```