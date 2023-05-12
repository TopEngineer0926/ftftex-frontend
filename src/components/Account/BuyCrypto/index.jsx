import { useEffect, useState } from "react";
import "./index.scss";

const BuyCrypto = () => {
  const [isAppended, setIsAppended] = useState(false);

  useEffect(() => {
    if (!isAppended) {
      const m = document.createElement("script");
      m.type = "text/javascript";
      m.src = `https://iframe.sandbox.test-simplexcc.com/form.js`;
      document.body.appendChild(m);

      m.onload = () => {
        window.simplex.createForm();
        window.simplex.updateCryptoCurrency("BTC");
      };

      m.onerror = () => {
        console.log("Could not load the Google API Script!");
      };

      setIsAppended(true);
    }
  }, []);

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="simplexform wt-box mt-3 p-3">
              <h4 className="s-bld">Buy Crypto</h4>
              <hr />
              <div id="simplex-form" className="dark-theme"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
