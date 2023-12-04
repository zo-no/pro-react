import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import { createElement, render } from './myJSXhandle';

const root = ReactDOM.createRoot(document.getElementById("root"));

let styObj = {
    color: 'red',
    fontSize: '16px'
};
let x = 10;
let y = 20;

//把react.createElement方法改成自己的方法
//把react.Fragment改为直接填写
//可以见到react已经没有被调用了
let jsxObj = createElement(
    //   React.Fragment,
    "div",
  null,
  createElement(
      "h2",
    {className: "title",
     style: styObj,},
    "zono"
  ),
  createElement(
    "div",
    {className: "box",},
    "牛",
    createElement("span", null, x),
    createElement("span", null, y)
  )
);

root.render(jsxObj, document.getElementById('root'));

