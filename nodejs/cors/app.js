const express = require("express");
const timeout = require("connect-timeout");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const cors = require("cors");

// 目标地址
const ProxyHost = "http://39.99.187.234/zhwl/appapi";
// 服务端口
const Port = 8001;

app.set("port", Port);

app.use(cors());
app.use(timeout(30 * 1e3));
app.use((req, res, next) => {
  !req.timeout && next();
});

/**
 * 反向代理（这里把需要进行反代的路径配置到这里即可）
 * eg:将/api 代理到 ${HOST}/api
 * app.use(createProxyMiddleware('/api', { target: HOST }));
 * 自定义代理规则
 */
app.use(
  createProxyMiddleware("/api", {
    // target host
    target: ProxyHost,
    // needed for virtual hosted sites
    changeOrigin: true,
    // proxy websockets
    ws: true,
    // rewrite path
    pathRewrite: { "^/api": "" },
  })
);

// 监听端口
app.listen(app.get("port"), () => console.log(`server running ${Port}`));
