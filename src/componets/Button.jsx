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
      className="m-2 rounded-md bg-yellow-100 p-3 shadow-md hover:bg-yellow-200"
    >
      {children}
      {name}
    </button>
  );
}
