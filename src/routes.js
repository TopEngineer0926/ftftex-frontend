import Home from "components/Home";
import { Route, Routes } from "react-router-dom";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" component={Home} />
      {/* <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} /> */}
    </Routes>
  );
};

export default RoutesComponent;
