const SettingsAccount = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>Account Settings</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <p>Language</p>
        <div className="d-flex align-items-center">
          <p className="m-0 mr-2">English</p>
          <span
            className="material-symbols-outlined acc-box-i align-self-center ml-auto"
            style={{ fontSize: 16, opacity: 0.6 }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Currency</p>
        <div className="d-flex align-items-center">
          <p className="m-0 mr-2">Euro</p>
          <span
            className="material-symbols-outlined acc-box-i align-self-center ml-auto"
            style={{ fontSize: 16, opacity: 0.6 }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Mode</p>
        <div className="d-flex align-items-center">
          <span
            className="material-symbols-outlined acc-box-i align-self-center ml-auto"
            style={{ fontSize: 16, opacity: 0.6 }}
          >
            arrow_forward_ios
          </span>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
            />
          </div>
          <span
            className="material-symbols-outlined acc-box-i align-self-center ml-auto"
            style={{ fontSize: 16, opacity: 0.6 }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="pb-2 light-border-bottom mt-2">
        <h4>Trading Settings</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <p>Transaction History</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Trading History</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Color Reference</p>
        <div className="d-flex align-items-center">
          <p className="tab-text txt-green m-0 mr-2">Green Up</p>
          <p className="tab-text txt-red m-0 mr-2">Red Down</p>
          <span
            className="material-symbols-outlined acc-box-i align-self-center ml-auto"
            style={{ fontSize: 16, opacity: 0.6 }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Volume Unit (Trading)</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-end">
        <a className="btn btn-outlined mr-3">Delete Trading Account</a>
      </div>
    </div>
  );
};

export default SettingsAccount;
