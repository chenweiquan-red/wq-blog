---
title: Jvm之jstat
icon: fire
category:
  - jvm
tag:
  - JVM 性能分析
---

### 1、JVM调优，性能分析命令
1、jstat指令的命令格式为：jstat [options] pid [interval] [count]

| 选项           | 说明                                                |
|---------------|---------------------------------------------------|
| -gc           | 统计垃圾回收的堆信息，单位为空间字节数，即单位为KB                        |
| -gcutil       | 统计垃圾回收的堆信息，单位为空间的百分比                              |
| -class        | 统计类加载器的信息                                         |
| -compile      | 统计编译行为信息                                          |
| -gccapacity   | 统计不同区域（新生代、老年代、永久代）的堆容量信息                         |
| -gccause      | 统计引起垃圾回收的事件                                       |
| -gcnew        | 统计垃圾回收时，新生代的情况                                    |
| -gcnewcapacity | 统计垃圾回收时，新生代堆空间容量                                  |
| -gcold        | 统计垃圾回收时，老年代的情况                                    |
| -gcoldcapacity | 统计垃圾回收时，老年代堆空间容量                                  |
| -gcpermcapacity | 统计垃圾回收时，永久代的堆空间容量                                 |

1.1、 jstat -gc
```shell
jstat -gc 61971 1000 10  # 统计垃圾回收的堆信息 每秒打印进程1994gc信息，打印10次
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jstat1.png)
```shell

S0C：第一个幸存区的大小，单位KB
S1C：第二个幸存区的大小
S0U：第一个幸存区的使用大小
S1U：第二个幸存区的使用大小
EC：伊甸园区的大小
EU：伊甸园区的使用大小
OC：老年代大小
OU：老年代使用大小
MC：方法区大小
MU：方法区使用大小
CCSC:压缩类空间大小
CCSU:压缩类空间使用大小
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收消耗时间，单位s
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间，单位s
GCT：垃圾回收消耗总时间


解读：
1、S0C如果是空的，说明开启了指针压缩。实际上java1.8默认是开启了指针压缩
如果要关闭指针压缩可以使用：java -XX:-UseCompressedOops -jar your-application.jar
指针压缩相关blog: https://www.cnblogs.com/star95/p/17512212.html

2、S1C为：16284KB, EC区为：196608KB OC：147456KB
比例：S0C:S1C:EC = 0:1:12
S1C+EC : OC = 1.44 (这个比例怎么这么奇怪？后续可以看看参数设置和默认值是多少)
(这个问题能从《剑指JVM》中7.8找到)

```
IDEA设置运行最大堆内存，最小堆内存为80M，再运行命令看看，截图如下：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gc80m.png)

S0C+S1C+EC = 80m
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcbl.png)



1.2、jstat -gcutil
```shell
jstat -gcutil 22492 1000 # 统计垃圾回收的堆信息，单位为空间的百分比
```
模拟产生OOM的过程，需要Jmeter 和 设置IDEA 分配的内存。

Jmeter安装教程：https://www.cnblogs.com/luoshuai7394/p/17932334.html

设置截图：右键新增线程组，新增tcp取样器，新增监听器查看结果树
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmetertcp.png)


```text
S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元数据区使用比例
CCS：压缩类使用比例
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间
```
通过压测可以看到老年代使用比例达到了99%，100%。从而发生了OOM。

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcutil1.png)


1.3、 jstat -gccause
```shell
jstat -gccause 22492 1000 # 统计引起垃圾回收的事件
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gccause.png)

```text
S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元空间使用比例
CCS：压缩类使用比例
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收所用的时间
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收所用的时间
GCT：垃圾回收的所用的总时间
LGCC：上次垃圾回收的原因
GCC：当前垃圾回收的原因

解读：
FGC FGCT GCT 无论是FGC的次数还是频率，还是耗时都是逐渐在上升。从840-1100，说明对象一直被引用没有被释放。从而导致OOM

LGCC： Allocation Failure（内存分配失败，没有空间分配，
个人理解：图中YGC没有变化，说明新生代向老年代存储的时候，老年代空间不够导致FGC一直执行）

GCC：Ergonomics (“人体工程学”，jvm中是自适应调整的意思。默认开启了UseAdaptiveSizePolicy，jvm自动调解gc暂停时间
和吞吐量之间的平衡，进行自适应调整引发的gc。)
```

1.4、 常用参数
```text
-Xms：程序启动时占用的内存大小，此值可以和-Xmx相同，避免每次垃圾回收后重新分配内存
-Xmx：程序运行时的最大可占用的内存大小
-Xmn：年轻代的内存大小，整个堆大小=年轻代 + 老年代，官方建议大小为堆空间的1/3，年轻代中又细分为伊甸区、幸存1区、幸存2区，其比例默认为8:1:1。
-XX: NewRatio=N：表示老年代与年轻代的内存比例，默认为2，即2:1，相当于年轻代占堆内存空间的1/3，老年代占2/3
-XX: PretenureSizeThreshold：大对象阈值，单位为字节Byte（1M=1024KB, 1KB=1024Byte），如果对象超过这个值，就会直接进入
```

1.5、线上问题定位
```shell
top # 查看占用最高的进制ID

top -Hp 进程id # 查看进程中占用最高的线程
```






