---
layout: post
title: Ubuntu Server 安装和配置
permalink: /2011/12/install-ubuntu-server/
---

本文简要介绍了安装和配置服务器的简要流程，希望能给准备装服务器的同僚以帮助。

## 系统选择
考虑到RHEL是收费的，而自己对Ubuntu的接触相对来说比较多，而且其相关资料比较多，所以最终选择了Ubuntu Server 10.04LTS.

下载好ISO以后用U盘做了一个安装包，但是可惜的是安装失败了，后来烧了光盘才安装成功，事到如今还是未能理解为什么U盘就没能成功。

## 系统安装
用光盘启动后按照步骤一步步来安装就可以了，详细过程我就不赘述了，可以参考下面这个链接，里面有图文详解：

http://wiki.debian.org.hk/w/Install_Ubuntu_server

在选择软件包时可以根据自己的需求来用空格勾选，我选择了LAMP,OpenSSH和Samba。

## 由Grub2命令行进入系统
非常伤感的是当安装好系统以后没有出现那熟悉的Grub选择系统界面，而是直接进入了Grub2的命令行模式，和学长查了很多资料，采用如下命令进入了系统：
{% highlight bash %}
set root=(hd0,2);
linux  /boot/vmlinuz-xxx-xxx  root=/dev/sda2
initrd /boot/initrd.img-xxx-xxx
boot
{% endhighlight bash %}	


其中`(hd0,2)`是系统所在的硬盘分区号（可以用ls来查看所有的分区）， xxx什么的是系统版本，可用Tab键补全。root后面即硬盘设备号sdax(x=1,2,…,15)，相信在安装的时候选择安装到哪个盘的时候你会有所留意。

这不禁让我想起了大三时那蛋疼的Linux实验，貌似是自己修改一个调度算法然后重新编译内核，尝试了好多次都没能让系统正常启动，但最终还是成功了。

反正结果都是好的，贵在折腾~

