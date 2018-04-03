---

layout: post
title: "Spring-Boot笔记"
date: 2018-03-30

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

# 运行
## Maven
```bash
mvn spring-boot:run
```
## Gradle
```bash
gradle bootRun
```