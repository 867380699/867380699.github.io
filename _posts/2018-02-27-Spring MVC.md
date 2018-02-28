---

layout: post
title: "Spring MVC"
date: 2018-02-27

---

# 使用Maven开始一个SpringMVC项目
首先我们新建一个目录,在里面新建一个 `pom.xml`
复制以下内容
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.springframework</groupId>
    <artifactId>gs-serving-web-content</artifactId>
    <version>0.1.0</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.10.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <properties>
        <java.version>1.8</java.version>
    </properties>


    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```
接下来打开Eclipse -> File -> Import... -> Existing Maven Projects -> Next
选择我们的项目 -> Finish
稍等片刻就导入成功了。

接下来新建代码目录和模板目录
```bash
mkdir -p src/main/java/hello
mkdir -p src/main/resources/templates/
```
此时的目录结构如下
```
.
├── pom.xml
├── src
│   └── main
│       ├── java
│       │   └── hello
│       └── resources
│           └── templates
└── target
    └── ...
```

接着创建一个Controller
src/main/java/hello/GreetingController.java
```java
@Controller
public class GreetingController {

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

}
```
然后创建一个模板
src/main/resources/templates/greeting.html
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <p th:text="'Hello, ' + ${name} + '!'" />
</body>
</html>
```

接着还要创建一个入口
src/main/java/hello/Application.java
```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

```
最后启动项目
```
mvn spring-boot:run
```
访问 `localhost:8080/greeting`就可以看见 HelloWorld 了。
# 简易分析
我们简单的看一下代码

pom.xml
```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        ...
    </dependencies>
```
这里 thymeleaf 是一个模板引擎

接着看 greeting.html
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    ...
</head>
<body>
    <p th:text="'Hello, ' + ${name} + '!'" />
</body>
</html>
```
这里的th:text就是一个thymeleaf模板引擎的应用。

我们再看下GreetingController
src/main/java/hello/GreetingController.java
```java
@Controller
public class GreetingController {

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

}
```
这段代码就充满了魔法，只是一个普通的JAVA类，既没有继承抽象类也没有实现特定的接口。仅仅是加了`@Controller`这个注解。
再看greeting这个方法，只是可普通的方法。加上了`@RequestMapping("/greeting")`就表示`/greeting`这个请求是由这个方法来处理的。
参数有两个`String name, Model model`
`name`这个参数前面有个很长的注解 `@RequestParam(value="name", required=false, defaultValue="World")`
`@RequestParam` 把一个query String中的值传给参数。
方法的内容只有两行，第一行`model.addAttribute("name", name);` 把name放进Model。
最后返回了一个字符串`greeting`，这个字符串就是`View`的名字。
在Spring中，Controller负责处理HTTP请求，View负责渲染HTML页面。



# 小结
几个复制粘贴网站就跑起来了，非常方便。
而且非常的简洁，几乎么有多余的代码。
# 参考资料
> [Spring官方教程](https://spring.io/guides/gs/serving-web-content/)