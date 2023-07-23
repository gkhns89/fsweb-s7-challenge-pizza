import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="iletisim">
          <h3>Teknolojik Yemekler</h3>
          <img src={require("../icons/icon-1.png")} alt="" />
          <p>341 Londonderry Road, İstanbul Türkiye</p>
          <img src={require("../icons/icon-2.png")} alt="" />
          <p>aciktim@teknolojikyemekler.com</p>
          <img src={require("../icons/icon-3.png")} alt="" />
          <p>+90 216 123 45 67</p>
        </div>
        <div className="menu">
          <h5>Sıccacık Menular</h5>
          <a href="/order-pizza">Terminal Pizza</a>
          <a href="/order-pizza">5 Kişilik Hackathlon Pizza </a>
          <a href="/order-pizza">useEffect Tavuklu Pizza </a>
          <a href="/order-pizza">Beyaz Console Frosty</a>
          <a href="/order-pizza">Testler Geçti Mutlu Burger </a>
          <a href="/order-pizza">Position Absolute Burger</a>
        </div>
        <div className="instagram">
          <h5>Instagram</h5>
          <img src={require("../insta/li-0.png")} alt="" />
          <img src={require("../insta/li-1.png")} alt="" />
          <img src={require("../insta/li-2.png")} alt="" />
          <img src={require("../insta/li-3.png")} alt="" />
          <img src={require("../insta/li-4.png")} alt="" />
          <img src={require("../insta/li-5.png")} alt="" />
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-icon">
          <p>© 2023 Teknolojik Yemekler. </p>
          <FontAwesomeIcon
            icon={faTwitter}
            style={{
              width: "5%",
              paddingTop: "2%",
              paddingBottom: "2%",
              marginLeft: "25%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
