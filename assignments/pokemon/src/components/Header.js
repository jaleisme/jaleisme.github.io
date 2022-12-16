import React from "react";
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <img className="img-logo" src="./img/pokeball.png" />
        </div>
        <div className="header-right">
          <a>Login</a>
        </div>
      </div>
    );
  }
}
export default Header;
