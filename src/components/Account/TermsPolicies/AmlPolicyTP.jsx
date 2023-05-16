import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../../utils";

export const AmlPolicyTP = () => {
  const { t } = useTranslation();

  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2 pointer">
        <h4>{t("account.terms.Anti Money Laundering (AML)")}</h4>
        <Divider />
      </div>
      <div
        className="mt-3"
        style={{
          color: `${getTheme() === "dark" ? "#F5F5F5FF" : "#585B5D"}`,
          overflow: "auto",
          height: "600px",
        }}
      >
        <h3>1.PURPOSE</h3>
        <p>
          FTFTex is a cryptocurrency market data and transaction information
          platform, known as the "Company" has drafted and implemented this
          policy and any associated procedures (collectively known as "AML
          Policy") to avert any instances of Money Laundering (ML) and Terrorist
          Financing (TF) while operating its business. The policy is implemented
          with the board of directors’ approval (collectively known as the
          “Board”). It binds all employees, directors, and shareholders
          (collectively known as “representatives”).
        </p>
        <h3>2.POLICY STATEMENT</h3>
        <p>
          The company's policy prohibits and actively prevents money laundering
          and any activity that facilitates money laundering or the funding of
          terrorist or criminal activities. The company mandates all its
          representatives to comply with its AML policy while being engaged in
          performing operations irrespective of its operating jurisdictions.
        </p>

        <h3>3. AML POLICY PROGRAMME</h3>
        <p>
          The AML policy program of the company comprises key measures that
          ensure compliance with regulatory directives. These measures are:
          <br />
          AML Policy - Develop, document, and implement the company’s AML policy
          and procedures, reviewed and approved by the company’s board on an
          annual basis at the minimum. Compliance Officer - The company shall
          appoint a Compliance Officer responsible for coordinating and
          overseeing the AML compliance program on a day-to-day basis. Customer
          Acceptance - The company has documented a detailed procedure to
          control the eligible applicants’ acceptance as its customers. These
          procedures observe globally recognized best practices.
          <br />
          Transaction Oversight - Develop, document, and implement written
          procedures to prevent, detect, and report suspicious transactions
          internally and externally as mandated under the AML policy.
          <br />
          Training - Providing AML training periodically to all the relevant
          employees.
          <br />
          Independent Review - The company shall appoint a competent, separate
          entity to conduct an AML Policy program’s annual assessment.
          <br />
        </p>

        <h3>4. RISK-BASED APPROACH</h3>
        <p>
          The company shall implement a risk-based approach to identify, assess
          and understand the (ML/TF) risks to which it is exposed and take the
          necessary AML and Counter Financing of Terrorism (CFT) control
          measures to mitigate them. During this, the company shall assess,
          identify and understand the ML and TF risks concerning its customers,
          their respective geographies, operating jurisdictions, products,
          services, transactions, and distribution channels (collectively
          referred to as "Operations")
        </p>

        <h3>5. COMPLIANCE OFFICER & MLRO</h3>
        <p>
          The company shall appoint a compliance Officer & Money Laundering
          Reporting Officer (MLRO) to oversee the implementation of its AML
          Policy program. The incumbent shall be a member of the company’s
          senior management and report to the company's board. Among others, his
          responsibilities shall include being the single point of contact for
          matters related to AML, regulatory filings, reporting relevant
          transactions, and ensuring compliance with applicable laws. The roles
          of Compliance Officer & MLRO may be assigned to a single individual
          subject to regulatory approval and in proportion to the company’s
          operations’ volume and complexities.
        </p>

        <h3>6.CUSTOMER ACCEPTANCE</h3>
        <p>
          The company shall accept applicants as its customers only after
          completing its due diligence. For on-boarding of natural persons, the
          company shall obtain and record the below-mentioned information and
          verify the same against pertinent valid documents (including but not
          limited to Passport, Residency Visa, Bank Statement, Utility Bill,
          etc.) submitted by the applicant as required by the company's
          procedures.
          <br />
          Full legal name and any other names used;
          <br />
          Full permanent address (i.e., the residential address of the customer;
          a post office box is insufficient);
          <br />
          Date and place of birth;
          <br />
          Nationality;
          <br />
          Passport number (if the customer is a passport holder);
          <br />
          Country ID number (for residents of particular countries);
          <br />
          Telephone/ and email address (where applicable);
          <br />
          Occupation or public position held (where applicable);
          <br />
          Employer’s name and address (if self-employed, the nature of the
          self-employment);
          <br />
          Type of account, and nature and volume of anticipated business
          <br />
          Past, current, and prospective dealings with the company;
          <br />
          Signature of the customer(s);
          <br />
          Source of funds; <br />
          Source of Securities.
          <br />
          For on-boarding of legal persons, the company shall implement
          procedures to obtain and record:
          <br />
          The entity’s full name and other trading names used;
          <br />
          Registration number (or equivalent);
          <br />
          Legal form status;
          <br />
          Registered address and the trading address (including a branch where
          applicable);
          <br />
          Objectives and type of business activity;
          <br />
          Date and place of incorporation or establishment;
          <br />
          Telephone, fax number, and email address;
          <br />
          Regulatory body or listing body (for regulated activities such as
          financial services and listed companies);
          <br />
          Name of external auditor (where applicable);
          <br />
          Type of account, and nature and volume of anticipated business
          dealings with the company;
          <br />
          Source of funds
          <br />
          Information records shall also be verified against appropriate
          documentation, including but not limited to Trade License, Certificate
          of Incorporation, MOA & AOA, Board Resolution, Passport of each major
          shareholder, and authorized representative to the account. The company
          shall conduct enhanced due diligence for relevant applicants that it
          may deem necessary according to its internal procedures or comply with
          the regulatory requirements. The company shall maintain all records on
          the on-boarding of a customer and his respective transactions for not
          less than ten years from the date of termination of the relationship.
        </p>

        <h3>7.TRANSACTION OVERSIGHT</h3>
        <p>
          The company mandates its MLRO to maintain oversight over its
          customers’ transactions and document inconsistencies observed (if any)
          against the customers’ expected behavior. MLRO shall also review all
          internal reports filed by the company’s employees or alerts generated
          by the company’s automated systems to investigate any unusual customer
          activity patterns.
        </p>
      </div>
      <button className="btn btn-primary px-5 d-block mt-5 back-btn">
        <NavLink to={"/account/terms-policies"}>{t("Back")}</NavLink>
      </button>
    </div>
  );
};
