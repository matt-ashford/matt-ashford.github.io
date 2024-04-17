import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";

import myTheme from "./Design/MyTheme";

// import { AllMarketDominant } from "./mailClassComponents/AllMarketDominant";

// import { AllMarketDominant } from "./mailClassComponents/allMarketDominant";
import AllMarketDominant from "./mailClassComponents/allMarketDominant/AllMarketDominant";

import { HomePage } from "./mailClassComponents/HomePage";
import { ProductPage } from "./mailClassComponents/ProductPage/ProductPage";
import { MailClassPage } from "./mailClassComponents/MailClassPage/MailClassPage";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Drawer02 from "./Drawer/Drawer02";

function App() {
  return (
    <>
      <BrowserRouter>
        <Drawer02 />
        {/* <Drawer /> */}
        <ThemeProvider theme={myTheme}>
          {/* <div className="App"> */}
          <Switch>
            <Route
              exact
              from="/dash-deploy"
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
          </Switch>
          {/* </div> */}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
