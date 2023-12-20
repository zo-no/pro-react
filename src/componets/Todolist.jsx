/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * 完成删除按钮
 * */
import React, { useState, useReducer, useContext } from "react";
import Button from "./Button";
import { TodoLevel, MyReducer } from "./todoContext";
import Tag from "./Tag";

let nextId = 1; // 用于生成id,后面又uuid升级
/**
 * 单个list
 * @param {type}
 * @returns
 * */
function List(props) {
  const { text, listID } = props;
  const [did, setDone] = useState(false);
  function onClick() {
    setDone(!did);
  }
  return (
    <li
      onClick={onClick}
      className={`text-base 
      ${did ? "bg-yellow-300" : " hover:bg-yellow-200"}
         m-10 rounded-md p-1`}
    >
      <Tag did={did} className={" m-3 rounded-lg p-1 text-white"}></Tag>
      {listID}-{text}
      <Button name="完成"></Button>
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
  const { list, title } = props;
  const [name, setName] = useState("zono");
  const [lists, dispatch] = useReducer(MyReducer, list);
  const [level, setLevel] = useState(3);

  function addNewList() {
    console.log(level);
    dispatch({
      type: "add",
      payload: { id: nextId++, text: name, level: level },
    });
  }

  function deleteList() {
    nextId--;
    dispatch({
      type: "delete",
    });
  }

  return (
    <div className={` m-4 rounded-md  bg-green-500 text-center`}>
      <h1 className="m-2 p-8 text-lg text-orange-500 first-letter:end-96">
        {title}
      </h1>
      <div className="mx-10 flex">
        <input
          onChange={(e) => {
            setLevel(e.target.value);
          }}
          className="flex-3 m-2 rounded-md text-center"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="m-2 flex-1 rounded-md text-center"
        />
      </div>
      <TodoLevel.Provider value={level}>
        <ul>
          {lists.map(({ id, text }) => {
            return (
              // <TodoLevel.Provider value={level}>
              <List key={id} listID={id} text={text}></List>
              // </TodoLevel.Provider>
            );
          })}
        </ul>
      </TodoLevel.Provider>
      <Button name="提交" onClick={addNewList}></Button>
      <Button name="删除最新一个" onClick={deleteList}></Button>
    </div>
  );
}
