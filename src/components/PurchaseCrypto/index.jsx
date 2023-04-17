import { useEffect } from "react";
import "./index.scss";

window.simplex = window.simplexAsyncFunction;

const PurchaseCrypto = () => {
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
    <div id="simplex-wrapper">
      <form id="simplex-form">
        <div id="checkout-element"></div>
      </form>
    </div>
  );
};

export default PurchaseCrypto;
