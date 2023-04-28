const Support = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4>Support</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <p>Help Center</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Contact Us</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>About Us</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
};

export default Support;
