import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";

const props = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

const defaultProps = {
  visible: false,
  onClose: () => {},
};

const Modal = ({ visible, onClose, children, ...props }) => {
  return (
    <Fragment>
      <div
        onClick={onClose}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: visible ? "flex" : "none",
          flexDirection: "column",
          backgroundColor: "#00000080",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            minWidth: "30%",
            backgroundColor: "#ffff",
          }}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
};

Modal.props = props;

Modal.defaultProps = defaultProps;

export default memo(Modal);
