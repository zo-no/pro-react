/**
 * @Date        2023/12/18 13:57:19
 * @Author      zono
 * @Description button库
 * */
export default function Button(porps) {
  const { name, onClick, children } = porps;
  // console.log(porps);
  return (
    <button type="submit" onClick={onClick}>
      {children}
      {name}
    </button>
  );
}
