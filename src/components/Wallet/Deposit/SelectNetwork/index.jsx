import { useEffect, useState } from "react";
import "./index.scss";
import { getLoggedIn } from "utils";
import { useNavigate } from "react-router-dom";
import ApiService from "services/apiService";
import { Modal } from "react-bootstrap";
import DepositNetwork from "../DepositNetwork";

const SelectNetwork = ({ chains }) => {
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [showModal, setShowModal] = useState(false);
  const [createdDeposit, setCreatedDeposit] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const res = getLoggedIn();
    if (!res[0]) {
      navigate("/login");
    } else {
      setLogginIn(res);
    }
  }, []);

  const selectNetwork = (network) => {
    this.activeModal.close();
    const params = {
      ccy: network.ccy,
      subAcct: LogginIn[5],
      chain: network.chain,
    };
    ApiService.createDepositAddressForSubAccount(params).then((res) => {
      console.log(res, "res");
      setCreatedDeposit(JSON.parse(res["KYC Api resuult"]).data[0]);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (createdDeposit) {
      setShowModal(true);
    }
  }, [createdDeposit]);

  return (
    <>
      <div className="modal-header">
        <span>Select Network</span>
      </div>
      <div className="modal-body">
        <div className="network-list d-flex flex-column mt-1">
          {chains.map((chain, index) => (
            <div
              className="network-list-item"
              onClick={() => selectNetwork(chain)}
              key={index}
            >
              <span>{chain.chain}</span>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        scrollable
        modalDialogClass="network-modal-sm"
      >
        <DepositNetwork createdDeposit={createdDeposit} />
      </Modal>
    </>
  );
};

export default SelectNetwork;
