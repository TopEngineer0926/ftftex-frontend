import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../../utils";

export const PrivacyPolicyTP = () => {
  const { t } = useTranslation();

  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2 pointer">
        <h4>{t("account.terms.Privacy Policy")}</h4>
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
        <h3>1. OVERVIEW</h3>
        <p>
          FTFTex is a cryptocurrency market data and transaction information
          providing platform. Please take the time to read this Privacy Policy
          carefully. Contact our support team if you have questions about this
          Privacy Policy.{" "}
        </p>
        <h3>2. ACCEPTANCE OF THE PRIVACY POLICY</h3>
        <p>
          This Privacy Policy applies to all sites under the FTFTex domain and
          the brand. If a client does not agree or accept any of the aspects of
          this Privacy Policy, the client must not access or create an account
          on FTFTex. By accessing and using FTFTex's services, the client
          signifies acceptance of the terms of this Privacy Policy. Where FTFTex
          requires a client’s consent to process their personal information,
          FTFTex will ask for the client's consent to collect, use, and disclose
          their data.
        </p>
        <h3>3. CHANGES TO THE PRIVACY POLICY</h3>
        <p>
          FTFTex may, from time to time, amend this Privacy Policy. When the
          Privacy Policy is amended, FTFTex will modify the date listed on the
          Agreement or notify clients of changes to the Privacy Policy via email
          or using a notice on our Services prior to the amendments becoming
          effective. FTFTex's Privacy Policy is reviewed regularly to ensure
          continuous compliance with regulations, changes to business operations
          and practices are taken into consideration, and changes to
          technologies. All client information held will be governed by FTFTex's
          most recent Privacy Policy
        </p>
        <h3>4. THE PERSONAL INFORMATION WE COLLECT</h3>
        <p>
          To open an account with FTFTex, each client must initially enter their
          information to create an account with FTFTex. Once the account has
          been created, each client must disclose personal information that will
          allow FTFTex to assess the client’s eligibility and comply with the
          relevant laws and regulations. FTFTex will collect the following
          information on each client:
        </p>
        <p>
          a) Full Name <br />
          b) Email Address
          <br />
          c) Telephone Number
          <br />
          d) Proof of Identity (e.g., Passport/ID/Residency Visa)
          <br />
          e) Self Portrait Photograph of the client holding their passport on
          the picture & main page
          <br />
          f) Bank Statement and/or Salary certificate to verify the source of
          funds when required
          <br />
          g) Bank details (e.g., Bank Name, Bank Account Holder Name, IBAN,
          Swift Code, Branch Address)
          <br />
          h) Residential Address
          <br />
        </p>
        <p>
          Please note that the information listed above might not be collected
          at once. FTFTex will automatically collect the following non-personal
          information about each client:{" "}
        </p>
        <p>
          a) Location - IP address, referral website, login information, browser
          type, time zone, browser plug-in types and versions, operating system,
          and platform. <br />
          b) Log Information - This information is generated through the
          client's use of FTFTex's services. This includes device information,
          location information, system activity, and internal information
          related to pages visited on the FTFTex website, including the full
          Uniform Resource Locators (URL), date and time of visit, page response
          times, length of visit on each page, page interaction information
          (clicks, scrolling, and mouse-overs) and downloads errors. <br />
          c) FTFTex may, through third-party service providers, receive the
          following information: <br />
          d) Client basic personal information such as name, address, and bank
          account details provided by the client’s bank account or payment
          service provider.
          <br />
          e) Anonymized or DE-identified information about the client indicating
          how they found FTFTex's website from advertising, analytics, and
          search information providers. <br />
          f) Client background check information provided by identity
          verification companies to allow FTFTex to analyze the client's digital
          identity for KYC on-boarding, AML, sanctions screening, transaction
          monitoring, and fraud prevention.
          <br />
        </p>

        <h3>5. USE & DISCLOSURE OF YOUR PERSONAL INFORMATION</h3>
        <p>
          FTFTex aims to provide each client with a secure, efficient, and
          personalized experience by collecting client information. FTFTex will
          only use and disclose each client's information as follows:
        </p>
        <p>
          a) Provide each client with an efficient, secure, and more
          personalized experience by analyzing client website usage and
          associated statistics. This will aid FTFTex in further enhancing the
          website’s layout, content, and overall services.
          <br />
          b) Provide each client with relevant notices and communication
          regarding their use of FTFTex's services. <br />
          c) To execute client trades related to order fulfillment, trade
          settlement, and currency receipt and distribution.
          <br />
          d) Enforce FTFTex's Compliance and User Agreements which each client
          has agreed to be bound by either in writing or using FTFTex's services
          or otherwise outlined in this Privacy Policy. FTFTex will not use or
          sell client information to profit organizations or non-profits. FTFTex
          may disclose client information as and when required by regulators or
          by law to comply with any judicial process, court orders, subpoenas,
          or any other relevant regulatory authority. FTFTex does this to comply
          with its legal obligations, investigate fraud, and protect its clients
          and our client's interests. If FTFTex changes its products or
          services, or laws, clients might be notified of such changes. FTFTex
          might have to process a client's personal information to send such
          notifications. Clients will continue to receive such information even
          when they have opted not to receive direct marketing information from
          FTFTex.
        </p>
        <h3>6. STORAGE OF PERSONAL INFORMATION</h3>
        <p>
          FTFTex's operations are supported by a network of computers, servers,
          and other information technology infrastructure, including third-party
          service providers. By providing their information to FTFTex, a client
          consents to transfer and store their information on third-party
          servers. FTFTex may use third-party services to collect and store
          clients’ personal information.
        </p>
        <h3>7. DATA OWNER RIGHTS</h3>
        <p className="s-bld">7.1. Your legal rights</p>
        <p>
          Under the provisions of the law, you are provided with the following
          rights concerning the processing of your data. To exercise your rights
          under the law, you may be required to authenticate yourself with
          adequate proof of identity.
        </p>
        <p className="s-bld">7.2. Right to Enquire</p>
        <p>
          You have the right to request and obtain information on the personal
          data that we hold and the purpose for which it is held.
        </p>
        <p className="s-bld">7.3. Right to Object</p>
        <p>
          You have the right to object to being contacted by us for direct
          marketing purposes. On receipt of such objection, we will ensure that
          you are removed from the relevant marketing databases, as applicable.
          To opt-out of receiving direct marketing communications, please
          contact us at any time through the contact form on the website or
          directly reply to the messages or ads.
        </p>
        <p className="s-bld">
          7.4. Right to Demand Rectification, Blocking, or Erasure
        </p>
        <p>
          You may apply to a request to rectify, block, or erase your data if
          the processing thereof is done in contravention of the provisions of
          the law and if the information is incorrect, incomplete, or not
          updated, or if the processing thereof is illegal.
        </p>
        <p className="s-bld">7.5. Right to Withdraw Consent</p>
        <p>
          You have the right to withdraw the consent provided at any time after
          giving consent. Withdrawal of consent will apply to future use of
          personal data. It will not in any way impact the legitimate use of
          personal information before withdrawing the consent. Withdrawal of
          consent to process certain mandatory personal data related to services
          provided by FTFTex may result in our inability to continue providing
          those services.
        </p>
        <p className="s-bld">7.6. Right to Complain</p>
        <p>
          You may submit a complaint to the Authority if you have reason to
          believe that any violation of the provisions of this privacy law has
          occurred or that we are processing personal data in contravention of
          its provisions.
        </p>
        <h3>8. ACCOUNT CLOSURE</h3>
        <p>
          FTFTex will, upon a client's request, close their account in
          accordance with the applicable laws and regulations and in accordance
          with its User Agreement. The client must not have any outstanding
          balance on their account to ensure closure. FTFTex will retain and
          store a client's account, due diligence, personal information, and any
          other recorded information, whether electronically, by telephone, or
          otherwise, for ten years’ post-closure. This is done to abide by the
          regulations and to ensure that FTFTex can fulfill any legal
          obligations that it has to comply with related to the law, fraud
          prevention, outstanding fee collection, dispute resolution, supporting
          investigations, and other actions required by the law and to enforce
          its User Agreement.
        </p>
        <h3>9. THIRD PARTIES</h3>
        <p>
          Unless expressed otherwise in this Privacy Policy, this Policy only
          addresses the use and disclosure of client information provided to and
          collected by FTFTex. If the client discloses information to other
          parties, be it partners of FTFTex or other third parties, different
          privacy rules pertaining to the use and disclosure of information may
          apply. FTFTex does not control the privacy policies of third parties,
          and clients will be subjected to such privacy policies where
          applicable. FTFTex encourages its clients to review and familiarize
          themselves with the privacy policies of third parties.
        </p>
        <h3>10. DIRECT MARKETING</h3>
        <p>
          Subject to applicable laws and regulations, FTFTex may, from time to
          time, send its clients direct marketing materials promoting its
          products, services, or activities using information collected from
          clients. FTFTex will allow clients to opt-out of such direct
          marketing. FTFTex may, from time to time, request permission from
          clients to share their personal information with third parties.
          Clients may opt-out of having their personal information shared with
          third parties and used for any purpose other than the data originally
          collected and obtained with client authorization. If a client chooses
          to limit the use of their personal information, certain features or
          services provided by FTFTex might not be available to the client.
        </p>
        <h3>11. SECURITY</h3>
        <p>
          FTFTex follows accepted physical and electronic procedures to
          safeguard and secure clients’ personal and non-personal information.
          FTFTex uses various security measures such as encryption, firewalls,
          penetration testing, and access controls to protect clients'
          information. FTFTex's servers reside in maximum security vaults under
          24/7 surveillance. Additionally, access to information is restricted
          to authorized employees and third parties that need to know the
          information to operate, develop, and improve FTFTex's Services. No
          method of transmission over the internet or method of electronic
          storage is 100% safe, and consequently, FTFTex cannot guarantee its
          absolute security.
        </p>

        <h3>12. COOKIES AND TRACKING</h3>
        <p>
          When clients engage with and use FTFTex's products and services, tiny
          data files called cookies or other tracking tools (herein, "Cookies")
          may be placed on your computer or devices. FTFTex may use cookies to
          help identify clients, remember their preferences, better customize
          services and content, and collect information about their computer or
          access devices to ensure compliance with AML and other obligations.
          Clients can reject cookies and still use FTFTex, which may restrict
          their usage of FTFTex's platform. FTFTex's Privacy Policy does not
          cover the use of cookies by FTFTex's partners and third parties.
        </p>

        <h3>13. DISPUTES AND LEGAL PROCEEDINGS</h3>
        <p>
          FTFTex may need to use clients’ personal information to investigate
          issues and settle disputes with clients in a timely and orderly
          manner. Suppose an amicable resolution can be reached between FTFTex
          and a client. In that case, FTFTex will cooperate with the regulator
          and other relevant authorities to resolve issues related to the use or
          disclosure of client information. Any dispute or claim arising out of
          or relating to FTFTex's Privacy Policy shall be settled according to
          the terms of the User Agreement.
        </p>

        <h3>14. PRIVACY WHEN USING DIGITAL ASSETS</h3>
        <p>
          Digital Assets offered by FTFTex will be recorded on a public
          blockchain and are not anonymous. Public blockchains are distributed
          ledgers intended to immutably record transactions across vast networks
          of computer systems. Because blockchains are decentralized networks,
          FTFTex cannot erase, modify, or alter personal data from such
          networks. Through the utilization of third-party forensic and
          analytical software, others might be able to see the transaction
          history of any digital asset and collect and use clients’ non-personal
          information.
        </p>
        <h3>15. CONTACT US</h3>

        <p>
          If you have any questions, concerns, or comments about our Privacy
          Policy, you can get in touch by filling out our Form. Please be aware
          that any unsolicited information or communications you send will not
          be considered confidential or proprietary. We will not have any
          obligations concerning such under this Privacy Policy.
        </p>
      </div>
      <button className="btn btn-primary px-5 d-block mt-5 back-btn">
        <NavLink to={"/account/terms-policies"}>{t("Back")}</NavLink>
      </button>
    </div>
  );
};
