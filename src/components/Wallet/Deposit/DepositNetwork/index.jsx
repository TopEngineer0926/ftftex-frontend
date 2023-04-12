import { useEffect } from "react";
import "./index.scss";

const DepositNetwork = ({ createdDeposit }) => {
  useEffect(() => {
    console.log(createdDeposit, "createdDeposit");
  }, []);

  const copy = (add) => {
    navigator.clipboard.writeText(add);
  };

  return (
    <>
      <div className="modal-header justify-content-center">
        <span>Deposit </span>{" "}
        {createdDeposit && <span> {createdDeposit.ccy}</span>}
      </div>
      {createdDeposit && (
        <div className="modal-body">
          <div className="deposit-network-main">
            <span className="gray">Network</span>
            <span className="address">
              {createdDeposit.ccy}{" "}
              <small className="gray">{createdDeposit.chain}</small>
            </span>
          </div>

          <div className="deposit-network-main mt-2">
            <span className="gray">Address</span>
            <span className="address">{createdDeposit.addr}</span>
          </div>
        </div>
      )}
      {createdDeposit && (
        <div className="modal-footer">
          {/* <!--    <button type="button" className="btn  d-block mx-auto">Save Address</button>--> */}
          <button
            type="button"
            className="btn btn-outline-primary d-block mx-auto"
            onClick={() => copy(createdDeposit.addr)}
          >
            Share Address
          </button>
        </div>
      )}
    </>
  );
};

export default DepositNetwork;
