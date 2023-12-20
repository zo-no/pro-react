/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * 完成删除按钮
 * */
import React, { useState, useReducer } from "react";
import Button from "./Button";
import { SetList, SetListState, MyReducer } from "./todoContext";
import List from "./list";

let nextId = 1; // 用于生成id,后面又uuid升级

/**
 * todo list
 * @param {type}
 * @returns
 * 记得加key，key不会被传入List中
 * */
export default function TodoList(props) {
  const { list, title } = props;
  const [lists, dispatch] = useReducer(MyReducer, list);
  const [name, setName] = useState("zono");
  const [level, setLevel] = useState("3");

  return (
    <SetListState.Provider value={lists}>
      <SetList.Provider value={dispatch}>
        <div className={` m-4 rounded-md  bg-green-500 p-2 text-center`}>
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

          <ul>
            {lists.map(({ id, text, level }) => {
              return (
                <List key={id} listID={id} text={text} level={level}></List>
              );
            })}
          </ul>

          <Button
            name="提交"
            onClick={() => {
              dispatch({
                type: "add",
                payload: { id: nextId++, text: name, level: level },
              });
            }}
          ></Button>

          <Button
            name="删除最新一个"
            onClick={() => {
              nextId--;
              dispatch({
                type: "delete",
              });
            }}
          ></Button>
        </div>
      </SetList.Provider>
    </SetListState.Provider>
  );
}
