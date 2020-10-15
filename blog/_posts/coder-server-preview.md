# 在code-server中集成预览插件

## code-server在非docker中运行
在[vscode插件官网]([https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview](https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview)
)找到browser preview插件。在右侧边栏找到`Download Extension`下载visx版本的插件。然后在插件窗口的菜单处点击从vsix安装安装对应文件即可。
> 注意：如果要使用这种方法，宿主机必须已经安装有可执行的chrome或chromium浏览器。

## code-server运行在docker内

- 在docker内安装chrome运行所必须的依赖库（以ubuntu或debian为例）：

```bash
apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
  libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
  libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
  libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 \
  libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
  libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev
```

- 更改插件
移除`puppeteer-core`依赖，改为`puppeteer`。
克隆插件源码，更改ext-src/browser.ts，注释下方代码：
```ts
  if (!chromePath) {
       this.telemetry.sendEvent('error', {
         type: 'chromeNotFound'
       });

       throw new Error(
         `No Chrome installation found, or no Chrome executable set in the settings - used path ${chromePath}`
       );
    }
```

更改puppeteer的引入方式：
```ts
// const puppeteer = require('puppeteer-core'); // 删除
const puppeteer = require('puppeteer'); // 改为
```

最后使用vsce重新打包插件，在code-server内导入即可。

> 更改puppeteer的引入方式是因为要让puppeteer自动下载一个浏览器，而不必依赖 宿主机的浏览器。
