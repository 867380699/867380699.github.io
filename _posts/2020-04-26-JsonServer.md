---

layout: post
title: "JsonServer"
date: 2020-04-26

---

> <https://github.com/typicode/json-server>

# Demo

```js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(data);
const rewrite = jsonServer.rewriter({
  "/api/*": "/$1",
});
const middlewares = jsonServer.defaults({
  static: "static",
});

// rewrite response
router.render = (req, res) => {
  res.locals.data = {
    success: true,
    data: res.locals.data,
    total: res.get('x-total-count'),
  };
  res.jsonp(res.locals.data);
};

server.use(middlewares);
server.use(rewrite);
server.use(jsonServer.bodyParser);

// rewrite request
server.use((req, res, next) => {
  if (req.query.from) {
    req.query._start = req.query.from
  }
  if (req.query.limit) {
    req.query._limit = req.query.limit
  }
  if (req.query.ids) {
    req.query.id = req.query.ids.split(',')
  }
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
```


# Relationship

## `_embed`
```js
{
  commentId: 1,
  comment: 'A comment',
  postId: 1,
  // ...
}
```

`/posts/1?_embed=comments`

```js
{
  postId: 1,
  content: 'A post',
  comments: [/* all comments postId=1 */]
}
```

## `_expand`
```js
{
  postId: 1,
  userId:1
  // ...
}
```
userId => user

`/posts/1?_embed=user`


> <https://github.com/marak/Faker.js/>

> <https://github.com/chimurai/http-proxy-middleware>

# HTTPS
> <chrome://flags/#allow-insecure-localhost>