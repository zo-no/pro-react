/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * */

import React, { useState, useReducer } from "react";
import Button from "./Button";

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
  console.log(`子组件 ${listID}被渲染了`);
  return (
    <li
      // style={did ? { textDecoration: "line-through", color: "blue" } : null}
      onClick={onClick}
      className={`text-base ${
        did ? "text-blue-500" : "text-black"
        } bg-slate-600`}
    >
      {listID}-{text}
      <Button name="修改"></Button>
      <Button name="删除"></Button>
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
    <div className>
      <h1 style={{ color }} className="first-letter:end-96">
        {title}
      </h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <ul>{renderList}</ul>
      <Button name="提交" onClick={addNewList}></Button>
      <Button name="删除最新一个" onClick={deleteList}></Button>
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
