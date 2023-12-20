import React from "react";
import Todolist from "./componets/Todolist";
import CatFriends from "./componets/refDom";

export default function App() {
  return (
    <div className="h-screen w-screen bg-lime-600 p-2 ">
      <Todolist
        title="todolist1"
        list={[{ id: 1, text: "空列表", level: "3" }]}
      />
      <CatFriends></CatFriends>
    </div>
  );
}
