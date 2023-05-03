import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

window.simplex = window.simplexAsyncFunction;

const PaymentGateway = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://iframe.simplex-affiliates.com/form-sdk.js";

    document.body.appendChild(script);

    script.onload = () => {
      window.simplex.createForm();
    };
    script.onerror = () => {
      console.log("Could not load the Google API Script!");
    };
  }, []);

  return (
    <div className="wt-box min-h-full">
      <div id="simplex-wrapper">
        <form id="simplex-form">
          <div id="checkout-element"></div>
        </form>
      </div>
      <span
        className="mt-5 pointer buy-wrapper"
        style={{ position: "absolute", bottom: 20 }}
      >
        <NavLink to={"/wallet"}>
          <div className="card-name">Back</div>
        </NavLink>
      </span>
    </div>
  );
};

export default PaymentGateway;
