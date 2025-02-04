﻿# node-iot 我的与联网iot实验项目
 项目使用esp8266或者esp32硬件平台连接阿里iot，
 网站使用连接阿里iot平台，订阅关注的topic，采用图表方式显示。
 
 建立项目过程步骤如下：

1. **安装 Node.js**：
   - 访问 [Node.js 官网](https://nodejs.org/)，下载并安装适合你操作系统的版本，阿里iot要求node版本打印6.0。

2. **创建项目目录**：
   - 在你的工作空间中创建一个目录node-iot，用于存放网站项目。

3. **初始化 Node.js 项目**：
   - 打开命令行工具，导航到你的node-iot目录，然后运行 `npm init`。
   - 按照提示填写项目信息，这将创建一个 `package.json` 文件，用于管理项目的依赖。

4. **安装 Web 框架**：
   - Node.js 有许多 Web 框架可供选择，如 Express、Koa、Hapi 等。以 Express 为例，运行 `npm install express` 来安装。
   - 本项目选择express框架
   - 使用npm命令安装express
       - npm install express 

5. **创建服务器文件**：
   - 在项目目录中创建一个 `app.js` 
   - 编写代码来设置 Web 服务器。例如，使用 Express 的基本设置：
     ```javascript
     const express = require('express');
     const app = express();
     const port = process.env.PORT || 3000;

     app.get('/', (req, res) => {
       res.send('Hello World!');
     });

     app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
     });
     ```

6. **创建路由和视图**：
   - 定义路由来响应不同的 URL 请求。
   - 使用模板引擎 EJS来渲染 HTML 页面。
   - 安装ejs： npm install ejs

7. **添加静态文件服务**：
   - 使用中间件来提供静态文件服务，如 CSS、JavaScript 和图片等。

8. **编写业务逻辑**：
   - 根据需要编写业务逻辑代码，处理数据库交互、用户输入等。

9. **测试**：
   - 在本地运行你的网站，确保一切按预期工作。使用 `node app.js` 启动服务器。

10. **部署**：
    - 当你的网站在本地测试无误后，你可以选择将其部署到云服务器或共享主机上。

11. **版本控制**：
    - 使用 Git 进行版本控制，并将代码推送到 GitHub 或其他代码托管服务。

12. **环境配置**：
    - 使用 `.env` 文件和 `dotenv` 包来管理不同环境下的配置。

13. **安全性**：
    - 确保你的网站遵循最佳安全实践，如使用 HTTPS、设置合适的 HTTP 头部等。

14. **性能优化**：
    - 使用缓存、压缩、CDN 等技术来提高网站性能。

15. **监控和日志**：
    - 设置监控和日志记录，以便跟踪网站的性能和问题。

以下是一个简单的 Express 应用示例，它创建了一个基本的 Web 服务器：

```javascript
// 引入 Express 模块
const express = require('express');
const path = require('path');

// 创建 Express 应用
const app = express();

// 设置静态文件目录
app.use(express.static('public'));

// 设置模板引擎（如果使用）
app.set('view engine', 'ejs');

// 定义路由
app.get('/', (req, res) => {
  res.render('index'); // 渲染 index.ejs
});

// 设置监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

在这个例子中，你需要创建一个 `views` 文件夹，里面包含一个 `index.ejs` 文件，作为你的首页模板。同时，创建一个 `public` 文件夹来存放静态文件。

这只是建立网站的一个起点，根据你的具体需求，可能还需要添加更多的功能和优化。

 
