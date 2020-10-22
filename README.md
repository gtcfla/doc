## 序

为解决工作和生活中的重复，减少时间和风险成本，一个透明化知识库和问答系统。

```「忢问」的愿景
忢：古义词，通悟。

忢拆开就是五和心。

照五蕴皆空，用心，度一切苦厄。

谐音同勿[wù]，即勿问，希望每个人都可通过自悟得到答案，因为经过自己思考的答案才是你的。

当遇到问题时，可以先问问自己：这个问题自己是否遇到过？是否有尝试过自己解决？是否是一个好问题？我怎么能够把这个问题描述得清楚？

因为这是对自己和别人起码的尊重和礼貌，当你的发问很随意和模糊时，得到的回答也是随意和模糊的。

佛曰：众生皆我，我即众生。叔本华也说过：我即他人，人皆众生。
```

## 说明



```bash
这里可匿名发言，点评和发布文章，点赞等等功能。言论自由（内容会经天眼敏感词审核通过后才能发布），可怼天怼地怼空气。
```

## 应用场景

- `情景一` 例：在新入职的同事和已离职人员的工作交接过程中，没有明确的部门规章流程和工作内容，容易出现事故给公司带来不必要的损失等等问题。
- `情景二` 例：日常工作和生活中遇到的问题，没有统一和透明的平台反馈和总结，重复的事情和问题不停重复，陷入西西弗斯的诅咒。
- `情景三` 例：个人经验和好玩有趣的东西没有地方分享，在为世界创造快乐之前，应该自己先快乐起来，独乐乐不如众乐乐，而且群众的力量是无限的，智慧也是。

?> 希望每个人都可以在 `「忢问」` 这里找到乐趣和答案，当然也可以[建立自己专属的知识库](zh-cn/more-pages.md)。

## 功能介绍

通过运行 `docsify serve` 启动一个本地服务器，可以方便地实时预览效果。默认访问地址 http://localhost:3000 。

```bash
docsify serve docs
```

?> 更多命令行工具用法，参考 [docsify-cli 文档](https://github.com/docsifyjs/docsify-cli)。

## 手动初始化

如果不喜欢 npm 或者觉得安装工具太麻烦，我们可以直接手动创建一个 `index.html` 文件。

*index.html*

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      //...
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>
```

如果你的系统里安装了 Python 的话，也可以很容易地启动一个静态服务器去预览你的网站。

```bash
cd docs && python -m SimpleHTTPServer 3000
```

## Loading 提示

初始化时会显示 `Loading...` 内容，你可以自定义提示信息。


```html
  <!-- index.html -->
  
  <div id="app">加载中</div>
```

如果更改了 `el` 的配置，需要将该元素加上 `data-app` 属性。

```html
  <!-- index.html -->
  <div data-app id="main">加载中</div>

  <script>
    window.$docsify = {
      el: '#main'
    }
  </script>
```

对比 [el 设置](configuration.md#el)。