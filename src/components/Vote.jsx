/* 
基于
*/
import React from "react";
import PropTypes from 'prop-types';

/*
基于extends继承。
1、首先通过call继承React.Component(this)//this指向当前实例
*/

class Vote extends React.Component {
  xxx = 100;
  static defaultProps = {
    title: "默认标题",
  };
  getx() {
    console.log(this.xxx);
  }
  giveX = () => { 
    console.log(this);
  }

  render() {
    return 
   }
}
let B = new Vote(10, 20, 30);
console.log(B.giveX);
export default Vote;


/*
 函数组件是“静态组件”：
   + 组件第一次渲染完毕后，无法基于“内部的某些操作”让组件更新「无法实现“自更新”」；但是，如果调用它的父组件更新了，那么相关的子组件也一定会更新「可能传递最新的属性值进来」；
   + 函数组件具备：属性...「其他状态等内容几乎没有」
   + 优势：比类组件处理的机制简单，这样导致函数组件渲染速度更快！！
 类组件是“动态组件”：
   + 组件在第一渲染完毕后，除了父组件更新可以触发其更新外，我们还可以通过：this.setState修改状态 或者 this.forceUpdate 等方式，让组件实现“自更新”！！
   + 类组件具备：属性、状态、周期函数、ref...「几乎组件应该有的东西它都具备」
   + 优势：功能强大！！

 ===>Hooks组件「推荐」：具备了函数组件和类组件的各自优势，在函数组件的基础上，基于hooks函数，让函数组件也可以拥有状态、周期函数等，让函数组件也可以实现自更新「动态化」！！
 */

