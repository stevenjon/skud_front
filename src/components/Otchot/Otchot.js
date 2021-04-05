
import React, { Fragment } from "react";
import Content from './Content'
const Main_area = () => {
  const removeUser = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("vil_id");
    window.location.reload();
  };
  return (
    <Fragment>
      <div>
        <div className="navbar">
          <div className="navbar_brand">
            <h2 style={{ margin: "0" }}>
              <span
                style={{ verticalAlign: "middle", color: "white" }}
                className="sektor_text"
              >
                Ходимлар мехнат интизоми
              </span>
            </h2>
          </div>
          <div className="navbar_items">
            <ul style={{ display: "flex", alignItems: "center" }}>
              <li style={{ marginLeft: "5px" }}>
                {" "}
                <i
                  onClick={removeUser}
                  className="fas fa-sign-out-alt icon_chiq"
                ></i>
              </li>
            </ul>
          </div>
        </div>
        <Content></Content>
      </div>
    </Fragment>
  );
};

export default Main_area;
