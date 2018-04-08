---

layout: post
title: "Spring Data JPA 笔记"
date: 2018-03-28
tag: [java, spring]

---


目的是减少模板代码。

核心接口是 `Repository`

```java
public interface CrudRepository<T, ID extends Serializable>
  extends Repository<T, ID> {

  <S extends T> S save(S entity);      

  Optional<T> findById(ID primaryKey); 

  Iterable<T> findAll();               

  long count();                        

  void delete(T entity);               

  boolean existsById(ID primaryKey);   

  // … more functionality omitted.
}
```


另外还有 `JpaRepository` `MongoRepository`


## 连接Mysql
使用 Spring Boot 会十分的简单。

首先添加依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```
然后添加配置 `resources/application.properties`
```properties
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mysql://192.168.0.1:3306/test
spring.datasource.username=user
spring.datasource.password=password
```

接着添加实体类，这里的 `@Entity`，`@Id`，`@GeneratedValue` 都是 `javax.persistence` 包下的。
```java
@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String url;
    private Date updateTime;
    private Boolean isDelete;

    // ... getter, setter and so on.
}
```
最后添加`Repository`
```java
interface BookmarkRepository extends CrudRepository<Bookmark, Long> {
}
```
完成
```java
Iterable<Bookmark> bookmarks = bookmarkRepository.findAll();
```

> [reference - spring.io](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
> [accessing-data-jpa - spring.io](https://spring.io/guides/gs/accessing-data-jpa/)
> [accessing-data-mysql - spring.io](https://spring.io/guides/gs/accessing-data-mysql/)