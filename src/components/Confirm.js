import React from "react";
import { useHistory } from "react-router-dom";

const ConfirmPage = () => {
  const divStil = {
    backgroundColor: "#CE2829",
    margin: "auto",
    width: "100vw",
    height: "100vh",
    paddingTop: "5%",
  };

  const headerStil = {
    margin: "auto",
    color: "white",
    textAlign: "center",
    paddingTop: "5%",
  };

  const h2Stil = {
    fontFamily: "Barlow, sans-serif",
    fontSize: "3.5rem",
    fontWeight: "normal",
    cursor: "pointer",
  };

  const history = useHistory();

  return (
    <div className="confirm" style={divStil}>
      <div style={headerStil}>
        <h2 style={h2Stil} onClick={() => history.goBack()}>
          TEBRİKLER!
        </h2>
        <h2 style={h2Stil}> SİPARİŞİNİZ ALINDI!</h2>
      </div>
    </div>
  );
};

export default ConfirmPage;
