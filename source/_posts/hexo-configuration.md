---
title: Hexo Configuration
date: 2019-10-12 11:23:08
tags: Hexo
catalog: true
---
在使用Hexo搭建个人网站时遇到的一些配置问题，经查阅参考网络资料，验证解决后整理记录下来，留作备忘，供大家参考。

### 1.修改文章链接

我发布的文章链接太长，能不能修改呢？可以。

Hexo默认是以“你的站点名+年/月/日+文章标题名”展示的，你可以通过修改根目录下的_config.yml配置文件来改变链接格式。找到permalink字段，它原本是这样的：

```bash
permalink: :year/:month/:day/:title/
```

如果你想以“你的站点名+文章标题”显示，你可以修改成这样。

```bash
permalink: :title/
```

（参考来源：[cnblogs](https://www.cnblogs.com/php-linux/p/8493181.html)）

### 2.提交搜索引擎收录

这里以Google为例，注册登录[Google Search Console](https://search.google.com/search-console?utm_source%3Dabout-page)

##### 2.1 添加资源

![添加资源](/image/GoogleSearchConsole1.png)


这里有两种资源类型：网域和网址前缀。因网域需要验证DNS,所以我这里是以网址前缀方式添加的网址，这里大家根据自己情况自行添加。

##### 2.2 进行验证

验证的目的是证明你的身份，相当于对其授权，然后才可进行收录。

目前Google提供5种验证方式，可以使用其中一种验证，也可以使用多种方式联合验证，官方推荐多种验证。

这五种验证方式是：

- HTML文件
- HTML标记
- Google Analytics(分析)
- Google Tag Manager
- 域名提供商

其中HTML文件验证是Google帮你的站点生成一个html文件，你需要下载这个文件，不要做任何修改，并把其上传到你的站点根目录下。(你可以把其放在source文件夹下，并在_config.yml中的skip_render字段中配置白名单，避免Hexo对其渲染)

```bash
skip_render: 
            - 'README.md'
            - '404.html'
            - 'google-xxxxxx.html'
```

HTML标记验证法则是Google生成标记代码，你把它放到你网站``<head></head>``标签内就好了,其格式如下：

```bash
<head>
<meta name="google-site-verification" content="5aej_kTWDvPgwTNmtrfBDpip0z8t-ARz8Gzw">
</head>
```

我在这里是采用了HTML文件和HTML标记两种方式验证的，上传或者添加好代码之后，点击验证，如果你没配置错误的话，这时候应该很快显示验证通过了。是不是想要立马到搜索引擎上搜索一下自己的网站呢，不过别着急，一般是需要24小时的时间才可以查看数据的，所以耐心等待吧！

### 3.站点地图

站点地图是一个网站所有链接的容器。随着网站规模越大层次越深，搜索引擎很难抓取网站数据，通过站点地图则可以很好的给搜索引擎指明方向，更好的收录我们的页面。

##### 3.1 安装插件

打开站点根目录，打开命令行，分别执行下面代码安装Google和百度的站点地图插件

```bash
$ npm install hexo-generator-sitemap --save 		//Gooogle
$ npm install hexo-generator-baidu-sitemap --save	//百度
```

##### 3.2 添加配置

在根目录_config.yml中添加站点地图的配置

```bash
Plugins:
- hexo-generator-baidu-sitemap
- hexo-generator-sitemap

baidusitemap:
    path: baidusitemap.xml
sitemap:
    path: sitemap.xml
```

配置好了，重新部署一下我们就可以看到public目录下生成了baidusitemap.xml和sitemap.xml。这时候重新发布就可以了。如果没有看到生成站点地图，还请排查一下问题吧。

##### 3.3 上传搜索引擎

打开Google Search Console控制台，找到站点地图，确保你的站点地图能访问到。把相应的网址提交到你的控制台上就可以了。
