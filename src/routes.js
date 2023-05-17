import Home from "components/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "components/AboutUs";
import ProductIntro from "components/AboutUs/ProductIntro";
import ServiceTerms from "components/AboutUs/ServiceTerms";
import AmlPolicy from "components/AboutUs/AmlPolicy";
import PrivacyPolicy from "components/AboutUs/PrivacyPolicy";
import Community from "components/Community";
import Feed from "components/Community/Feed";
import Notifications from "components/Community/Notifications";
import Post from "components/Community/Post";
import Profile from "components/Community/Profile";
import News from "components/News";
import CoinAll from "components/CoinAll";
import SingleCoin from "components/SingleCoin";
import SingleExchange from "components/Exchanges/SingleExchange";
import Exchanges from "components/Exchanges";
import TradingPortal from "components/TradingPortal";
import Wallet from "components/Wallet";
import WalletAccount from "components/Wallet/WalletAccount";
import WalletMain from "components/Wallet/WalletMain";
import PurchaseCrypto from "components/Wallet/PurchaseCrypto";
import Login from "components/Login";
import Register from "components/Login/Register";
import ForgotPassword from "components/ForgotPassword";
import SetPassword from "components/SetPassword";
import KYC from "components/Account/KYC";
import WalletAsset from "components/Account/WalletAsset";
import Deposite from "components/Account/Deposite";
import AccountSettings from "components/Account/AccountSettings";
import SettingsAccount from "components/Account/SettingsAccount";
import CommunitySettings from "components/Account/CommunitySettings";
import Security from "components/Account/Security";
import Privacy from "components/Account/Privacy";
import Environment from "components/Account/Environment";
import Support from "components/Account/Support";
import TermsPolicies from "components/Account/TermsPolicies";
import PaymentGateway from "components/Wallet/PaymentGateway";
import OKX from "components/Wallet/OKX";
import Huobi from "components/Wallet/Huobi";
import XT from "components/Wallet/XT";
import WalletDetails from "components/WalletDetails";
import FundingAccount from "components/WalletDetails/FundingAccount";
import TradingAccount from "components/WalletDetails/TradingAccount";
import TradeHistory from "components/WalletDetails/TradeHistory";
import TransactionHistory from "components/TransactionHistory";
import BuyCrypto from "components/Account/BuyCrypto";
import { AboutUsSupport } from "components/Account/Support/AboutUsSupport";
import { ContactUs } from "components/Account/Support/ContactUs";
import { AmlPolicyTP } from "components/Account/TermsPolicies/AmlPolicyTP";
import { PrivacyPolicyTP } from "components/Account/TermsPolicies/PrivacyPolicyTP";
import { TermsOfService } from "components/Account/TermsPolicies/TermsOfService";
import { PostDetails } from "./components/Community/PostDetails";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={AboutUs}>
        <Route path="product-introduction" Component={ProductIntro} />
        <Route path="service-terms" Component={ServiceTerms} />
        <Route path="aml-policy" Component={AmlPolicy} />
        <Route path="privacy-policy" Component={PrivacyPolicy} />
      </Route>
      <Route path="/community" Component={Community}>
        <Route path="" element={<Navigate to="/community/feed" replace />} />
        <Route path="feed" Component={Feed} />
        <Route path="notifications" Component={Notifications} />
        <Route path="post/:id" Component={PostDetails} />
        <Route path="profile" Component={Profile} />
      </Route>
      <Route path="news" Component={News} />
      <Route path="coins" Component={CoinAll} />
      <Route path="coin/:id/:slug" Component={SingleCoin} />
      <Route path="exchanges" Component={Exchanges} />
      <Route path="exchange/:id/:slug" Component={SingleExchange} />
      <Route path="trade" Component={TradingPortal} />
      <Route path="trade/:symbol" Component={TradingPortal} />
      <Route path="trade/:symbol/:type" Component={TradingPortal} />
      <Route path="wallet" Component={Wallet}>
        <Route path="" element={<Navigate to="/wallet/main" replace />} />
        <Route path="main" Component={WalletMain} />
        <Route path="purchase-crypto" Component={PurchaseCrypto} />
        <Route path="payment-gateway" Component={PaymentGateway} />
        <Route path="okx" Component={OKX} />
        <Route path="huobi" Component={Huobi} />
        <Route path="xt" Component={XT} />
      </Route>
      <Route path="buy-crypto" Component={BuyCrypto} />
      <Route path="wallet/details" Component={WalletDetails}>
        <Route path="funding-account/:type" Component={FundingAccount} />
        <Route path="trading-account/:type" Component={TradingAccount} />
        <Route path="trade-history/:type" Component={TradeHistory} />
        <Route
          path="transaction-history/:type"
          Component={TransactionHistory}
        />
      </Route>
      <Route path="wallet/account" Component={WalletAccount} />
      <Route path="login" Component={Login} />
      <Route path="register" Component={Register} />
      <Route path="forgot-password" Component={ForgotPassword} />
      <Route path="set-password/:userId" Component={SetPassword} />
      <Route path="/account" Component={AccountSettings}>
        <Route path="settings" Component={SettingsAccount} />
        <Route path="transaction-history" Component={TransactionHistory} />
        <Route path="community-settings" Component={CommunitySettings} />
        <Route path="security" Component={Security} />
        <Route path="privacy" Component={Privacy} />
        <Route path="environment" Component={Environment} />
        <Route path="support" Component={Support} />
        <Route path="support/about-us" Component={AboutUsSupport} />
        <Route path="support/contact-us" Component={ContactUs} />
        <Route path="terms-policies" Component={TermsPolicies} />
        <Route path="terms-policies/aml-policy" Component={AmlPolicyTP} />
        <Route
          path="terms-policies/privacy-policy"
          Component={PrivacyPolicyTP}
        />
        <Route path="terms-policies/terms-service" Component={TermsOfService} />
      </Route>
      <Route path="account/verification" Component={KYC} />
      <Route path="spot-wallet" Component={WalletAsset} />
      <Route path="spot-wallet/deposit" Component={Deposite} />
      <Route path="spot-wallet/buy" Component={PurchaseCrypto} />
    </Routes>
  );
};

export default RoutesComponent;
