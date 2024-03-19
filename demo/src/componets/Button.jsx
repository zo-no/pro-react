/**
 * @Date        2023/12/18 13:57:19
 * @Author      zono
 * @Description button库
 * */
import { forwardRef, useImperativeHandle, useRef } from "react";
//按钮居中
export default function Button(porps) {
  const { name, onClick, children } = porps;
  return (
    <button
      onClick={onClick}
      className=" m-1 my-3  rounded-md  bg-stone-200 p-1 text-black hover:bg-neutral-600 hover:text-slate-400"
    >
      {children}
      {name}
    </button>
  );
}

export const Button1 = forwardRef((porps, ref) => {
  const { name, onClick, children } = porps;
  const realRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      color() {
        realRef.current.className =
          "m-10 <my-30></my-30>  rounded-md  bg-stone-200 p-1 text-black hover:bg-neutral-600 hover:text-slate-400";
      },
      color1() {
        realRef.current.className =
          "m-1 my-3  rounded-md  bg-stone-100 p-1 text-black ";
      },
    };
  });
  return (
    <button
      onClick={onClick}
      ref={realRef}
      // className=" m-1 my-3  rounded-md  bg-stone-200 p-1 text-black hover:bg-neutral-600 hover:text-slate-400"
    >
      {children}
      {name}
    </button>
  );
});
