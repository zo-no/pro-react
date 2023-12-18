/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * props就是一个对象，可以用对象的所有方法
 * 事件是冒泡的，所以可以在父组件中监听事件
 * jsx 写法很灵活，但减少重复标签使用，会简洁许多
 * state的更新是异步的，所以不能在同一个函数中连续更新state
 * state只能在函数中使用，不能在函数外使用，可以用reducer解决，或者用redux
 * redux是全局状态管理，reducer是局部状态管理
 * */
import React, { useState, useReducer } from "react";
import Button from "./Button";
import "./TodoList.css";
let nextId = 1; // 用于生成id,后面又uuid升级
/**
 * 单个list
 * @param {type}
 * @returns
 * */
function List(props) {
  const { text, done, listID } = props;
  const [did, setDone] = useState(done);
  function onClick() {
    setDone(!did);
  }

  return (
    <li
      style={did ? { textDecoration: "line-through", color: "blue" } : null}
      onClick={onClick}
    >
      {listID}-{text}
    </li>
  );
}

/**
 * todo list
 * @param {type}
 * @returns
 * 记得加key，key不会被传入List中
 * */
export default function TodoList(props) {
  const { list, color, title } = props;
  const [name, setName] = useState("zono");
  const [lists, dispatch] = useReducer(MyReducer, list);

  function addNewList() {
    dispatch({
      type: "add",
      payload: { id: nextId++, text: name, done: false },
    });
  }

  function deleteList() {
    dispatch({
      type: "delete",
    });
  }

  const renderList = lists.map(({ id, text, done }) => {
    return <List key={id} listID={id} text={text} done={done}></List>;
  });

  return (
    <div className="todo">
      <h1 style={{ color }}>{title}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <ul>{renderList}</ul>
      <Button name="提交" onClick={addNewList}></Button>
      <Button name="删除" onClick={deleteList}></Button>
    </div>
  );
}

function MyReducer(tasks, action) {
  // console.log(tasks);
  // console.log(action);
  switch (action.type) {
    case "add":
      console.log(tasks.length);
      if (tasks[0].text === "空列表") {
        tasks.shift();
        return [action.payload];
      } else {
        return [...tasks, action.payload];
      }
    case "delete": {
      console.log(tasks.length);
      if (tasks.length === 1) {
        // tasks.slice(0, -1);
        console.log(tasks);
        //push会改变原数组,导致tasks变成空数组，所以用concat
        nextId = 1;
        return [{ id: 1, text: "空列表", done: false }];
      } else {
        nextId--;
        return tasks.slice(0, -1);
      }
    }
    default:
      return tasks;
  }
}
