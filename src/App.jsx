import React from "react";
import Todolist from "./componets/Todolist";


export default function App() {
  return (
    
      <div className="bg-lime-600 ">
        <Todolist
          title="todolist1"
          list={[{ id: 1, text: "空列表", level: "3" }]}
        />
      </div>
  );
}
