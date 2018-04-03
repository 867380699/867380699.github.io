---

layout: post
title: "Spring-Security笔记"
date: 2018-04-03

---

# 简介
`Spring Security` 为 J2EE 应用提供了综合的安全服务。

应用安全有两个主要的领域：认证（authentication）和授权（authorization）。这两个领域也是 Spring Security 的主要目标。

*授权（authorization）也叫做访问控制（access control*

在认证方面，Spring Security 支持许多的认证模型，大约有30种。其中大部分模型都是由三方提供的。

- HTTP基本认证
- HTTP摘要认证
- HTTP X.509 证书认证
- OpenID 授权
- ......

此外，Spring Security 也允许自定义认证机制。

Spring Security provides a deep set of authorization capabilities. There are three main areas of interest: authorizing web requests, authorizing whether methods can be invoked and authorizing access to individual domain object instances. 

# 获取 Spring Security
## Maven
```xml
<dependencies>
<!-- ... other dependency elements ... -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-web</artifactId>
    <version>5.0.3.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-config</artifactId>
    <version>5.0.3.RELEASE</version>
</dependency>
</dependencies>
```

## 项目模块
Spring Security 分了许多的模块。

**Web - spring-security-web.jar**
包括过滤器和相关的基础代码，用于为web项目提供授权访问及基于URL的访问控制。

**Config - spring-security-config.jar**
包括namespace解析及Java配置解析的代码。

**OAuth 2.0 Core - spring-security-oauth2-core.jar**
OAuth 2.0 支持

......

> [Reference - docs.spring.io](https://docs.spring.io/spring-security/site/docs/5.0.3.RELEASE/reference/htmlsingle/#modules)

# 附录
## HTTP基本认证

HTTP基本认证使用请求头 `Authorization`，其中的值为 `base64(username + ":" + password)` 。
```
Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
```
编码的目的并不是为了安全，而是为了去除不兼容的字符。

> [HTTP基本认证 - wikipedia.org](https://zh.wikipedia.org/wiki/HTTP%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%81)

## HTTP摘要认证
摘要访问认证在密码发出前，先对其应用哈希函数，相对于HTTP基本认证发送明文而言更加安全。

未授权响应：
```html
HTTP/1.0 401 Unauthorized
Server: HTTPd/0.9
Date: Sun, 10 Apr 2014 20:26:47 GMT
WWW-Authenticate: Digest realm="testrealm@host.com",
                        qop="auth,auth-int",
                        nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                        opaque="5ccc069c403ebaf9f0171e9517f40e41"
Content-Type: text/html
Content-Length: 153

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Error</title>
  </head>
  <body>
    <h1>401 Unauthorized.</h1>
  </body>
</html>
```
客户端请求：
```
GET /dir/index.html HTTP/1.0
Host: localhost
Authorization: Digest username="Mufasa",
                     realm="testrealm@host.com",
                     nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                     uri="/dir/index.html",
                     qop=auth,
                     nc=00000001,
                     cnonce="0a4f113b",
                     response="6629fae49393a05397450978507c4ef1",
                     opaque="5ccc069c403ebaf9f0171e9517f40e41"
```

> [HTTP摘要认证 - wikipedia.org](https://zh.wikipedia.org/wiki/HTTP%E6%91%98%E8%A6%81%E8%AE%A4%E8%AF%81)