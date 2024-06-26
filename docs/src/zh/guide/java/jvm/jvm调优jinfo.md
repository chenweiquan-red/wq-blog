---
title: Jvm之jinfo
icon: fire
category:
  - jvm
tag:
  - JVM 性能分析
---

### 1、JVM调优，性能分析命令
1、jinfo指令的命令格式为： jinfo  [ options ] pid

| 选项               | 说明                                          |
|------------------|---------------------------------------------|
| no option        | 输出所有的参数和系统属性，包括默认值                          |
| -flag name       | 输出对应名称的参数                                   |
| -flag [+-]name   | 开启或者关闭对应参数名称的参数，只有标记为manageable 的参数才可以被动态修改 |
| -flag name=value | 修改对应参数的值                                    |
| -flags           | 输出全部的参数                                     |
| -sysprops        | 输出系统属性，system.getProperties()               |



1.1、 jinfo
```shell
 jinfo -flags 24916 # 输出参数

 #查看JVM是否使用了ParallelGC垃圾收集器
 jinfo –flag UseParallelGC 15008
 
  #新生代对象晋升到老年代对象的最大年龄
 jinfo -flag MaxTenuringThreshold 15008
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfo.png)
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfoflags.png)

