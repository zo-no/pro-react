/**
 * @Date        2023/12/18 13:48:30
 * @Author      zono
 * @Description 第一个组件尝试
 * */
import React from "react";
// import ReactDOM from 'react-dom';// 16.8版本之前
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
// 编写第一个组件

// ReactDOM.render(<App />, document.getElementById('root'));// 16.8版本之前
// 为提供的创建一个 React 根container并返回根。
const root = createRoot(document.getElementById("root"));
// 根可用于将 React 元素渲染到 DOM 中
root.render(<App />);
