const Logout = () => {
  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span
          className="material-symbols-outlined acc-box-i align-self-center my-4"
          style={{ fontSize: 35, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
        <p
          className="mb-4"
          style={{ fontSize: 27, maxWidth: 200, textAlign: "center" }}
        >
          Are you sure you want to logout?
        </p>
        <div className="d-flex mb-2">
          <a className="btn btn-outlined mr-2">Cancel</a>
          <a className="btn btn-primary">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Logout;
