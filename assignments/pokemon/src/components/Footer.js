import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-logo">
          <img src="./img/footer-icon.png" />
          <p>
            ©2022 Pokémon. <br />
            ©1995 - 2022 Nintendo/Creatures Inc./GAME FREAK inc. TM, <br />
            ®Nintendo.
          </p>
        </div>
        <ul className="footer-list">
          <li>Layanan</li>
          <li>Hubungi Kami</li>
          <li>Bantuan</li>
        </ul>
      </div>
    );
  }
}

export default Footer;
