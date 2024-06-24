---
icon: fire
category:
  - JVM 性能分析
tag:
  - jvm
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

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jstat1.png)
```shell
jstat -gc 1994 1000 10

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

2、S1C是第二个幸存区，容量为：16284KB, EC区为：19
理论上：S0C:S1C:EC = 1:1:6
(这个问题能从《剑指JVM》中7.8找到)

```


