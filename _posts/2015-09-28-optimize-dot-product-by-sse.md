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

随着[词向量](https://code.google.com/p/word2vec/)技术
（将词映射到实数向量空间，以方便计算词之间的相似度）的成熟，
人们开始在各个领域使用词向量，如单词相似度计算、PartOfSpeech Tagger、短文本检索等。
不管是计算词之间的相似度，或者是进一步计算词组（phrase）或者句子（sentence）之间的相似度，
无可避免的我们需要计算两个向量的点积。
在实际系统中，这一步操作的复杂度也很大程度上影响了系统的性能。
为此，我们希望用已有的技术尽可能加快点积操作。
在C++中，能让我们更快计算点积的便是SSE指令，本文将简要介绍SSE以及使用。

# 什么是SSE


# 简单程序示例
作为示例，我们用单精度浮点数保存向量空间的点坐标。
那么对于纬度均为size的向量p和向量q，最常见的计算向量内积的方式如下：

```c
float DotProdNormal(const float *p, const float *q, int size)
{
	float res = 0;
	for (int i = 0; i < size; ++i) {
		res += p[i] * q[i];
	}
	return res;
}

```

而采用SSE技术的点积操作如下书写：

```c
float DotProdSSE(const float *p, const float *q, int size) {
    float result[4]; 
    __m128 X, Y, Z;
    for (int i = 0; i < size; i += 4) {
        X = _mm_loadu_ps(p + i);
        Y = _mm_loadu_ps(q + i);
        X = _mm_mul_ps(X, Y);
        if (i == 0) Z = X;
        else Z = _mm_add_ps(X, Z);
    }
    _mm_storeu_ps(result, Z);
    for(int i = 1; i < 4; ++i) {
        result[0] += result[i];
    }
    return result[0];
}
```




# 性能对比
本小杰给出采用SSE优化前后向量点积操作的性能对比。







