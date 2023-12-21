import React, { StrictMode } from "react";
import Todolist from "./componets/Todolist";

export default function App() {
  return (
    <div className="h-screen w-screen bg-lime-600 p-2 ">
      {/* <StrictMode> */}
      <Todolist title="todolist1" />
      {/* </StrictMode> */}
    </div>
  );
}
