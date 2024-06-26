---
title: Jvm之jstack
icon: fire
category:
  - jvm
tag:
  - JVM 性能分析
---

### 1、JVM调优，性能分析命令
#### 1、jstack指令的命令格式为：jstack [ option ] <pid>

| 选项        | 说明                      |
|-----------|-------------------------|
| -F        | 不影响当前请求情况下，强制输出线程堆栈     |
| -l        | 除了堆栈外，显示关于锁的附加信息        |
| -m        | 如果调用本地方法，可以显示C/C++的堆栈信息 |
| -h        | 获取帮助                    |



1.1、 jstack
```shell
jstack 24916

jstack 62977 | grep "waiting" | awk '{print $1}' # 查询关键信息，或者子线程信息

jstack 62977 |grep 'nid' -C5 -color # 颜色标注
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jstack.png)





