import React from "react";
import PropTypes from "prop-types";

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
Toggleable.displayName = "Toggleable";
Toggleable.propTypes = {
  defaultBody: PropTypes.string,
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string,
};
export default Toggleable;
