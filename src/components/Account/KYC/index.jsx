import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import CountryDataService from "services/countryDataService";
import { getLoggedIn, getTheme } from "utils";
import { FTFTexContext } from "App";
import CheckedImg from "assets/images/checked.gif";
import "./index.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "react-bootstrap";

const KYC = () => {
  const [Countries, setCountries] = useState(CountryDataService.countries);
  const [search, setSearch] = useState("");
  const [Page, setPage] = useState(1);
  const [reference, setReference] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [KYC, setKYC] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    nationality: "",
    issue_date: "",
    expiry_date: "",
  });
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [SelectedNationality, setSelectedNationality] = useState("");
  const DocumentTypes = [
    { caption: "Government-Issued ID Card", value: "id_card" },
    { caption: "Driver's License", value: "drv_license" },
    { caption: "Passport", value: "passport" },
  ];
  const [verificationUrl, setVerificationUrl] = useState("");
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    const res = getLoggedIn();
    if (!res[0]) {
    } else {
      setLogginIn(res);
    }

    return () => {
      const payload = {
        reference: reference,
      };
      let token = btoa(
        "S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"
      ); //BASIC AUTH TOKEN
      fetch("https://api.shuftipro.com/status", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + token, // if access token then replace "Basic" with "Bearer"
        },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          if (data.event === "verification.accepted") {
            verifyKyc();
          }
          return data;
        });
    };
  }, []);

  const SelectedACountry = (cont) => {
    setSelectedCountry(cont);
  };

  const SelectedANationality = (cont) => {
    setSelectedNationality(cont);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeKYC = (e, type) => {
    setKYC({
      ...KYC,
      [type]: e.target.value,
    });
  };

  const toModel = (date) => {
    return date
      ? date.year +
          "-" +
          ("0" + date.month).slice(-2) +
          "-" +
          ("0" + date.day).slice(-2)
      : null;
  };

  const myContinue = () => {
    const REFERENCE = `SP_REQUEST_${Math.random()}`;
    setReference(REFERENCE);
    let payload = {
      REFERENCE,
      // callback_url: "http://localhost:4200/account/wallet",
      // redirect_url: `http://localhost:4200/account/status/${REFERENCE}`,
      country: SelectedNationality.alpha_2_code,
      verification_mode: "any",
    };
    payload["face"] = {
      proof: "",
      allow_offline: "1",
    };
    payload["document"] = {
      name: {
        first_name: KYC.first_name,
        middle_name: KYC.middle_name,
        last_name: KYC.last_name,
      },
      expiry_date: toModel(KYC.expiry_date),
      // expiry_date     : '2030-11-04' moment(KYC.expiry_date).format('yyyy-mm-dd');,
      issue_date: toModel(KYC.issue_date),
      allow_offline: "1",
      allow_online: "1",
      supported_types: ["id_card", "passport"],
    };

    payload["background_checks"] = {
      name: {
        first_name: KYC.first_name,
        middle_name: KYC.middle_name,
        last_name: KYC.last_name,
      },
      dob: toModel(KYC.dob),
    };
    let token = btoa(
      "S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"
    ); //BASIC AUTH TOKEN
    fetch("https://api.shuftipro.com/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.event && data.event === "request.pending") {
          setPage(2);
          setVerificationUrl(data.verification_url);
        }
      });
  };

  const verifyKyc = () => {
    const params = {
      id: localStorage.getItem("userId"),
      reference: reference,
      userType: "verified",
      status: "verified",
      docMap: [],
    };
    ApiService.verifyKyc(params).then((result) => {
      ApiService.getUser(localStorage.getItem("userId")).then((res) => {
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

        setFtftexValue({
          ...ftftexValue,
          Loggedin: usr,
        });
      });
    });
  };

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-md-3">
            {Page === 1 && (
              <div className="wt-box mt-3 p-3">
                <div className="d-flex">
                  <span
                    className="material-symbols-outlined align-self-center mb-0 mr-2"
                    style={{ fontSize: 30 }}
                  >
                    verified_user
                  </span>
                  <h4 className="s-bld mb-0 align-self-center">
                    {" "}
                    Personal verification
                  </h4>
                </div>
                <hr />

                <label className="s-bld mt-3">First Name</label>
                <input
                  className="form-control rounded-0"
                  placeholder="First Name"
                  value={KYC.first_name}
                  onChange={(e) => handleChangeKYC(e, "first_name")}
                />

                <label className="s-bld mt-3">Middle Name</label>
                <input
                  className="form-control rounded-0"
                  placeholder="Middle Name"
                  value={KYC.middle_name}
                  onChange={(e) => handleChangeKYC(e, "middle_name")}
                />

                <label className="s-bld mt-3">Last Name</label>
                <input
                  className="form-control rounded-0"
                  placeholder="Last Name"
                  value={KYC.last_name}
                  onChange={(e) => handleChangeKYC(e, "last_name")}
                />

                <label className="s-bld mt-3">Birth Date</label>
                <div className="input-group">
                  {/* <input
                    (click)="d.toggle()"
                    className="form-control rounded-0"
                    placeholder="yyyy-mm-dd"
                    value="KYC.dob"
                    ngbDatepicker
                    #d="ngbDatepicker"
            /> */}
                  <DatePicker
                    selected={KYC.dob}
                    onChange={(date) => setKYC({ ...KYC, dob: date })}
                    className="form-control rounded-0"
                    placeholderText="yyyy-mm-dd"
                    dateFormat={"yyyy-mm-dd"}
                  />
                </div>

                <label className="s-bld mt-3">ID Expiration Date</label>
                <div className="input-group">
                  {/* <input
                    (click)="e.toggle()"
                    className="form-control rounded-0"
                    placeholder="yyyy-mm-dd"
                    value="KYC.expiry_date"
                    ngbDatepicker
                    #e="ngbDatepicker"
            /> */}
                  <DatePicker
                    selected={KYC.expiry_date}
                    onChange={(date) => setKYC({ ...KYC, expiry_date: date })}
                    className="form-control rounded-0"
                    placeholderText="yyyy-mm-dd"
                    dateFormat={"yyyy-mm-dd"}
                  />
                </div>

                <label className="s-bld mt-3">ID Issue Date</label>
                <div className="input-group">
                  {/* <input
                    (click)="i.toggle()"
                    className="form-control rounded-0"
                    placeholder="yyyy-mm-dd"
                    value="KYC.issue_date"
                    ngbDatepicker
                    #i="ngbDatepicker"
            /> */}
                  <DatePicker
                    selected={KYC.issue_date}
                    onChange={(date) => setKYC({ ...KYC, issue_date: date })}
                    className="form-control rounded-0"
                    placeholderText="yyyy-mm-dd"
                    dateFormat={"yyyy-mm-dd"}
                  />
                </div>

                <label className="s-bld mt-3">Issuer of ID Document</label>
                <Dropdown>
                  <Dropdown.Toggle
                    className="form-control ddrop d-flex"
                    id="dropdownBasic1"
                    // onClick={() => setSearch("")}
                  >
                    {SelectedNationality === "" ? (
                      "-- Select --"
                    ) : (
                      <>
                        <img
                          src={`https://cdn.kcak11.com/CountryFlags/countries/${SelectedNationality.alpha_2_code.toLowerCase()}.svg`}
                          className="mr-2"
                        />
                        {SelectedNationality.nationality}
                      </>
                    )}
                    <span
                      className="material-symbols-outlined align-self-center mb-0 ml-auto mr-2"
                      style={{ fontSize: 24 }}
                    >
                      arrow_drop_down
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    aria-labelledby="dropdownBasic1"
                    className={
                      getTheme() === "dark"
                        ? "bg-dark drop-down-cc"
                        : "drop-down-cc"
                    }
                  >
                    <div
                      className="wt-box p-2 rounded-0"
                      style={{ position: "sticky", top: "-0.5rem" }}
                    >
                      <input
                        value={search}
                        className="form-control"
                        placeholder="Search"
                        onChange={handleChangeSearch}
                      />
                    </div>
                    {Countries.map(
                      (cont, index) =>
                        cont.nationality
                          .toLowerCase()
                          .includes(search.toLowerCase()) && (
                          <Dropdown.Item
                            key={index}
                            onClick={() => SelectedANationality(cont)}
                          >
                            <img
                              src={`https://cdn.kcak11.com/CountryFlags/countries/${cont.alpha_2_code.toLowerCase()}.svg`}
                              className="mr-2"
                            />
                            {cont.nationality}
                          </Dropdown.Item>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                {/* // <!--          <h5 className="mt-4">Government-issued Document</h5>-->
// <!--          <label className="s-bld mt-3">Country of Issue</label>-->
// <!--          <div ngbDropdown>-->
// <!--            <div className="form-control ddrop d-flex" id="dropdownBasic1" ngbDropdownToggle (click)="search = ''">-->
// <!--              <ng-container *ngIf="SelectedCountry === '' ; else isCountry">&#45;&#45; Select &#45;&#45;</ng-container>-->
// <!--              <ng-template #isCountry>-->
// <!--                <img src="https://cdn.kcak11.com/CountryFlags/countries/{{SelectedCountry.alpha_2_code.toLowerCase()}}.svg"  className="mr-2">-->
// <!--                {{SelectedCountry.en_short_name}}</ng-template>-->
// <!--              <span className="material-symbols-outlined align-self-center mb-0 ml-auto mr-2" style="font-size: 24px;">arrow_drop_down</span>-->
// <!--            </div>-->
// <!--            <div ngbDropdownMenu aria-labelledby="dropdownBasic1" className="drop-down-cc">-->
// <!--              <div className="wt-box p-2 rounded-0" style="position: sticky;top: -0.5rem">-->
// <!--                <input value="search" className="form-control" placeholder="Search"  >-->
// <!--              </div>-->
// <!--              <ng-container *ngFor="let cont of Countries">-->
// <!--              <button ngbDropdownItem *ngIf="cont.en_short_name.toLowerCase().includes(search.toLowerCase())" (click)="SelectedACountry(cont)">-->
// <!--                <img src="https://cdn.kcak11.com/CountryFlags/countries/{{cont.alpha_2_code.toLowerCase()}}.svg"  className="mr-2">-->
// <!--                {{cont.en_short_name}}-->
// <!--              </button>-->
// <!--              </ng-container>-->
// <!--            </div>-->
// <!--          </div>-->

//           <!--          <div className="mt-3">-->
// <!--            <p className="" style="opacity: 0.6">Choose your document type</p>-->
// <!--            <ng-container *ngFor="let tp of DocumentTypes">-->
// <!--            <div className="acc-box mb-2" [ngClass]="{'acc-box-selected': KYC.document_type === tp.value}" (click)="switchDocumentType(tp)">-->
// <!--              <h6 className="s-bld mb-0">{{tp.caption}}</h6>-->
// <!--            </div>-->
// <!--            </ng-container>-->
// <!--          </div>-->
//           <div className="d-flex mt-4">
// <!--            <div className="d-flex progress-w align-self-center pr-lg-5 pr-3">-->
// <!--              <div className="filled flex-fill" ></div>-->
// <!--              <div className="un-filled ml-2 flex-fill" ></div>-->
// <!--              <div className="un-filled ml-2 flex-fill" ></div>-->
// <!--            </div>--> */}
                <button
                  className="btn btn-primary px-5  ml-auto mt-4"
                  disabled={!SelectedNationality}
                  onClick={myContinue}
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {Page === 2 && verificationUrl && (
            <div className="wt-box mt-3 p-3">
              <iframe
                src={verificationUrl}
                height="100%"
                width="100%"
                id="shuftipro-iframe"
                style={{
                  overflow: "hidden",
                  marginTop: 100,
                  height: 600,
                  width: "100%",
                  border: 0,
                }}
                allow="camera"
              ></iframe>

              {/* <!--          <div className="d-flex">-->
<!--            <span className="material-symbols-outlined align-self-center mb-0 mr-2" style="font-size: 30px;">verified_user</span>-->
<!--            <h4 className="s-bld mb-0 align-self-center"> Personal verification</h4>-->
<!--          </div>-->
<!--          <hr>-->
<!--          <h5 className="mb-0">Upload Image of ID</h5>-->
<!--          <div className="mt-3 instructions">-->
<!--            <p className=""><span className="material-symbols-outlined">check</span> Government-issued</p>-->
<!--            <p className=""><span className="material-symbols-outlined">check</span> Original full-size, unedited documents</p>-->
<!--            <p className=""><span className="material-symbols-outlined">check</span> Place documents against a single-coloured background</p>-->
<!--            <p className=""><span className="material-symbols-outlined">check</span> Readable, well-lit, coloured images</p>-->
<!--            <p className=""><span className="material-symbols-outlined">close</span> No black and white images</p>-->
<!--            <p className=""><span className="material-symbols-outlined">close</span> No edited or expired documents</p>-->
<!--          </div>-->
<!--          <div className="d-flex mt-5">-->
<!--            <div className="image-upload flex-fill">-->
<!--              <p className="mb-0 s-bld">Front</p>-->
<!--              <label for="file-input">-->
<!--                <span className="material-symbols-outlined m-auto" >photo_camera</span>-->
<!--              </label>-->
<!--              <input id="file-input" type="file" />-->
<!--            </div>-->

<!--            <div className="image-upload flex-fill ml-2">-->
<!--              <p className="mb-0 s-bld">Back</p>-->
<!--              <label for="file-input">-->
<!--                <span className="material-symbols-outlined m-auto" >photo_camera</span>-->
<!--              </label>-->
<!--              <input id="file-input" type="file" />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div className="d-flex mt-4">-->
<!--            <div className="d-flex progress-w align-self-center pr-lg-5 pr-3">-->
<!--              <div className="filled flex-fill" ></div>-->
<!--              <div className="filled ml-2 flex-fill" ></div>-->
<!--              <div className="un-filled ml-2 flex-fill" ></div>-->
<!--            </div>-->
<!--            <button className="btn btn-primary px-5  ml-auto" (click)="Page = 3">Continue</button>-->
<!--          </div>--> */}
            </div>
          )}

          {Page === 3 && (
            <div className="wt-box mt-3 p-3">
              <div className="d-flex">
                <span
                  className="material-symbols-outlined align-self-center mb-0 mr-2"
                  style={{ fontSize: 30 }}
                >
                  verified_user
                </span>
                <h4 className="s-bld mb-0 align-self-center">
                  {" "}
                  Personal verification
                </h4>
              </div>
              <hr />
              <h5 className="mb-0">Upload a Selfie</h5>
              <div className="mt-3 instructions">
                <p className="">
                  <span className="material-symbols-outlined">check</span> Use a
                  light room
                </p>
                <p className="">
                  <span className="material-symbols-outlined">check</span> Hold
                  the camera stable
                </p>
                <p className="">
                  <span className="material-symbols-outlined">close</span> No
                  flash
                </p>
                <p className="">
                  <span className="material-symbols-outlined">close</span> No
                  hat or glass
                </p>
              </div>
              <div className="d-flex mt-4">
                <div className="image-upload flex-fill">
                  <p className="mb-0 s-bld">Take a Selfie</p>
                  <label for="file-input">
                    <span className="material-symbols-outlined m-auto">
                      camera_front
                    </span>
                  </label>
                  <input id="file-input" type="file" />
                </div>
              </div>
              <div className="d-flex mt-4">
                <div className="d-flex progress-w align-self-center pr-lg-5 pr-3">
                  <div className="filled flex-fill"></div>
                  <div className="filled ml-2 flex-fill"></div>
                  <div className="filled ml-2 flex-fill"></div>
                </div>
                <button
                  className="btn btn-primary px-5  ml-auto"
                  onClick={() => setPage(4)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {Page === 4 && (
            <div className="wt-box mt-3 p-3">
              <div className="d-flex">
                <span
                  className="material-symbols-outlined align-self-center mb-0 mr-2"
                  style={{ fontSize: 30 }}
                >
                  verified_user
                </span>
                <h4 className="s-bld mb-0 align-self-center">
                  {" "}
                  Personal verification
                </h4>
              </div>
              <hr />
              <img src={CheckedImg} className="mx-auto d-block mb-2 mt-5" />
              <h2 className="mb-0 text-center s-bld">Thank you !</h2>
              <p className="mb-0 text-center" style={{ opacity: 0.6 }}>
                Review time : 1 day
              </p>
              <button className="btn btn-primary px-5  mx-auto d-block mt-5">
                <NavLink to={"/account"}>Go back</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYC;
