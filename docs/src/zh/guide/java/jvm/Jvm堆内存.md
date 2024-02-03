---
title: Jvm堆内存
icon: circle-info
---


# 1、Jvm堆内存


### 1.1、内存参数设置
```text
jvm 内存主要是堆内存，存储对象。堆内存主要由新生代和老年代组成。
新生代：Eden, S0(from), S1(to)
老年代：Old/Tenured

新生代老年代默认比例：-XX：NewRatio = 2，表示新生代占1，老年代占2
新生代中E,S,S默认比例为：6:1:1

常用的JVM设置参数：Xms（初始）,Xmx（最大） 主要是指堆内存的空间。
一般初始：1/64物理内存
一般最大：1/4物理内存
注意：生产一般会设置成一样的，主要是缓解内存伸缩带来额外的开销。


Eden发生YoungGC、MinorGC,
第一次发生GC，对象由Eden回收，没有回收到的就移动到S0（对象计数1）

第二次发生GC，对象从Eden/S0移动到 S1，这时候S0、Eden没有数据，S1有数据（对象计数 + 1）

第三次发生GC，对象从S1移动到S0，计数+1

...
次数达到15次就进入Old区

Old区满，发生FullGc

FullGc后内存还是不够发生OOM
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvmesso.jpg)


### 1.2、对象分配内存流程

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvm%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)


# 2、Jvm常用命令
```shell
1、jps 查看进程
2、jstat
 jstat -gc 15744 ## 查看GC信息，Jvm内存占用情况

3、jmap
 ## 打印的信息分别为：共享对象的起始地址、映射大小、共享对象路径的全程。
 jmap 15744 ## 主要用于打印指定java进程的共享对象内存映射或堆内存细节 
 
 jmap -heap pid  ## 查看堆使用情况
 map -histo pid  ## 查看堆中对象数量和大小
 
```


