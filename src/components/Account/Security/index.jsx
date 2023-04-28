import "./index.scss";

const Security = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>Security</h4>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p>Password</p>
        </div>
        <div className="col-5">
          <span>*********</span>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 16, opacity: 0.6 }}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <div className="d-flex align-items-center">
            <p className="mr-4">Email</p>
            <p className="txt-green small-txt">Linked</p>
          </div>
        </div>
        <div className="col-5">
          <span>test@gmail.com</span>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 16, opacity: 0.6 }}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <div className="d-flex align-items-center">
            <p className="mr-4">Phone</p>
            <p className="txt-red small-txt">Unlinked</p>
          </div>
        </div>
        <div className="col-5">
          <span>+7475****89348</span>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 16, opacity: 0.6 }}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p className="mr-4">2FA</p>
        </div>
        <div className="col-9">
          <div className="d-flex justify-content-end">
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 16, opacity: 0.6 }}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p className="mr-4">Account Verification</p>
        </div>
        <div className="col-9">
          <div className="d-flex justify-content-end">
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 16, opacity: 0.6 }}
            >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
