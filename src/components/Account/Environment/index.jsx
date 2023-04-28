import "./index.scss";

const Environment = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>Environment</h4>
      </div>
      <div className="d-flex py-2 mt-3">
        <div style={{ width: "50%" }}>
          <div className="row">
            <div className="col-5 pr-0">
              <p>Version</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">System Permissions</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Chanel</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Location</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Language</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Camera</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Manufacturer</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">File Information & Access</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>System</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Phone Information</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Model</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">System Settings</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Resolution</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">System Permissions</p>
            </div>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div className="row">
            <div className="col-5 pr-0">
              <p>Network</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">System Permissions</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>IP</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Location</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Carrier</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Camera</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Time Zone</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">File Information & Access</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Login Devices</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">Phone Information</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>Request Time</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">System Settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Environment;
