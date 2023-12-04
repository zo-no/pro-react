/*
@Date		:2023/12/04 15:56:37
@Author		:zono
@Description:一个简单的JSX处理器
*/

/*createElement函数:用于构建虚拟DOM
----------------------------------------
1.参考react的createElement函数：
React.createElement(ele,props,...children)
- ele：元素标签名\组件名
- props：元素的属性集合(对象)（无属性，则此值为null）
- children：当前元素的子节点，第三个及以后的参数都是
- 返回虚拟DOM，可以看下文虚拟DOM结构
----------------------------------------
2. 参考react输出的虚拟DOM： 
virtualDOM = {
    $$typeof: Symbol(react.element), //react元素的标识
    ref: null,
    key: null,
    type: 标签名「或组件」, //h1、h2...
    // 存储了元素的相关属性 && 子节点信息
    props: {
        ..., // 元素的相关属性,如：className、style,
        children // 子节点信息（没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组）
    }//必定存在，至少是个空对象
  }
----------------------------------------
*/
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol.for("react.element"),
    ref: null,
    key: null,
    type: null,
    props: {},
  };
  let len = children.length;

  // 1.处理type
  virtualDOM.type = ele;

  // 2.处理props
  if (props) {
    virtualDOM.props = {
      ...props,
      children,
    };
  }

  // 3.处理children
  if (len === 1) virtualDOM.props.children = children[0];
  else if (len > 1) virtualDOM.props.children = children;
  else virtualDOM.props.children = null;

  return virtualDOM;
}
