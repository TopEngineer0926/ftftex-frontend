import CheckedImg from "assets/images/checked.gif";
import CheckedDarkImg from "assets/images/checked-dark.gif";
import { getTheme } from "utils";

const OrderStatusPop = ({ onClose }) => {
  return (
    <>
      <div className="modal-body">
        {getTheme() === "light" && (
          <img src={CheckedImg} className="mx-auto d-block mb-2 mt-5" />
        )}
        {getTheme() === "dark" && (
          <img src={CheckedDarkImg} className="mx-auto d-block mb-2 mt-5" />
        )}
        <h4 className="mb-5 s-bld text-center">Order Completed !</h4>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-primary d-block mx-auto"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </>
  );
};

export default OrderStatusPop;
