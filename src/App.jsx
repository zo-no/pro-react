import React from "react";
import Todolist from "./componets/Todolist";

export default function App() {
  return (
    <>
      <Todolist
        title="todolist1"
        list={[{ id: 1, text: "空列表", done: false }]}
      />
    </>
  );
}
