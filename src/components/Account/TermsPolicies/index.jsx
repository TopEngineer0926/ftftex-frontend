const TermsPolicies = () => {
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4>Terms & Policies</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <p>Anti Money Laundering (AML)</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Privacy Policy</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.6 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>Terms of Service</p>
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

export default TermsPolicies;
