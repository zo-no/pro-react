"use strict";

const fs = require("fs");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const paths = require("./paths");
const getHttpsConfig = require("./getHttpsConfig");

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true";
  return {
    // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
    // websites from potentially accessing local content through DNS rebinding:
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // However, it made several existing use cases such as development in cloud
    // environment or subdomains in development significantly more complicated:
    // https://github.com/facebook/create-react-app/issues/2271
    // https://github.com/facebook/create-react-app/issues/2233
    // While we're investigating better solutions, for now we will take a
    // compromise. Since our WDS configuration only serves files in the `public`
    // folder we won't consider accessing them a vulnerability. However, if you
    // use the `proxy` feature, it gets more dangerous because it can expose
    // remote code execution vulnerabilities in backends like Django and Rails.
    // So we will disable the host check normally, but enable it if you have
    // specified the `proxy` setting. Finally, we let you override it if you
    // really know what you're doing with a special environment variable.
    // Note: ["localhost", ".localhost"] will support subdomains - but we might
    // want to allow setting the allowedHosts manually for more complex setups
    allowedHosts: disableFirewall ? "all" : [allowedHost],
    headers: {
      // 允许跨域
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    // Enable gzip compression of generated files.
    compress: true,
    static: {
      // By default WebpackDevServer serves physical files from current directory
      //默认情况下，webpackdevserver从当前目录提供物理文件
      // in addition to all the virtual build products that it serves from memory.
      //除了它从内存中提供的所有虚拟构建产品。
      // This is confusing because those files won’t automatically be available in
      //这很困惑，因为这些文件不会自动可用
      // production build folder unless we copy them. However, copying the whole
      //生产构建文件夹，除非我们复制它们。但是，复制整个
      // project directory is dangerous because we may expose sensitive files.
      //项目目录是危险的，因为我们可能会暴露敏感文件。
      // Instead, we establish a convention that only files in `public` directory
      //相反，我们建立了仅在“公共”目录中提交的约定
      // get served. Our build script will copy `public` into the `build` folder.
      //得到服务。我们的构建脚本将“ public”复制到``build''文件夹中。
      // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
      //在“ index.html”中，您可以在public_url％的public public文件夹中获取URL：
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
      //在JavaScript代码中，您可以使用`process.env.public_url`访问它。
      // Note that we only recommend to use `public` folder as an escape hatch
      //请注意，我们仅建议将“公共”文件夹用作逃生舱口
      // for files like `favicon.ico`, `manifest.json`, and libraries that are
      //对于``favicon.ico`，'subtest.json'的文件''和库的文件
      // for some reason broken when imported through webpack. If you just want to
      //由于某种原因通过WebPack导入时破裂。如果你只想
      // use an image, put it in `src` and `import` it from JavaScript instead.
      //在`src'中使用图像，而不是从JavaScript中进行`import'。
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      // By default files from `contentBase` will not trigger a page reload.
      //默认情况下，来自“ contentBase”的文件不会触发页面重新加载。
      watch: {
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        // src/node_modules is not ignored to support absolute imports
        // https://github.com/facebook/create-react-app/issues/1065
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      webSocketURL: {
        // Enable custom sockjs pathname for websocket connection to hot reloading server.
        // Enable custom sockjs hostname, pathname and port for websocket connection
        // to hot reloading server.
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      // It is important to tell WebpackDevServer to use the same "publicPath" path as
      // we specified in the webpack config. When homepage is '.', default to serving
      // from the root.
      // remove last slash so user can land on `/test` instead of `/test/`
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },

    https: getHttpsConfig(),
    host,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
    //“代理”在“之前”和“之后”之间运行`webpack-dev-server`钩子
    proxy,
    onBeforeSetupMiddleware(devServer) {
      // Keep `evalSourceMapMiddleware`
      // 保持`evalSourceMapMiddleware`
      // middlewares before `redirectServedPath` otherwise will not have any effect
      //在`redirectServedPath`之前，中间件将不会有任何效果
      // This lets us fetch source contents from webpack for the error overlay
      //这使我们可以从webpack获取错误覆盖的源内容
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        // 这将为代理原因注册用户提供的中间件
        require(paths.proxySetup)(devServer.app);
      }
    },
    onAfterSetupMiddleware(devServer) {
      // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};
