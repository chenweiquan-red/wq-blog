---
title: Jvm之jcmd
icon: fire
category:
  - jvm
tag:
  - JVM 性能分析
---

### 1、JVM调优，性能分析命令
#### 1、jcmd指令的命令格式为： jcmd pid [ options ]

1.1、 在JDK1.7以后，新增了一个命令行工具jcmd。它是一个多功能的工具，可以用来实现前面除了jstat之外所有命令的功能，比如用它来导出堆、内存使用、查看Java进程、导出线程信息、执行GC、JVM运行时间等。jcmd拥有jmap的大部分功能，并且官方也推荐使用jcmd命令代替jmap命令。
```shell
 jcmd 15008  help # 查看jcmd支持的相关操作，如下图1
 
 jcmd 15008 VM.uptime # 查看jvm启动时间
 
 jcmd 15008 Thread.print # 打印线程堆栈信息
 
 jcmd 15008 GC.class_histogram # 查看系统中类的统计信息
 
 jcmd 15008 GC.heap_dump D:\d.hprof # 和jmap dump 功能差不多，也会进行一次FGC？
 
 jcmd 15008 VM.flags # 获取启动参数
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jcmdhelp.png)

#### 2、jstatd：远程主机信息收集
之前的指令只涉及监控本机的Java应用程序，而在这些工具中，
一些监控工具也支持对远程计算机的监控（如jps、jstat）。
为了启用远程监控，则需要配合使用jstatd工具。命令jstatd是一个RMI服务端程序，
它的作用相当于代理服务器，建立本地计算机与远程监控工具的通信。jstatd服务器将本机的
Java应用程序信息传递到远程计算机。执行原理如图21-34所示。图21-34　jstatd执行原理图
直接打开jstatd服务器可能会抛出访问拒绝异常，这是因为jstatd程序没有足够的权限，

参考：https://www.cnblogs.com/duanxz/archive/2012/10/25/2738831.html


