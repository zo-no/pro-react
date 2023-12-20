/**
 * @Date        2023/12/20 20:07:54
 * @Author      zono
 * @Description 单个list
 * */
import React, { useState, useContext } from "react";
import Button from "./Button";
import Tag from "./Tag";
import { SetList } from "./todoContext";
/**
 * 单个list
 * @param {type}
 * @returns
 * */
export default function List({ text, listID, level }) {
  const [did, setDone] = useState(false);
  const dispatch = useContext(SetList);
  function onClick() {
    setDone(!did);
  }
  console.log(`list ${listID} render}`);
  return (
    <li
      onClick={onClick}
      className={`text-base 
      ${did ? "bg-yellow-300" : " hover:bg-yellow-200"}
         m-10 rounded-md p-1`}
    >
      <Tag
        did={did}
        className={" m-3 rounded-lg p-1 text-white"}
        level={level}
      ></Tag>
      {listID}-{text}
      <Button
        name="修改"
        onClick={() => {
          dispatch({
            type: "updateById",
            payload: { id: listID, text: "123" },
          });
        }}
      ></Button>
      <Button
        name="删除"
        onClick={() => {
          dispatch({ type: "deleteById", payload: { id: listID } });
        }}
      ></Button>
    </li>
  );
}
