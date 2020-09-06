import React from "react";
import {useLocation} from "react-router-dom";

const NotFound = () => {
  let location = useLocation();
  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <h1 style={{fontSize:"3em"}}>
          Page <code>{location.pathname}</code> not found...
        </h1>
      </div>
    </div>
  );
};

export default NotFound;





