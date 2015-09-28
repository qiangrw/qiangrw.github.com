---
layout: post
title: 在C++中使用SSE优化点乘运算
category: 技术
permalink: /2015/09/optimize-dot-product-with-sse/
keywords: dot-product, sse, c++
---

# 引言

在数学中，点乘（也称点积，dot product）运算的输入为两个向量，返回一个实数标量。
n维向量的[内积定义](http://baike.baidu.com/link?url=LTLShAYCiDt7zG8vfKpAFfo2DTwXaalDa6hYJS0kAbtVhzONN1ywDX8A2kPwkzHNepqNlGiEnUVDCtohJSCV7wodx5tEZDzAKbJw6l583GkdejCX84mwDEbsAyMF19omNY-G3B5ZMYfyNgiQNYyIld5nmfWQid0z3_OpktyC7Ba) 为:

![Dot Product](http://qiangrw.github.io/images/dot_product.png "Dot Product")
其中n表示向量的维度。

随着[词向量](https://code.google.com/p/word2vec/)技术（讲词映射到实数向量空间，以方便计算词之间的相似度）的成熟，人们开始在各个领域使用词向量，如单词相似度计算、POS、信息检索领域等。
不管是计算词之间的相似度，或者是进一步计算词组（phrase）或者句子（sentence）之间的相似度，无可避免的我们需要计算两个向量的点积。
在实际应用中，这一步操作的复杂度也很大程度上影响了系统的性能。
为此，我们希望用已有的技术尽可能加快点积操作。
在C++中，能让我们更快计算点积的便是SSE指令，本文将简要介绍SSE以及使用。

# 什么是SSE
writing ... 

# 简单程序示例
testing ...

```
double DotProdNormal(const double *p, const double *q, int size)
{
	double res = 0;
	for (int i = 0; i < size; ++i) {
		res += p[i] * q[i];
	}
	return res;
}
```








