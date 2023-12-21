/**
 * @Date        2023/12/18 14:44:07
 * @Author      zono
 * @Description todo list
 * 完成删除按钮
 * */
import React, { useState, useReducer, useRef, useEffect } from "react";
import Button from "./Button";
import { SetList, SetListState, MyReducer } from "./todoContext";
import { List } from "./list";
import { flushSync } from "react-dom";

/**
 * todo list
 * @param {type}
 * @returns
 * 记得加key，key不会被传入List中
 * */
export default function TodoList(props) {
  const list = [{ id: 1, text: "空列表", level: "3" }];
  const { title } = props;
  const [lists, dispatch] = useReducer(MyReducer, list);
  const [name, setName] = useState("zono");
  const [level, setLevel] = useState("3");

  const itemsRef = useRef(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  function scrollToId(id) {
    const map = getMap();
    for (let value of map) {
      console.log(value);
    }
    const node = map.get(id);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
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
            <Button
              name="提交"
              onClick={() => {
                flushSync(() => {
                  dispatch({
                    type: "add",
                    payload: { name: name, level: level },
                  });
                });
                scrollToId(lists.length);
              }}
            ></Button>
          </div>

          <ul>
            {lists.map(({ id, text, level }) => {
              return (
                <List
                  key={id}
                  listID={id}
                  text={text}
                  level={level}
                  ref={(node) => {
                    const map = getMap();
                    if (node) {
                      map.set(id, node);
                    } else {
                      map.delete(id);
                    }
                  }}
                ></List>
              );
            })}
          </ul>
          <Button
            name="删除最新一个"
            onClick={() => {
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
