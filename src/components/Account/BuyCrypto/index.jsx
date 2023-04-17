import { useEffect } from "react";

const BuyCrypto = () => {
  useEffect(() => {
    const m = document.createElement("script");
    m.type = "text/javascript";
    m.src = `https://iframe.sandbox.test-simplexcc.com/form.js`;
    document.body.appendChild(m);

    setTimeout(() => {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.text = `window.simplex.createForm();window.simplex.updateCryptoCurrency("BTC");`;

      document.body.appendChild(s);
    }, 2000);
  }, []);

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="wt-box mt-3 p-3">
              <h4 className="s-bld">Buy Crypto</h4>
              <hr />
              <div id="simplex-form"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
