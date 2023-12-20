/**
 * @Date        2023/12/20 16:02:06
 * @Author      zono
 * @Description
 * */
import { useContext } from "react";
import { TodoLevel } from "./todoContext";
/**
 * 标签
 * 我可以把标签继续封装
 * @param {type}
 * @returns
 * */
export default function Tag({ did, className }) {
  const level = useContext(TodoLevel);
  console.log(level);
  switch (level) {
    case "1":
      return (
        <span className={`bg-red-600  ${className}`}>
          {did ? "ok" : "no"}紧急
        </span>
      );
    case "2":
      return (
        <span className={`bg-blue-600 ${className}`}>
          {did ? "ok" : "no"}还好
        </span>
      );
    case "3":
      return (
        <span className={`bg-green-600 ${className} `}>
          {did ? "ok" : "no"}不急
        </span>
      );
    default:
      return <span className="bg-yellow-600 ">{did ? "ok" : "no"}</span>;
  }
}
