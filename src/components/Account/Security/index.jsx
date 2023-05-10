import "./index.scss";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import ApiService from "../../../services/apiService";
import {Divider} from "@mui/material";
import {Modal, Spinner} from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const Security = () => {
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangePhone, setIsChangePhone] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await ApiService.getUser(localStorage.getItem("userId"));
    const userData = response.data.userDetails[0];
    setUser(userData);
    setNewPhone(userData.phone);
    setNewEmail(userData.email);
    setIsLoading(false);
  }

  const userHiddenEmail = (email) => {
    const emailArr = email.split('@');
    return email.slice(0, 2) + '*'.repeat(emailArr[0].slice(2).length) + '@' + emailArr[1];
  }

  const userHiddenPhone = (phone) => {
    return phone.slice(0, 4) + '*'.repeat(phone.slice(4, 9).length) + phone.slice(9);
  }

  const handleCloseModal = () => {
    setIsChangePassword(false);
  }

  const editUserPhone = async () => {
    const checkPhone = newPhone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    if (checkPhone !== null) {
      const data = {
        id: localStorage.getItem("userId"),
        phone: newPhone
      }
      const response = await ApiService.editUserPhone(data);
      if (response.status === 200) {
        getUser();
        const result = response.data.Success;
        enqueueSnackbar(t(result), {
          variant: 'success'
        });
        setIsChangePhone(false);
      }
    } else {
      enqueueSnackbar(t('account.security.Please enter a valid phone number'), {
        variant: 'error'
      });
    }
  }

  const editUserEmail = async () => {
    const checkEmail = newEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (checkEmail !== null) {
      const data = {
        id: localStorage.getItem("userId"),
        email: newEmail
      }
      const response = await ApiService.editUserEmail(data);
      if (response.status === 200) {
        getUser();
        const result = response.data.Success;
        enqueueSnackbar(t(result), {
          variant: 'success'
        });
        setIsChangeEmail(false);
        localStorage.clear();
        window.location.reload();
        navigate("/login");
        navigate(0);
      }
    } else {
      enqueueSnackbar(t('account.security.Please enter a valid email'), {
        variant: 'error'
      });
    }
  }

  return (
      <>
        {isLoading ?
            <Spinner animation="border" variant="primary" className="loading"/>
            : (
                <div className="container p-4">
                  <div className="pb-2 light-border-bottom">
                    <h4>{t("Security")}</h4>
                    <Divider/>
                  </div>
                  <div className="row py-2 mt-2">
                    <div className="col-3">
                      <p>{t("Password")}</p>
                    </div>
                    <div className="col-5">
                      <span className="font-weight-bold">{'*'.repeat(user.password.length)}</span>
                    </div>
                    <div className="col-4 pointer" onClick={() => setIsChangePassword(true)}>
                      <div className="d-flex justify-content-end">
            <span
                className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                style={{fontSize: 26, opacity: 0.4}}>expand_more</span>
                      </div>
                    </div>
                  </div>
                  <div className="row py-2 mt-2 pointer">
                    <div className="col-3">
                      <div className="d-flex align-items-center">
                        <p className="mr-4">{t("Email")}</p>
                        <p className="txt-green small-txt">{t("Linked")}</p>
                      </div>
                    </div>
                    {!isChangeEmail ? (
                        <>
                          <div className="col-5">
                            <span className="font-weight-bold">{userHiddenEmail(user.email)}</span>
                          </div>
                          <div className="col-4" onClick={() => setIsChangeEmail(true)}>
                            <div className="d-flex justify-content-end">
                                <span className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                                      style={{fontSize: 26, opacity: 0.4}}>expand_more</span>
                            </div>
                          </div>
                        </>
                    ) : (
                        <>
                          <div className="col-5">
                            <div className="d-flex flex-column">
                              <input className="form-control w-100" value={newEmail}
                                     onChange={e => setNewEmail(e.target.value)}/>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end">
                              <button className="btn btn-primary ml-2"
                                      onClick={() => setIsChangeEmail(false)}>{t("Cancel")}</button>
                              <a className="btn btn-outlined ml-3"
                                 onClick={() => editUserEmail()}>{t("Save")}</a>
                            </div>
                          </div>
                        </>
                    )
                    }
                  </div>
                  <div className="row py-2 mt-2 pointer">
                    <div className="col-3">
                      <div className="d-flex align-items-center">
                        <p className="mr-4">{t("Phone")}</p>
                        <p className="txt-red small-txt">Unlinked</p>
                      </div>
                    </div>
                    {!isChangePhone ? (
                        <>
                          <div className="col-5">
                            <span className="font-weight-bold">{userHiddenPhone(user.phone)}</span>
                          </div>
                          <div className="col-4" onClick={() => setIsChangePhone(true)}>
                            <div className="d-flex justify-content-end">
                                <span className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                                      style={{fontSize: 26, opacity: 0.4}}>expand_more</span>
                            </div>
                          </div>
                        </>
                    ) : (
                        <>
                          <div className="col-5">
                            <div className="d-flex flex-column">
                              <input className="form-control w-100" value={newPhone}
                                     onChange={e => setNewPhone(e.target.value)}/>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end">
                              <button className="btn btn-primary ml-2"
                                      onClick={() => setIsChangePhone(false)}>{t("Cancel")}</button>
                              <a className="btn btn-outlined ml-3"
                                 onClick={editUserPhone}>{t("account.community.Save")}</a>
                            </div>
                          </div>
                        </>
                    )
                    }
                  </div>
                  <div className="row py-2 mt-2 pointer">
                    <div className="col-3">
                      <p className="mr-4">{t("2FA")}</p>
                    </div>
                    <div className="col-9">
                      <div className="d-flex justify-content-end">
            <span className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{fontSize: 16, opacity: 0.4}}>arrow_forward_ios</span>
                      </div>
                    </div>
                  </div>
                  <a href="/account/verification" className="row py-2 mt-2">
                    <div className="col-3">
                      <p className="mr-4">{t("Account Verification")}</p>
                    </div>
                    <div className="col-9">
                      <div className="d-flex justify-content-end">
            <span className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{fontSize: 16, opacity: 0.4}}>arrow_forward_ios</span>
                      </div>
                    </div>
                  </a>
                </div>
            )}
        <Modal show={isChangePassword} onHide={handleCloseModal} centered size="lg">
          <ChangePasswordModal onClose={handleCloseModal}/>
        </Modal>
      </>
  );
};

export default Security;
