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
_但千万不要这么做_，你将失去代码着色、代码高亮、JavaScript智能提示等优势。
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
为了实现这个模式，你需要在服务器端提供一个序列化的类到JSON数据中并注入HTML头部`<head>`，
之后你可以在任意位置引用这些数据（因为他们在`<head>`部分就初始化了）。

# 3. 最小化JS代码来节约存储
最小化JS代码可以减少文件大小，从而加快页面加载速度。
为了最小化JS代码，同样地，你必须要遵从建议1.
过去最小化JS代码还挺麻烦的，现在有很多自动化工具可以实现了。
推荐使用含[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)的
[Gulp](http://gulpjs.com/)来完成。

# 4. JS放在文件底部 
如果你把所有`<script>`标签都放在`<head>`标签内，会阻塞HTML页面的加载。
在`<head>`标签内的JS代码必须在body之前就加载完。
而把`<script>`标签放在底部可以让页面不用等待下载脚本就把页面先加载显示出来。
这样做能给用户至少先看到页面的基本内容，从而提升用户体验。
如果你的确必须把某些JS代码放在头部，你可以考虑使用JQuery的`$(document).ready`代码块，
这样你的这部分代码会在DOM元素准备好之后再执行。

# 5. JS需要实时通过LINT检查 
LINT代码检查强制要求我们按照代码风格指南来书写代码，
防止拼写错误，有助于避免代码错误。
有很多LINT代码检查工具，这里我推荐使用[ESLint](http://eslint.org/)
你可以用带[gulp-esint](https://www.npmjs.com/package/gulp-eslint)的[Gulp](http://gulpjs.com/)工具。
一旦你进行了保存操作，Gulp就会监视并检查你的所有JS代码文件。
对了，为了实现上述功能，你必须遵从建议1所说的：把JS代码单独保存到.js文件中。


# 6. JS代码需要有自动化测试 
我们很早前就知道在服务器端测试的重要性。
而在JavaScript这一块测试却长时间被大家所忽视。
到了现在，典型的JavaScript应用已经覆盖了太大的范围，
大到我们常规的定期手动检查已经不能很好的对其进行测试了。
在JavaScript处理如此多逻辑的应用中，我们不得不对其进行自动化测试。

你可以用[Selenium](http://www.seleniumhq.org/)进行自动化集成测试。
然而，集成测试一般都比较脆弱，并不能很好地检查出来所有错误。
所以我推荐大家进一步进行单元测试。
有很多单元测试的工具供我们选择，
如果你还是个JavaScript测试新手，我推荐使用[Jasmine](http://jasmine.github.io/)；
如果你想有最高端的配置，可以使用配备[Chai](http://chaijs.com/)的[Mocha](https://mochajs.org/)框架。

# 7. JS代码需要封装
我们很早前就已经知道使用全局变量的危害性。幸运的是，至今我们已经有很多种封装JS代码的方法了：

* [Immediately Invoked Function Expressions](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE)
* [Revealing Modules](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) 
* [AMD](http://requirejs.org/docs/whyamd.html) (在[RequireJS](http://requirejs.org/)中使用) 
* [CommonJS](http://www.sitepoint.com/understanding-module-exports-exports-node-js/) (Node.js中使用, 在浏览器中通过[Browserify](http://browserify.org/)或[Webpack](http://webpack.github.io/)使用)
* [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Browser_compatibility)

最后一种方法ES6模块很有前途，一个好消息是虽然ES6模块现在不被浏览器支持，
你可以用[Babel](https://babeljs.io/)编译器来源码编译这些模块，从而现在你就可以用上这些模块。

如果你实在不想要源码编译，CommonJS应该是当前的最好的选择。
因为Node就使用CommmonJS的模式，你可以使用npm来获取1,000个包。
CommmonJS在浏览器中不能独立运行，
所以你需要使用一个打包工具类似[Browserify](http://browserify.org/)或[Webpack](http://webpack.github.io/)使用

# 8. 需要显示指出JS代码依赖
这条建议和上一条建议息息相关。
一旦你开始封装你的JS代码，就需要一个简单易行的方法来引用其他模块。
这就是现代化模块系统如CommonJS和ES6模块的优雅之处。
你可以在文件头部指定你的依赖，很像Java或者C\#中的import语句。
JavaScript已经越来越成熟了。

```javascript
//CommonJS
var react = require(‘react’);
//ES6 Modules
import React from ‘React’
```


# 9. 翻译到可用的JS代码
JavaScript最新的版本[EcmaScript2015](http://www.ecma-international.org/ecma-262/6.0/)，也即ES6，在今年六月发布。
浏览器尚[不支持对其新特性](https://kangax.github.io/compat-table/es6/)，
但问题不大，你可以使用[Babel](https://babeljs.io/)来拥抱[大部分新特性](http://es6katas.org/)。
Babel讲ES6翻译成ES5，假设你可以很好地处理好[性能变化](http://kpdecker.github.io/six-speed/),
就可以很好地使用这些新特性。
JavaScript现在几乎每年更新一版本，所以我们将很可能和代码翻译相依为命。
代码翻译是我们的未来。
或者如果你偏爱使用强类型，那么你可以尝试使用[TypeScript](http://www.typescriptlang.org/)来编译到JS代码。

_结果就是： 你不再需要写ES5代码了。考虑使用抽象来给你额外的力量！_

# 10. JS代码需要有自动化构建
我们已经说过LINT检查，最小化代码，代码翻译和测试。
那么如何让这些过程自动发生呢？ 
很简单，采用自动化构建工具来监视所有代码文件。
同样，Gulp仍然是把这些连在一起的流行工具，采用其[监视函数](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)。
Grunt和[Webpack](http://webpack.github.io/) 也是不错的选择。
如果你是个Bash天才，你当然也可以完全自己用npm构建这样的自动化工具。
关键在于，不要想着有个人可以手动来做这些事情，自动化起来并享受其带来的快乐！

# 11. 使用框架或者库

# 12. JS Should Separate Concerns
我们很容易养成将所有JS代码放到一个文件里面的习惯，
或者相应地按照你所用的框架的建议来。
在写Client时不要忘了你在写Server端时学到的经验。



