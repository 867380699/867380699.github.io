---

layout: post
title: "sqlAlchemy"
date: 2021-08-24

---

# Overview
## Core

**SQLAlchemy Core** is the foundational architecture for SQLAlchemy as a “database toolkit”.

The library provides tools for:
 
- managing connectivity to a database
- interacting with database queries and results
- programmatic construction of SQL statements

## ORM

**SQLAlchemy ORM** builds upon the Core to provide optional object relational mapping capabilities.

The ORM provides an additional configuration layer allowing:

- user-defined Python classes to be mapped to database tables and other constructs
- an object persistence mechanism known as the **Session**
- allow SQL queries to be composed and invoked in terms of user-defined objects

# Establishing Connectivity

`Engine`

```py
from sqlalchemy import create_engine
# future=True making full use of 2.0 style
# echo=True write log to standard out. 
engine = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)
```

- Lazy Connecting
  > The Engine, when first returned by `create_engine()`, has not actually tried to connect to the database yet; that happens only the first time it is asked to perform a task against the database.

# Getting a Connection

```py
from sqlalchemy import text

with engine.connect() as conn:
  result = conn.execute(text("select 'hello world'"))
  print(result.all())
```

- **transaction**
  + _The default behavior of the Python `DBAPI` includes that a transaction is always in progress._
  + _When the scope of the connection is released, a `ROLLBACK` is emitted to end the transaction._ 
  + _**The transaction is not committed automatically**; when we want to commit data we normally need to call `Connection.commit()`._

# Committing Changes

```py
with engine.connect() as conn:
  conn.execute(text("CREATE TABLE some_table (x int, y int)"))
  conn.execute(
    text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
    [{"x": 1, "y": 1}, {"x": 2, "y": 4}]
  )
  conn.commit()
```

- `Engine.begin()` - *auto COMMIT*

# Fetching Rows

```py
result = conn.execute(text("SELECT x, y FROM some_table"))
for row in result:
  print(f"x: {row.x}  y: {row.y}")

for x, y in result:
  print(f"x: {x}  y: {y}")
```

- Result - *an iterable object of result rows*
  + Result.all()

# Sending Parameters

```py
conn.execute(
  text("SELECT x, y FROM some_table WHERE y > :y"),
  {"y": 2}
)

# multi params
conn.execute(
  text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
  [{"x": 11, "y": 12}, {"x": 13, "y": 14}]
)

# bindparams
conn.execute(
  text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y").bindparams(y=6)
)
```

- *qmark parameter style*


# ORM Session

```py
from sqlalchemy.orm import Session

stmt = text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y").bindparams(y=6)
with Session(engine) as session:
  result = session.execute(stmt)
  for row in result:
    print(f"x: {row.x}  y: {row.y}")
```

```py
session.commit()
```

# Metadata

The most common foundational objects for database metadata in SQLAlchemy are:

- MetaData
- Table
- Column

- **Table**
  - `declared` - *explicitly spell out in source code what the table looks like*
  - `reflected` - *generate the object based on what’s already present in a particular database*

```py
from sqlalchemy import MetaData
from sqlalchemy import Table, Column, Integer, String

metadata_obj = MetaData()

user_table = Table(
  "user_account",
  metadata_obj,
  Column('id', Integer, primary_key=True),
  Column('name', String(30)),
  Column('fullname', String)
)

# table's columns
user_table.c.name
user_table.c.keys()

# primary key
user_table.primary_key
```

```py
# emit CREATE TABLE statements
metadata_obj.create_all(engine)
```

# ORM

```py
from sqlalchemy.orm import registry
mapper_registry = registry()
# mapper_registry.metadata
Base = mapper_registry.generate_base()

class User(Base):
  __tablename__ = 'user_account'

  id = Column(Integer, primary_key=True)
  name = Column(String(30))

# core Table
User.__table__

# create tables
Base.metadata.create_all(engine)
# Base.metadata.bind = engine
```

```py
# historically
from sqlalchemy.orm import declarative_base
Base = declarative_base()
```

# Table Reflection

```py
# autoload_with=engine
some_table = Table("some_table", metadata_obj, autoload_with=engine)
```

# CRUD

## Insert

```py
with engine.connect() as conn:
  result = conn.execute(
    insert(user_table),
    [
      {"name": "sandy", "fullname": "Sandy Cheeks"},
      {"name": "patrick", "fullname": "Patrick Star"}
    ]
  )
  conn.commit()
```

## Select

```py
from sqlalchemy import select

stmt = select(user_table).where(user_table.c.name == 'spongebob')

with engine.connect() as conn:
  for row in conn.execute(stmt):
    print(row)
```

ORM:

```py
stmt = select(User).where(User.name == 'spongebob')

with Session(engine) as session:
  for row in session.execute(stmt):
    print(row)
```