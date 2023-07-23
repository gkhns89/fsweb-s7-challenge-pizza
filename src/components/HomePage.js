import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./reset.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="ty-logo">
        <img src="/logo.svg" alt="Teknolojik Yemekler logo" />
      </div>
      <br />
      <p>
        KOD ACIKTIRIR <br />
        PIZZA, DOYURUR
      </p>
      <br />

      <Link to="/orderform">
        <Button data-cy="aciktim-button" id="order-pizza">
          ACIKTIM{" "}
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
