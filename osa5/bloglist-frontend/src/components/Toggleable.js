import React from "react";

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(props.visibleDefault || false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggle = () => setVisible(!visible);

  React.useImperativeHandle(ref, () => {
    return { toggle };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        {props.defaultBody}
        <button onClick={toggle}>{props.showLabel || "Show"}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>{props.hideLabel || "Hide"}</button>
      </div>
    </>
  );
});

export default Toggleable;
