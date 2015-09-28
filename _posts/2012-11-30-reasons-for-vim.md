---
layout: post
title: vim编辑体验
category: 技术
permalink: /2012/11/reasons-for-vim/
keywords: vim, plugin, reasons
---

刚开始接触vim还是在大三JYY大神的操作系统课程上，到现在已经好两年多了，然后就爱上了这个编辑器。
本文分享我在vim下的编辑体验，由于水平有限，欢迎大家指正。
如果你想深入了解vim的每一个细节，请移步[vim-doc](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html).

## 我常用基本操作

* gg 光标跳转文件首部
* Shift + g 光标移动到文件末尾
* Shift + j 合并两行
* n + yy 复制n行
* Ctrl + p 自动补全
* = + Shift + G 自动代码对齐(你可以再.vimrc中设置tab长度，indent长度等)
* 输入n次相同字符, 复制后 n+p 
* :vsp/:sp 宽屏/竖屏必备多窗口操作编辑(Ctrl+w+w 切换窗口)
* :%s/pattern/replace/[g] 替换


### 添加/删除行注释

* Ctrl+V 列选定，选定要注释的行，
* Shift + i，然后输入对应语言的注释字符，
* 按Esc就把选定行注释好
* 如果要删除列选定后按x即可



## 常用插件

### NERDTree

[NERDTree](http://www.vim.org/scripts/script.php?script_id=1658) 是一个相当不错的文件浏览器，
集成在vim中后可以让vim像一个IDE一样方便的在各个文件中跳转。如下图所示：

![NERDTree](http://qiangrw.github.io/images/nerdtree.png "NERD TREE")


### zen-coding (as a web developer)

[zen-coding](http://www.vim.org/scripts/script.php?script_id=2981) 给我们提供了快速编写HTML/CSS的方式，
你可以只写一个简单的规则如：
html>head+body>h1+div#content+footer,
然后按下(Ctrl+y+,),你可以扩展所有标签.

当然zencoding还不止这些，为了熟悉zencoding，你可以先看一下一个简单的[视频演示](http://mattn.github.com/zencoding-vim/),
然后通过这篇[TUTORIAL](https://raw.github.com/mattn/zencoding-vim/master/TUTORIAL) 详细了解zencoding的各种操作。


 
### LaTeX-suite (as a LaTeXer)

[vim-latex-plugin](http://vim-latex.sourceforge.net/index.php) 是一个优秀的选择,
它提供了丰富的语法自动补全命令,甚至还提供了很多常用的TeX模板(内置了IEEtran, article, report, report_two_column，
当然你也可以把你的模板加入其中)。


## 利用pathogen.vim轻松管理vim插件
使用pathogen.vim可以方便的管理vim插件，首先按照[vim-pathogen](https://github.com/tpope/vim-pathogen)
README 安装好pathogen.vim, 建立好bundle文件夹后，想要什么插件，直接复制到该文件夹即可。

### 快速通道
* [VIM-PATHOGEN](https://github.com/tpope/vim-pathogen)
* [NERDTree](https://github.com/scrooloose/nerdtree)
* [ZenCoding](https://github.com/mattn/zencoding-vim)

### QUICK CMD
* mkdir -p ~/.vim/autoload ~/.vim/bundle
* curl -Sso ~/.vim/autoload/pathogen.vim https://raw.github.com/tpope/vim-pathogen/master/autoload/pathogen.vim
* change .vimrc file,  add to line1:  execute pathogen#infect()
* cd ~/.vim/bundle
* git clone https://github.com/scrooloose/nerdtree.git
* git clone git clone git://github.com/tpope/vim-sensible.git
* git clone https://github.com/mattn/emmet-vim.git

