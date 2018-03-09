---
layout: post
title:  "Python多线程Pattern"
date:   2018-01-12
tags: python

---

```python
from queue import Queue

def fetchDataByApi(i, q_api, q_db):
    while True:
        data = q_api.get()
        resp = api.get(json=data)
        q_db.put(resp)
        q_api.task_done()

def saveDataToDatabase(i, q_db):
    while True:
        data = q_db.get()
        db.commit(data)
        q_db.task_done()

if __name__ == '__main__':
    q_api = Queue(100)
    q_db = Queue(100)

    for i in range(6):
        apiWorker = Thread(target=fetchDataByApi, args=(i, q_api, q_db))
        apiWorker.setDaemon(True)
        apiWorker.start()

    for i in range(2):
        dbWorker = Thread(target=saveDataToDatabase, args=(i, q_db))
        dbWorker.setDaemon(True)
        dbWorker.start()

    for data in data_source:
        q_sku.put(data)
        sleep(0.03)

    q_api.join()
    q_db.join()
```

> 参考链接 

> [https://pymotw.com/2/Queue/](https://pymotw.com/2/Queue/)

