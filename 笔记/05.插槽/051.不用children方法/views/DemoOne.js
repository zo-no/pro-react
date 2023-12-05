import PropTypes from "prop-types";
// import React from "react";
const DemoOne = function DemoOne(props) {
  let { title, x, children } = props;
  if (!children) {
    children = [];
  } else if (!Array.isArray(children)) {
    children = [children];
  }
  return (
    <div className="demo-box">
      {children[0]}
      <br />

      <h2 className="title">{title}</h2>
      <span>{x}</span>

      <br />
      {children[1]}
    </div>
  );
};

/* 设置属性的校验规则 */
DemoOne.defaultProps = {
  x: 0,
};
DemoOne.propTypes = {
  title: PropTypes.string.isRequired,
  x: PropTypes.number,
};

export default DemoOne;
