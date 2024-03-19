//Quer:为什么配置后出问题了？
// 这个配置问题待解决ing
const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/jian", {
      target: "https://www.jianshu.com/asimov/",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/jian": "",
      },
    })
  );
};
