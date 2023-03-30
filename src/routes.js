import Home from "components/Home";
import { Route, Routes } from "react-router-dom";
import AboutUs from "components/AboutUs";
import ProductIntro from "components/AboutUs/ProductIntro";
import ServiceTerms from "components/AboutUs/ServiceTerms";
import AmlPolicy from "components/AboutUs/AmlPolicy";
import PrivacyPolicy from "components/AboutUs/PrivacyPolicy";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/about" Component={AboutUs}>
        <Route path="product-introduction" Component={ProductIntro} />
        <Route path="service-terms" Component={ServiceTerms} />
        <Route path="aml-policy" Component={AmlPolicy} />
        <Route path="privacy-policy" Component={PrivacyPolicy} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
