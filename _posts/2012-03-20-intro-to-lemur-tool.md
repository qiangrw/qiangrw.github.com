---
layout: post
title: Lemur工具包简介
category: 科研
permalink: /2012/03/intro-to-lemur-tool/
---

![Lemur Toolkit](http://qiangrw.github.com/images/lemur.gif "Lemur Toolkit")

Lemur是一个用于辅助语言模型和信息检索研究的一个工具包，信息检索广泛被认为是一种特殊的分布检索，它包含结构化的查询，跨语言的查询，统计，过滤，分类。Lemur系统的底层架构正是为了实现上面这些技术的，它提供了很多有用的样例应用，并且可以让你方便的定制自己的应用。

Lemur工具包可以支持构建使用语言模型的基础文本检索系统，同时也支持传统的基于向量空间和OKapi的算法。随着Lemur系统的不断升级，它正在向支持更多更广泛的功能进发,比如过滤，问答(question answering)。

Lemur系统对于那些在不想自己写索引而只想开发新技术和算法的语言模型和信息检索研究人员是非常有用的。当然除了建立索引，Lemur也提供了许多基础的检索算法用来比较，如Okapi和KL Divergence。你可以用Lemur来搭建自己的搜索系统。Lemur已经实现了基础的IR，利用结构化查询的分布式IR，利用分布式索引的IR，聚类文本，总结（summarization）。其他也有用Lemur完成过滤任务，网页查找，文章查找和搜索引擎的。

目前LEMUR支持如下特性：

* Indexing
* Retrieval
* Distributed IR
* Document Clustering
* Summarization
* Simple text processing

## 建立索引 INDEX
可以用Lemur为数据集建立索引从而加快检索算法的运行。索引中统计了词项出现的频率、位置信息等。

Lemur主要支持为两种格式的文件建立索引，包括TRECFormat和WebFormat，TREC格式如下所示：

	<DOC>
	  <DOCNO> document_number </DOCNO>
  	  <TEXT>
	  Index this document text.
	  </TEXT>
	</DOC>


并不是文本中所有的词项都会加入索引，Lemur允许用户设置停用词列表来删除常用停用词，也可以对词项进行词干提取（如Porter Stemmer）后加入索引。

整个建立索引的过程可以使用BuildIndex命令加一个参数文件完成，成功建立索引后生成索引文件（后缀为.key）。

一个简单的建立索引参数文件如下所示：

	<parameters>
		<countStopWords>True</countStopWords>
		<dataFiles>/path/to/dataFileList</dataFiles>
		<docFormat>trec</docFormat>
		<index>/path/to/indexFile</index>
		<indexType>key</indexType>
		<memory>1G</memory>
		<stemmer>Porter</stemmer>
		<stopWords>/path/to/stopwordlist</stopWords>
	</parameters>

## 检索 RetEval
给定一个QUERY，我们将其组织成如下格式并存成file.query文件


	<DOC id>
		query_word1 query_word2 query_word3 ... query_wordN
	</DOC>


利用RetEval文件加一个参数文件便能直接在索引上进行检索。常见的参数文件格式如：

	<parameters>
		<index>/path/to/indexFile</index>
		<textQuery>/path/to/file.query</textQuery>
		<resultFormat>10</resultFormat>
		<resultFile>/path/to/resultFile</resultFile>
	</parameters>
 

以上是利用Lemur进行检索的最简单的例子说明，Lemur还包含很多强大的功能。

如Lemur支持建立中文的索引，此时需要将所有数据文件存成UTF-8格式，并将docFormat参数设置成chinese。

更多功能详见其项目主页： http://lemurproject.org/lemur/

同时Lemur也支持在原模型上进行进一步的开发，提供了C++,Java和PHP接口，其中C++接口最为完善，PHP接口仅提供了在已有的索引上用简单的语言模型进行搜索（site-search的配置也有点纠结），故修改模型时采用C++有更多的灵活度。
