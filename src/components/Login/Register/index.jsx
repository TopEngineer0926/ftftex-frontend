import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import "./index.scss";
import CheckImg from "assets/images/check.svg";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import DialingCodes from "../DialingCodes";
import { FTFTexContext } from "App";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const [showEmailVerifyPopModal, setShowEmailVerifyPopModal] = useState(false);
  const [showMobileVerifyPopModal, setShowMobileVerifyPopModal] =
    useState(false);
  const [showRegistrationDoneModal, setShowRegistrationDoneModal] =
    useState(false);
  const [showDialingCodesModal, setShowDialingCodesModal] = useState(false);

  const [RegisterType, setRegisterType] = useState("email");
  const [OTP, setOTP] = useState("");
  const [Form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });
  const [DialingCode, setDialingCode] = useState(ApiService.DialingCode);
  const Verifications = {
    email: false,
    phone: false,
  };
  const [RegisterResponse, setRegisterResponse] = useState({});
  const [OTPVerificationMessage, setOTPVerificationMessage] = useState("");
  const [Errors, setErrors] = useState("");
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  const navigate = useNavigate();

  useEffect(() => {
    setDialingCode(ftftexValue.DialingCode);
  }, [ftftexValue.DialingCode]);

  const switchRegisterType = (value) => {
    setRegisterType(value);
    setForm({
      ...Form,
      email: "",
      phone: "",
    });
  };

  const register = () => {
    setOTPVerificationMessage("");
    ApiService.RegisterUser(Form, RegisterType, DialingCode.dialCode).then(
      (res) => {
        setRegisterResponse(res.data);

        if (!res.data.result.exist) {
          if (RegisterType === "email") {
            setShowEmailVerifyPopModal(true);
          }
          // this.api.SendingOTP({"userid": res.result.userId, "type":"email", "email": this.Form.value.email}).subscribe((res2: any) => {
          //   if (this.RegisterType === 'email'){
          //     this.modalService.open(this.emailVerifyPop, {ariaLabelledBy: 'modal-basic-title' , centered: true , backdrop: 'static'}).result.then((result) => {
          //     }, (reason) => {
          //     });
          //   }
          // });
        } else {
          setErrors("Email/Mobile Already Exist !");
        }
      }
    );
  };

  const VerifyOTP = (value) => {
    setOTPVerificationMessage("");
    /*const data = {
          userId: this.RegisterResponse.result.userId,
          pinCode: this.OTP
        };*/

    const data = {
      userId: RegisterResponse.result.userId,
      email: Form.email,
      pinCode: RegisterResponse.pinCode,
    };

    ApiService.VerifyUser(data).then(
      (res) => {
        dismissAll();
        setShowRegistrationDoneModal(true);
      },
      () => {
        setOTPVerificationMessage("Invalid !");
      }
    );

    /*this.api.VerifyUser(data).subscribe((res: any) => {
          if (res.Message === 'User verified successfully') {
            this.modalService.dismissAll();
            this.modalService.open(this.registrationDone, {ariaLabelledBy: 'modal-basic-title' , centered: true}).result.then((result) => {
            }, (reason) => {
              this.route.navigate(['/login']);
            });
          }else {
            this.OTPVerificationMessage = 'Invalid !';
          }
    
        });*/
  };

  const dismissAll = () => {
    setShowEmailVerifyPopModal(false);
    setShowMobileVerifyPopModal(false);
    setShowRegistrationDoneModal(false);
    setShowDialingCodesModal(false);
  };

  const myContinue = () => {
    ApiService.getUser(RegisterResponse.result.userId).then((res) => {
      const usr = [
        res.data.userDetails[0].firstName,
        res.data.userDetails[0].lastName,
        res.data.userDetails[0].userName,
        res.data.userDetails[0].phone,
        res.data.userDetails[0].email,
        res.data.userDetails[0].trnNumber,
        res.data.userDetails[0].status,
        res.data.userDetails[0].userType,
      ];
      localStorage.setItem("usr", JSON.stringify(usr));
      localStorage.setItem("userId", RegisterResponse.result.userId);
      setFtftexValue({
        ...ftftexValue,
        Loggedin: usr,
      });
      dismissAll();
      navigate("/");
    });
  };

  const openDialingCodes = () => {
    setShowDialingCodesModal(true);
  };

  const handleCloseDialingCodesModal = () => {
    setShowDialingCodesModal(false);
  };

  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
  };

  const handleChangeForm = (e, type) => {
    setForm({
      ...Form,
      [type]: type === "terms" ? e.target.checked : e.target.value,
    });
  };

  const isDisabled = () => {
    if (
      !Form.firstName ||
      !Form.lastName ||
      !Form.email ||
      !Form.phone ||
      !Form.password ||
      !Form.terms
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="bg-wt">
        <div className="container fh-minus-100">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="wt-box p-4 mt-lg-5 mb-5">
                <h1 className="s-bld mb-4">{t("Register")}</h1>
                <hr />
                {/* {<!-- <div className="d-flex w-100 mb-4">
        <button className="btn sub-menu-btn flex-fill" [ngClass]="{'sub-menu-btn-activate' : RegisterType === 'email'}" onClick="switchRegisterType('email')">Email</button>
        <button className="btn sub-menu-btn flex-fill" [ngClass]="{'sub-menu-btn-activate' : RegisterType === 'mobile'}" onClick="switchRegisterType('mobile')">Mobile</button>
    </div>-->} */}
                <div>
                  <label>{t("First Name")}</label>
                  <input
                    value={Form.firstName}
                    onChange={(e) => handleChangeForm(e, "firstName")}
                    className="form-control"
                    placeholder="First Name"
                    required
                  />

                  <label className="mt-3">{t("Last Name")}</label>
                  <input
                    value={Form.lastName}
                    onChange={(e) => handleChangeForm(e, "lastName")}
                    className="form-control"
                    placeholder="Last Name"
                    required
                  />

                  <label className="mt-3">{t("Email")}</label>
                  <div className="d-flex">
                    <input
                      value={Form.email}
                      onChange={(e) => handleChangeForm(e, "email")}
                      className="form-control"
                      placeholder="Email"
                    />
                    {/* {<!--       <button className="btn sub-menu-btn OTP-btn px-2" *ngIf="!Verifications.email" onClick="open(emailVerifyPop , 'email')">GET OTP</button>
          <button className="btn sub-menu-btn OTP-btn px-4" *ngIf="Verifications.email"><span className="material-symbols-outlined">check_circle</span></button>-->} */}
                  </div>

                  <label className="mt-3">{t("Mobile")}</label>
                  <div className="d-flex">
                    <div
                      className="btn co-code-btn  d-flex"
                      onClick={openDialingCodes}
                    >
                      <img
                        src={DialingCode.flag}
                        height={20}
                        width={20}
                        className="align-self-center "
                      />
                      <p className="mb-0 align-self-center s-bld ml-2">
                        {" "}
                        {DialingCode.dialCode}
                      </p>
                    </div>
                    <input
                      type="number"
                      value={Form.phone}
                      onChange={(e) => handleChangeForm(e, "phone")}
                      className="form-control mobile-field"
                    />
                    {/* {<!--<button className="btn sub-menu-btn OTP-btn px-2" *ngIf="!Verifications.phone" onClick="open(mobileVerifyPop , 'phone')">GET OTP</button>
            <button className="btn sub-menu-btn OTP-btn px-4" *ngIf="Verifications.phone"><span className="material-symbols-outlined">check_circle</span></button>-->} */}
                  </div>

                  <label className="mt-3">{t("Password")}</label>
                  <input
                    value={Form.password}
                    onChange={(e) => handleChangeForm(e, "password")}
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    required
                  />

                  <div className="form-group form-check mt-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      checked={Form.terms}
                      onChange={(e) => handleChangeForm(e, "terms")}
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="agree-txt">
                        {t(
                          "Registration means that you have read and agreed to the FTFTex"
                        )}
                        <a href={"/about/service-terms"} target="_blank">
                          {t("Terms of Service")}
                        </a>{" "}
                        ,
                        <a href={"/about/aml-policy"} target="_blank">
                          {t("Anti Money Laundering")}
                        </a>
                        .
                      </p>
                    </label>
                  </div>
                </div>

                <p className="mt-4 text-center error-msg">{Errors} </p>
                <button
                  className="btn btn-primary btn-lg my-5 mx-auto d-block font-weight-bold px-5"
                  disabled={isDisabled()}
                  onClick={register}
                >
                  Register
                </button>

                <hr />
                <h5 className=" text-center">
                  {t("Already have an account ?")}{" "}
                  <NavLink to={"/login"}>
                    <b>{t("Login here")} </b>
                  </NavLink>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showEmailVerifyPopModal}
        onHide={() => setShowEmailVerifyPopModal(false)}
        centered
        backdrop="static"
        ariaLabelledBy="modal-basic-title"
      >
        <div className="modal-body">
          <span
            className="material-symbols-outlined d-block mx-auto text-center"
            style={{ fontSize: 90 }}
          >
            mail
          </span>
          <p className="text-center mt-2">
            Verification code has been sent to <br /> <b>{Form.email}</b>
          </p>
          <input
            className="form-control mx-auto w-75 mt-4"
            value={OTP}
            placeholder="OTP"
            onChange={handleChangeOTP}
          />
          {OTPVerificationMessage && (
            <p className="text-center error-msg mt-4">
              {OTPVerificationMessage}
            </p>
          )}
          <div className="d-flex justify-content-center mt-5">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-5  d-block"
              onClick={() => setShowEmailVerifyPopModal(false)}
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
      </Modal>

      <Modal
        show={showMobileVerifyPopModal}
        onHide={() => setShowMobileVerifyPopModal(false)}
        centered
        backdrop="static"
        ariaLabelledBy="modal-basic-title"
      >
        <div className="modal-body">
          <span
            className="material-symbols-outlined d-block mx-auto text-center mt-4"
            style={{ fontSize: 90 }}
          >
            smartphone
          </span>
          <p className="text-center mt-2">
            Verification code has been sent to <br /> <b>{Form.phone}</b>
          </p>
          <h2 className="text-center">{RegisterResponse.pinCode}</h2>
          <input
            className="form-control mx-auto w-75 mt-4"
            value={OTP}
            onChange={handleChangeOTP}
            placeholder="OTP"
          />
          {OTPVerificationMessage && (
            <p className="text-center error-msg mt-4">
              {OTPVerificationMessage}
            </p>
          )}
          <div className="d-flex justify-content-center mt-5">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-5  d-block"
              onClick={() => setShowMobileVerifyPopModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg px-5 ml-3  d-block"
              onClick={() => VerifyOTP("mobile")}
            >
              Verify
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        show={showRegistrationDoneModal}
        onHide={() => setShowRegistrationDoneModal(false)}
        centered
        ariaLabelledBy="modal-basic-title"
      >
        <div className="modal-body">
          <img
            src={CheckImg}
            className="mx-auto d-block mb-3 mt-5"
            height={60}
          />
          <h2 className="mb-5 text-center s-bld">Registration Completed</h2>
          <button
            type="button"
            className="btn btn-primary btn-lg px-5 w-100"
            onClick={myContinue}
          >
            Continue
          </button>
        </div>
      </Modal>
      <Modal
        show={showDialingCodesModal}
        onHide={handleCloseDialingCodesModal}
        centered
      >
        <DialingCodes onClose={handleCloseDialingCodesModal} />
      </Modal>
    </>
  );
};

export default Register;
