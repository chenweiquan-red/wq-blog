---
title: rocketMQ
icon: lightbulb
---


## RocketMq技术内幕

### 1、rocketmq路由中心ns以及broker之间的联系
```text
    rocketmq集群一般是指broker的集群，每个br都会连接到NS上，br和ns是长连接，10s心跳，
    生产者和消费者需要先从ns中获取到实际的broker才进行消息发送及消费。
```

### 2、rocketmq生产者问题
```text
    a、消息发送方式有三种：同步，异步（通过回调函数确认消息是否成功），单向（只管发送，不管是否成功）

    问题思考：
    1）消息队列如何进行负载？
    答：rocketMQ 是在客户端做的负载均衡，主要分为生产者轮训发送消息到队列上，消费者通过平均、环形等算法消费不同的队列，达到负载均衡。
    
    2）消息发送如何实现高可用？
    
    3）批量消息发送如何实现一致性？
```

### 3、rocketmq底层文件存储
```text
   1、commitLog: 消息实际顺序写入的文件
   2、consumeQueue: 固定长度的队列，存储offset偏移量以及大小
   3、index: 索引文件
   
   详细解读：
   commitLog: 单纯就是消息的顺序写入文件，值得一提的是commitLog的命名是通过偏移量来命名的，
   比如：00000000000000000000  00000000001073741824，这样通过偏移量来查询消息的时候可以用二分法快速找到目标文件。
   默认文件大小为1G，1G大概就是1073741824，所以第二个文件就是这样出来计算出来的。


   consumeQueue: 8字节偏移量 + 4字节大小 + 8字节tag 哈希码
   
   index： index head(40字节) + slot table(4 * 500w) + link list (20 * 2000w)
           
          index head名词解析：
            beginTimestamp：文件中消息的最小存储时间 8字节
            endTimestamp：文件中消息的最大存储时间 8字节
            beginPhyoffset：消息的最小偏移量 8字节
            endphyoffset：消息的最大物理偏移量 8字节
            hashSlotCount：已用 hash 槽个数 4字节
            indexCount：已用 index 个数 4字节
            
          slot table: 4字节，存放key.hash值，通过计算hash / 500W 落在link list 的具体位置上
          
          link list: 20字节， 4字节的hash值+8个字节的消息实际位移+4个字节一个时间差啥的+4个字节的slotValue
         
            
```
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/rocketmq/consumeLog.png)

### 4、RocketMQ集群

##### 4.1、NameServer集群
NS集群中每个节点都是独立，相互不影响的，

##### 4.2、Broker集群
Broker集群中，通过相同的 BrokerName 表示相同的broker集群, 通过不同的 BrokerID 区分主从节点。
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/rocketmq/rocketBroker.png)


##### 4.3、RocketMQ的4种集群模式
1、单Master
```text
优点：简单，方便
缺点：风险高，一旦master宕机，会导致整个服务不可用
```
2、多Master,无slave
```text
优点：简单，性能高，消息也不回丢失
缺点：当某一个Master宕机，会导致消息消费不到，或者服务恢复之前都消费不到，实时性受影响
```

3、多Master, 多slave(异步复制)
```text
优点：实时性也不会受到影响
缺点：Master宕机，磁盘损坏情况下，会丢失部分未同步数据
```

4、多Master, 多slave(同步双写，HA)
```text
优点：消息也不回丢失，实时性也没有太大影响
缺点：相对于异步复制，同步双写会稍微耗时（10%），只有Master和Slave写入成功才返回状态
```