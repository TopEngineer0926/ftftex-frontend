import "./index.scss";

const CommunitySettings = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>Community Settings</h4>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p>Profile Picture</p>
        </div>
        <div className="col-5">
          <span
            className="material-symbols-outlined align-self-center"
            style={{ fontSize: 35 }}
          >
            account_circle
          </span>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <a className="btn btn-outlined mr-3">Edit</a>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p>Nickname</p>
        </div>
        <div className="col-5">
          <div className="d-flex flex-column">
            <input className="form-control w-100" />
            <span className="align-self-end helper-text">
              Maximum 25 letters
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <a className="btn btn-outlined mr-3">Save</a>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-3">
          <p>Bio</p>
        </div>
        <div className="col-5">
          <div className="d-flex flex-column">
            <textarea className="form-control w-100 input-height"></textarea>
            <span className="align-self-end helper-text">
              Maximum 100 characters
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <a className="btn btn-outlined mr-3">Save</a>
          </div>
        </div>
      </div>
      <div className="pb-2 light-border-bottom mt-2">
        <h4>Notifications</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <div className="d-flex">
          <p>Posts & Comments</p>
          <span style={{ opacity: 0.5 }}>&nbsp; (Likes and Comments)</span>
        </div>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitch1"
          />
          <label className="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>New Followers</p>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitch1"
          />
          <label className="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>
    </div>
  );
};

export default CommunitySettings;
