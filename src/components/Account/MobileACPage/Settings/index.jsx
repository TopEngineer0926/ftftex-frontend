import { useTranslation } from "react-i18next";
import { changeLanguage } from "utils";

const Settings = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (val) => {
    i18n.changeLanguage(val);
    changeLanguage(val);
  };

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h4 className="s-bld mt-3">{t("Settings")}</h4>
            <hr />
            <div className="wt-box mt-3 p-lg-3">
              <div className="acc-box mb-2">
                <div className="align-self-center">
                  <p className="s-bld mb-0">{t("Language")}</p>
                </div>
                <div className="ml-auto d-flex flex-row align-self-center">
                  <div className="nav-item ">
                    <a className="nav-link" onClick={() => changeLang("ch")}>
                      中文
                    </a>
                  </div>
                  <div className="nav-item ">
                    <a className="nav-link">|</a>
                  </div>
                  <div className="nav-item ">
                    <a className="nav-link" onClick={() => changeLang("en")}>
                      ENG
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
