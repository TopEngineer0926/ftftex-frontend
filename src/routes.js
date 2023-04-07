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
        <Route path="post/:id" Component={Post} />
        <Route path="profile" Component={Profile} />
      </Route>
      <Route path="news" Component={News} />
      <Route path="coins" Component={CoinAll} />
      <Route path="coin/:id/:slug" Component={SingleCoin} />
      <Route path="exchanges" Component={Exchanges} />
      <Route path="exchange/:id/:slug" Component={SingleExchange} />
      <Route path="trade" Component={TradingPortal} />
      <Route path="trade/:symbol" Component={TradingPortal} />
    </Routes>
  );
};

export default RoutesComponent;
