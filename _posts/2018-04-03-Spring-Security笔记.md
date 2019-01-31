---

layout: post
title: "Spring-Security笔记"
date: 2018-04-03
tag: [java, spring]

---

# 简介
`Spring Security` 为 J2EE 应用提供了综合的安全服务。

应用安全有两个主要的领域：认证（authentication）和授权（authorization）。这两个领域也是 Spring Security 的主要目标。

*授权（authorization）也叫做访问控制（access control）*

在认证方面，Spring Security 直接支持近30种认证模型，其中大部分模型都是由三方提供的。

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
Spring Boot Starter
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
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


# Hello World

首先添加相关的依赖,然后添加配置即可。

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/css/**", "/index").permitAll()		
				.antMatchers("/user/**").hasRole("USER")			
				.and()
			.formLogin()
				.loginPage("/login").failureUrl("/login-error");	
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.inMemoryAuthentication()
				.withUser("user").password("password").roles("USER");
	}
}
```

`SecurityConfig` 做了非常多的事情：

- 对访问`/user/**`的请求要求认证
- 指定了登陆页面
- 创建了一个用户
- 提供了登出功能
- CSRF攻击保护
- Session Fixation 保护
- Security Header integration
- 集成了许多 Servlet API 

> [hello world - spring.io](https://docs.spring.io/spring-security/site/docs/5.0.3.RELEASE/guides/html5/helloworld-boot.html)

# 使用数据库
Spring Security 的核心接口是 `UserDetailsService` ，此接口用于获取用户的认证和授权信息。
```java
public interface UserDetailsService {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```
该接口只有一个方法 `loadUserByUsername`，返回一个 `UserDetails`。
```java
public interface UserDetails extends Serializable {
    // 授权信息
    Collection<? extends GrantedAuthority> getAuthorities();

    // 密码
    String getPassword();

    // 用户名
    String getUsername();

    // 是否过期，返回false则此用户过期，无法授权 
    boolean isAccountNonExpired();

    // 是否被锁定，返回false则此用户被锁定，无法授权 
    boolean isAccountNonLocked();

    // 密码是否过期，返回false则此用户密码过期，无法授权
    boolean isCredentialsNonExpired();

    // 是否可用，返回false则此用户不可用，无法授权 
    boolean isEnabled();
}
```
以下是一个简易实现的主要步骤：

`UserDetailsService` 中使用 `userRepository` 从数据库中获取用户信息。
```java
@Service
public class MyUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new MyUserPrincipal(user);
    }
}
```
在 `UserDetails` 的实现中配置权限，用户名，密码等。
```java
ublic class MyUserPrincipal implements UserDetails {
    private User user;

    public MyUserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final List<GrantedAuthority> authorities = new ArrayList<>();
        // 注意此处的权限 ROLE_USER
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // ...余下方法皆返回 true

```
`SecurityConfig` 修改配置
```java
@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyUserDetailsService userDetailService;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/css/**", "/index").permitAll()
            .antMatchers("/bookmark/**").hasRole("USER")
            .and()
            .formLogin()
            .loginPage("/user/login").failureUrl("/user/login-error");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // 设置我们的userDetailService实现
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailService);
        return authProvider;
    }
}
```
这样就实现了从数据库中获取用户信息并验证的功能。

关于登出
```java
@Controller
@RequestMapping("/user")
public class UserController {
    // ...
    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/user/login?logout";
    }
}
```

关于在其他Controller中获取用户信息

```java
@Controller
@RequestMapping("/bookmark")
public class BookmarkController {
    private static final Logger logger = LoggerFactory.getLogger(BookmarkController.class);
    @Autowired BookmarkRepository bookmarkRepository;
    @Autowired UserRepository userRepository;

    // 直接在参数中添加Principal 
    @RequestMapping("/all")
    public String getAllBookmark(Principal principal, Model model){
        User user = userRepository.findByUsername(principal.getName());
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(user.getId());
        logger.error(bookmarks.toString());
        model.addAttribute("bookmarks", bookmarks);
        return "bookmarks";
    }
}
```

## 参考资料
[自定义UserDetailsService - boraji.com](https://www.boraji.com/spring-security-5-custom-userdetailsservice-example)
[返回403的问题 - stackoverflow.com](https://stackoverflow.com/questions/1279083/403-access-is-denied-after-authenticating)
[登出demo - websystique.com](http://websystique.com/spring-security/spring-security-4-logout-example/)
[get-user-in-spring-security - baeldung.com](http://www.baeldung.com/get-user-in-spring-security)
[一个完整的demo（Boot,MVC,Security,MySQL） - medium.com/@gustavo.ponce.ch](https://medium.com/@gustavo.ponce.ch/spring-boot-spring-mvc-spring-security-mysql-a5d8545d837d)


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


# 参考资料
> [表单配置 - spring.io](https://docs.spring.io/spring-security/site/docs/current/guides/html5/form-javaconfig.html)
> [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture/)