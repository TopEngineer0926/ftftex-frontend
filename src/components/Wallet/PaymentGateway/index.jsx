import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

const PaymentGateway = () => {
  const [isAppended, setIsAppended] = useState(false);

  useEffect(() => {
    if (!isAppended) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://iframe.sandbox.test-simplexcc.com/form.js";

      document.body.appendChild(script);
      script.onload = () => {
        window.simplex.createForm();
      };
      script.onerror = () => {
        console.log("Could not load the Google API Script!");
      };

      setIsAppended(true);
    }
  }, []);

  return (
    <div className="wt-box min-h-full simplexform">
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
