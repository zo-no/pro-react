/**
 * @Date        2023/12/20 16:37:50
 * @Author      zono
 * @Description 创建环境对象
 * 踩坑：
 * contextProvider不能直接修改context的值，需要通过state来修改
 * contextProvider的value值不能是对象，否则会导致子组件不更新
 * context钩子函数主要是为了解决多层嵌套组件传值的问题，
 * 其本身并不是为了解决状态管理的问题，它并不能存储状态，只能传递状态
 * */
import { createContext } from "react";

export const TodoLevel = createContext(1);

export function MyReducer(tasks, action) {
  // console.log(tasks);
  // console.log(action);
  switch (action.type) {
    case "add":
      if (tasks[0].text === "空列表") {
        tasks.shift();
        return [action.payload];
      } else {
        return [...tasks, action.payload];
      }
    case "delete": {
      if (tasks.length === 1) {
        //push会改变原数组,导致tasks变成空数组，所以用concat
        return [{ id: 1, text: "空列表", done: false, level: 3 }];
      } else {
        return tasks.slice(0, -1);
      }
    }
    default:
      return tasks;
  }
}
