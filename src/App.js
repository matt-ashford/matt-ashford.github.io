import "./App.css";

import myTheme from "./Design/MyTheme";

import AllMarketDominant from "./mailClassComponents/allMarketDominant/AllMarketDominant";

import { HomePage } from "./mailClassComponents/HomePage/HomePage";
import { ProductPage } from "./mailClassComponents/ProductPage/ProductPage";
import { MailClassPage } from "./mailClassComponents/MailClassPage/MailClassPage";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Drawer02 from "./Drawer/Drawer02";

function App() {
  return (
    <>
      <BrowserRouter>
        <Drawer02 />
        <Switch>
          <Route
            exact
            from="/home"
            render={(props) => <HomePage {...props} />}
          />

          <Route
            exact
            from="/all-md"
            render={(props) => <AllMarketDominant {...props} />}
          />

          <Route
            exact
            path="/first-class"
            render={() => <MailClassPage mailClassName="First Class Mail" />}
          />
          <Route
            exact
            path="/marketing-mail"
            render={() => <MailClassPage mailClassName="Marketing Mail" />}
          />
          <Route
            exact
            path="/periodicals"
            render={() => <MailClassPage mailClassName="Periodicals" />}
          />
          <Route
            exact
            path="/package-services"
            render={() => <MailClassPage mailClassName="Package Services" />}
          />
          <Route
            exact
            path="/special-services"
            render={() => <MailClassPage mailClassName="Special Services" />}
          />
          <Route
            exact
            path="/product"
            render={(props) => <ProductPage {...props} />}
          />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
