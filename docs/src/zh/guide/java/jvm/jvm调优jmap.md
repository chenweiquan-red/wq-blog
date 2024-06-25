---
title: Jvm之jmap
icon: fire
category:
  - jvm
tag:
  - JVM 性能分析
---

### 1、JVM调优，性能分析命令
1、jmap指令的命令格式为：jmap [options] pid

| 选项             | 说明                                                                                      |
|----------------|-----------------------------------------------------------------------------------------|
| -heap          | 查看进程堆内存使用情况，包括使用的GC算法、堆配置参数和各代中堆内存使用情况                                                  |
| -histo         | 查看堆内存中的对象数目、大小统计直方图，如果带上live则只统计活对象并且会强制执行一次GC                                          |
| -dump          | 用jmap把进程内存使用情况dump到文件中，再用jhat分析查看，通常在写dump文件前会触发一次Full GC，所以dump文件里保存的都是Full GC后留下的对象信息 |
| -clstats       | 显示Java堆中元空间的类加载器的统计信息                                                                   |
| -finalizerinfo | 显示在F-Queue中等待Finalizer线程执行finalize方法的对象                                                 |


1.1、 jmap
```shell
jmap 22492  # 显示Java虚拟机进程的内存映像信息
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap.png)



1.2、jmap -heap
```shell
jmap -heap 22492 # 指定的垃圾回收算法的信息, 堆的配置信息
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap1.png)

```text
解读：可以看到JVM版本，并行垃圾回收器，以及堆内存配置，最大80M，NewRatio比例2，SurvivorRatio比例8。
```


1.3、 jmap -histo[:live]
```shell
jmap -histo 22492 # 显示Java堆中对象的统计信息，包括：对象数量、占用内存大小(单位：字节)和类的完全限定名
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphisto.png)

```shell
jmap -histo:live 22492 # 显示存活对象，并且会执行一次GC，FGC？
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphistolive.png)


1.4、jmap -dump




