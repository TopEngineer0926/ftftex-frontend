import { useState } from "react";
import ApiService from "../../../services/apiService";

export const InputOTPModal = ({
  onClose,
  email,
  newPassword,
  failedAttempts,
  setFailedAttempts,
  setShowFaildAttemptModal,
  setSuceessfullChangeModal,
}) => {
  const [OTP, setOTP] = useState("");
  const userId = localStorage.getItem("userId");

  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
  };

  const VerifyOTP = async () => {
    const data = {
      email: email,
      pinCode: OTP,
      service: "change_password",
      userId: userId,
    };
    const responseVerify = await ApiService.VerifyUser(data);
    if (responseVerify.data.Message === "Wrong Pin-Code") {
      onClose();
      setFailedAttempts(failedAttempts + 1);
      setShowFaildAttemptModal(true);
    } else {
      onClose();
      const response = await ApiService.changePassword(
        { password: newPassword },
        userId
      );
      if (response.status === 200) {
        setSuceessfullChangeModal(true);
        onClose();
      }
    }
  };

  return (
    <div className="modal-body">
      <span
        className="material-symbols-outlined d-block mx-auto text-center"
        style={{ fontSize: 90 }}
      >
        mail
      </span>
      <p className="text-center mt-2">
        Verification code has been sent to <br /> <b>{email}</b>
      </p>
      <input
        className="form-control mx-auto w-75 mt-4"
        value={OTP}
        placeholder="OTP"
        onChange={handleChangeOTP}
      />
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg px-5  d-block"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg px-5 ml-3  d-block"
          onClick={() => VerifyOTP("email")}
        >
          Verify
        </button>
      </div>
    </div>
  );
};
