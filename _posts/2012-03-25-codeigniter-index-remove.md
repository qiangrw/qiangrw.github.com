---
layout: post
title: 在CodeIgniter删除URL中的index.php
category: 技术
permalink: /2012/03/codeigniter-index-remove/
keywords: CodeIgniter, CI, index
---

## 环境:
* Ubuntu
* Apache2
* CI 2.1.0

## 步骤:
### 启用 Mod_rewrite 模块

在终端中输入如下指令：
{% highlight bash %}
	sudo a2enmod rewrite
{% endhighlight bash %}	
### 修改AllowOverride
{% highlight bash %}	
	sudo vim /etc/apache2/sites-enabled/000-default
{% endhighlight bash %}	
将第二个AllowOverride None 即Options Indexes FollowSymLinks MultiViews下面那个，修改为 AllowOverride All

### 重启Apache
{% highlight bash %}
	sudo /etc/init.d/apache2 restart.
{% endhighlight bash %}		
### 修改CI的BaseURL

即将application/config/config.php文件中的

{% highlight php %}
	$config['index_page'] = 'index.php';
{% endhighlight php %}		

修改为：

{% highlight php %}
	$config['index_page'] = '';
{% endhighlight php %}		
### 在根目录添加.htaccess文件

即在index.php所在的目录新建该文件，内容为：

{% highlight bash %}
RewriteEngine on
RewriteCond $1 !^(index\.php|images|scripts|css|lib|robots\.txt)
RewriteRule ^(.*)$ /subdir/index.php/$1 [L]
{% endhighlight bash %}	
	
第二行为规则的过滤，我们的index.php的同级目录下还有scripts文件夹和css等文件夹，这些需要过滤除去，以后添加其他文件夹时同样需要修改该文件。
第三行/subdir/index.php表示笔者代码放在了网站根目录里面subdir子文件夹中，如果直接放在根目录则只需要/index.php即可


