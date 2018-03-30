---

layout: post
title: "Spring Data JPA 笔记"
date: 2018-03-28

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

> [reference - spring.io](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
> [accessing-data-jpa - spring.io](https://spring.io/guides/gs/accessing-data-jpa/)
> [accessing-data-mysql - spring.io](https://spring.io/guides/gs/accessing-data-mysql/)