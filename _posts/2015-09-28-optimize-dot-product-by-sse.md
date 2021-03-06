---
layout: post
title: 在C++中使用SSE优化点乘运算
category: 技术
permalink: /2015/09/optimize-dot-product-with-sse/
keywords: dot-product, sse, c++
---

# 引言

在数学中，点乘（也称点积，dot product）运算的输入为两个向量，返回一个实数标量。
n维向量的[点积定义](http://baike.baidu.com/link?url=LTLShAYCiDt7zG8vfKpAFfo2DTwXaalDa6hYJS0kAbtVhzONN1ywDX8A2kPwkzHNepqNlGiEnUVDCtohJSCV7wodx5tEZDzAKbJw6l583GkdejCX84mwDEbsAyMF19omNY-G3B5ZMYfyNgiQNYyIld5nmfWQid0z3_OpktyC7Ba)为:

![Dot Product](http://qiangrw.github.io/images/dot_product.png "Dot Product")

其中n表示向量的维度。

随着[词向量](https://code.google.com/p/word2vec/)技术
（将词映射到实数向量空间，以方便计算词之间的相似度）的成熟，
人们开始在各个领域使用词向量，如单词相似度计算、PartOfSpeech Tagger、短文本检索等。
不管是计算词之间的相似度，或者是进一步计算词组（phrase）或者句子（sentence）之间的相似度，
无可避免的我们需要计算两个向量的点积。
在实际系统中，这一步操作的复杂度也很大程度上影响着系统的性能。
为此，我们希望用已有的技术尽可能加快点积操作。
在C++中，能让我们更快计算点积的便是SSE指令，本文将简要介绍SSE以及使用。

# 什么是SSE
SSE是Streaming SIMD Extensions的缩写，即SIMD流指令扩展。
它是一组专用于信号处理、科学计算以及3D图形应用的CPU指令集。
SIMD是Single Instruction, Multiple Data的缩写，即单指令处理多条数据。

SSE最早在奔腾三处理中引入(1999)。 
随后，该指令集不断成熟，
支持了更多成熟的操作，引入了8个128比特的寄存器到CPU中：xmm0 - xmm7。
刚开始的时候，这些寄存器只可以用于单精度数（即float）的计算，
到了SSE二代的时候，就可以用于任何基础数据类型了。
以一台32位的计算机为例，我们可以并行处理：

* 2个double/long类型数据
* 4个float/int类型数据
* 8个short类型数据
* 16个char类型数据

举个更具体的例子，如果你需要计算两个int数组的和，你可以同时进行4个加法运算。
特别的，整数类型可以是有符号，也可以是无符号的，但处理时需要使用不同的指令。

# 简单程序示例
作为示例，我们用单精度浮点数保存向量空间的点坐标。
那么对于纬度均为size的向量p和向量q，最常见的计算向量内积的方式如下：

```c 
float DotProd(const float *p, const float *q, int size)
{
	float res = 0;
	for (int i = 0; i < size; ++i) {
		res += p[i] * q[i];
	}
	return res;
}
```

作为一个新手，编写SSE指令相关的代码不是一件容易的事，
MSDN给出了比较详细的一个[使用文档](https://msdn.microsoft.com/en-us/library/kcwz153a\(v=vs.90\).aspx)。
在C++中使用SSE的确是一项很底层的工作，类似编写汇编，
我们需要直接控制那些128比特寄存器。
其中，\_\_m128用于float类型定义，\_\_m128d用于double类型，\_\_m128i用于int，short和char类型。
幸运的是，我们并不需要去特别声明这些类型的数组。
举个例子，我们在计算一个很大的数组的平方根时，
可以将数据指针置为\_\_m128*类型，从而方便的使用SSE操作。

那么，言归正传，采用SSE技术的点积操作可以按如下书写（这里我们假设size是4的倍数）：

```c
#include <smmintrin.h>
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
    for (int i = 1; i < 4; ++i) {
        result[0] += result[i];
    }
    return result[0];
}
```

在编译SSE指令的程序时，需要显示说明(假设主代码文件为main.cpp)：

{% highlight bash %}
    g++ -m64 -msse4.1 -c main.cpp
{% endhighlight bash %}	

# 性能对比
本小节给出采用SSE优化前后向量点积操作的性能对比。
测试采用计算1M次100维的向量点积运算，在Macbook Air上跑。
前者使用440.161ms, 后者使用229.644ms，快了近一倍。


# 参考
* http://felix.abecassis.me/2011/09/cpp-getting-started-with-sse/




