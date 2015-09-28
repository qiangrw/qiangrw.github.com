---
layout: post
title: 初学MongoDB -- SQLer的转变
category: 技术
permalink: /2015/04/sql-to-mongodb/
keywords: SQL, NoSQL, MongoDB
---

最近出于项目原因开始使用MongoDB
（Mentor说最好不要用MySQL， 公司全是MongoDB，非要用MySQL会增加维护成本），
之前一直用SQL类数据库(如MySQL)的我刚开始是，是拒绝的。
然而当我开始慢慢熟悉之后，发现这东西真是太方便了。
本文简要介绍下NoSQL的一些特点，以及如何从一个SQLer快速入门NoSQL.

# NoSQL简介
提到MongoDB，一定要谈一下NoSQL（Not only SQL)。
顾名思义，NoSQL泛指那些最阶段兴起的非关系型数据库，
常见的NoSQL数据库如MongoDB，Neo4J，Cassandra等。
这些数据库主张Schemaless的数据，很适合在集群环境中应用。
NoSQL数据库牺牲了传统数据库（比如SQL）的一致性，来换取一些更有用的特性。

* 首先，NoSQL数据库提供了一种更加符合程序需求的数据模型，
从而程序员不必花大量时间去处理内存数据结构和关系型数据库的映射问题，故而简化了数据交互，减少代码量。

* 其次，在大数据横飞的这个年代，企业非常重视系统并行处理大数据的能力。
虽然关系型数据库也能达成这一目标，但成本很高（毕竟SQL是为独立运行计算机而设计的）。
例如之前在社交网站数据库设计时，为了处理大量用户数据请求,我们会将用户及相关表格取模分机，
但这样一来很多共享数据的处理就变得非常的繁琐。
与SQL不同，NoSQL数据库正是为集群而设计，因此更适合大数据的应用场景。

在了解到NoSQL的特性后，在考虑我正在做的新闻推荐的项目。
数据库需要维护大量的查询文档对特征信息， 而每一行所包含的特征个数完全不定, 也就是没有固定的模式而言。
而这正是NoSQL所擅长的领域。


# SQL to MongoDB

说完了NoSQL的优点，很自然的作为一个SQLer，我们想快速掌握其使用。
人类最厉害的技能之一就是类比，到网上一搜，很容易找到两者之前的对比关系。

参见[本网页的对照表](http://docs.mongodb.org/manual/reference/sql-comparison/)，
我们可以很容易的讲两者对应起来。
毕竟是NoSQL(Not only SQL)，SQL的语法基本都能找到对应项。
更加令人欣喜的是，NoSQL采用JS风格的语法, 这让我们调用语句时更加符合程序员的思维，
也更容易和其他程序语言连接起来。

相信在之后使用的过程中，NoSQL可以给我带来更多地惊喜~


# 参考

* NoSQL精粹, Pramod J. Sadalage Martin Fowler 著, 爱飞翔译
* http://docs.mongodb.org/manual/reference/sql-comparison/
