import "./index.scss";

const Privacy = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>Privacy</h4>
      </div>
      <h4 className="mt-4">System Permissions</h4>
      <div className="row py-2 mt-4">
        <div className="col-11">
          <div className="d-flex align-items-center">
            <p className="mr-3">Location</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="d-flex justify-content-end">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                for="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-11">
          <div className="d-flex align-items-center">
            <p className="mr-3">Camera</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="d-flex justify-content-end">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                for="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-11">
          <div className="d-flex align-items-center">
            <p className="mr-3">File Information and Access</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="d-flex justify-content-end">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                for="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-11">
          <div className="d-flex align-items-center">
            <p className="mr-3">Phone Information</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="d-flex justify-content-end">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                for="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2 mb-4">
        <div className="col-11">
          <div className="d-flex align-items-center">
            <p className="mr-3">System Settings</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-1">
          <div className="d-flex justify-content-end">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                for="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-2 mt-4">
        <div className="col-3">
          <p>Clear Cache</p>
        </div>
        <div className="col-5">
          <p style={{ fontWeight: 700 }}>3.8 MBb</p>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <a className="btn btn-outlined">Clear</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
