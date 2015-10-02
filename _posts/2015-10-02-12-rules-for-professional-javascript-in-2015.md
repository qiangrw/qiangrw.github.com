---
layout: post
title: 通往JavaScript专家的12条建议（译）
category: 技术
permalink: /2015/10/12-rules-for-professional-javascript-in-2015
keywords: javascript, rules, professional
---

原文链接: [点击查看](https://medium.com/@housecor/12-rules-for-professional-javascript-in-2015-f158e7d3f0fc)


JavaScript很难，他变得非常快以至于你都不知道自己写得是不是对的。
JavaScript语言充满着糟粕的部分，甚至这些糟粕的部分多余优秀的部分。
（译者：这就是为什么还专门有本书写JavaScript好的部分的原因）
但是即便如此，我们不得不好好学习JavaScript，因为它正在漫漫渗透程序世界。
本文会给出我的一些写好JavaScript的建议。

# 1. JS代码需要写到.js文件中
“得了吧，不就几行代码嘛？” 或许你会这么抱怨。 
的确，但我的意思是几乎所有的JS代码需要如此。
这样做有很多好处：增加代码可读性，更好地代码结构性，
而且可以节约带宽。
内嵌的JS代码在每次网页加载的时候都重新下载一遍，
而独立的js文件可以被缓存。
这条建议会影响到后面的好多条建议，所以我们把它列为第一条建议。

![JavaScript Book](http://qiangrw.github.io/images/javascript_book.jpg "JavaScript Book")

# 2. 写静态的JS代码
我曾经看到很多有创造力的黑客习惯于编写动态的JS代码（译者：没错，这样太方便了）。
他们使用服务端语言（如C#、Ruby或者Java）来编写动态代码嵌入到string中。
_但千万不要这么做_，你将失去代码颜色、代码高亮、智能感知等功能。
而且请注意我们的JS需要尽量放到.js文件中（建议1）。

对于动态的部分，我们可以使用JSON数据。
我将其称为JS配置对象模式（JavaScript Configuration Object Pattern）：
将JSON数据注入应用的头部并利用这些数据来生成我们所需要的逻辑。
你可能会说：“嘿，这不违背了建议1嘛？”
然而并没有，我把JSON视为_数据_，而不是代码，
故这里我们讲允许这一个特殊的情形，以支持静态的、独立的JavaScript文件。

StackOverflow就采用了JS配置对象模式，Google也是。
我们来看看他们的代码：

![JavaScript Pattern](http://qiangrw.github.io/images/javascript_pattern.png "JavaScript Pattern")

如图可见，StackOverflow注入了自定义的设置如isNoticesTabEnabled等。
这个简单地JSON片段提供了在使用静态JS文件时需要的自定义配置。
为了实现这个模式，你需要在服务器端提供一个序列化的类到JSON数据中并注入HTML头部<head>，
之后你可以在任意位置引用这些数据（因为他们在head部分就初始化了）。

# 3. JS Should be Minified 

# 4. JS Belongs at the Bottom

# 5. JS Should Be Linted Real-time

# 6. JS Should Have Automated Tests

# 7. JS Should Be Encapsulated

# 8. JS Dependencies Should Be Explicit

# 9. Transpile to JS

# 10. JS Should Have an Automated Build

# 11. Use a Framework or Libraries

# 12. JS Should Separate Concerns


