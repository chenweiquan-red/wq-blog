---
title: Netty 入门
icon: fire
category:
  - netty
tag:
  - netty 入门
---

### netty入门

#### 1、NIO/BIO/伪异步IO/AIO/NIO2.0 区别
#### 1.1、BIO，同步阻塞IO，典型代表为：TimeServer
BIO流程图：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/BIO.png)

#### 1.2、伪异步IO
为了解决BIO的弊端，后面加了个线程池来优化，形成M个请求对应N个后端线程，M可以远大于N。
伪异步IO流程图：

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/weiBIO.png)




