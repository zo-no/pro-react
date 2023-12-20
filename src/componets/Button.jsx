/**
 * @Date        2023/12/18 13:57:19
 * @Author      zono
 * @Description button库
 * */

//按钮居中

export default function Button(porps) {
  const { name, onClick, children } = porps;
  // console.log(porps);
  return (
    <button
      type="submit"
      onClick={onClick}
      className=" m-1 my-3  rounded-md  bg-stone-200 p-1 text-black hover:bg-neutral-600 hover:text-slate-400"
    >
      {children}
      {name}
    </button>
  );
}
