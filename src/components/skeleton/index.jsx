import React from "react";

const Skeleton = ({ type }) => {

  return (
    <div className="top-bottom">
      <div
        className={`skeleton-wrapper ${type ? type : ""}`}
      >
        <div className="skeleton">
          <div className="skeleton-indicator" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;