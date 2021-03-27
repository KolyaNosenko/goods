import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import NotFound from "./pages/NotFound";
import NewItem from "./pages/NewItem";
import { useInitializeApp } from "./App.hooks";
import Spinner from "./components/Spinner";
import AdminRoute from "./components/AdminRoute";
import Header from "./components/Header";
import styled from "styled-components";
import { NotificationProvider } from "./context/NotificationContext";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppLoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const AppLoader = styled(Spinner)`
  width: 70px;
  height: 70px;
  border-width: 5px;
`;

function App() {
  const { isAppInitialized, appStore } = useInitializeApp();

  // TODO add normal loader
  if (!isAppInitialized || !appStore)
    return (
      <AppContainer>
        <AppLoaderWrapper>
          <AppLoader />
        </AppLoaderWrapper>
      </AppContainer>
    );

  return (
    <AppContainer>
      <NotificationProvider>
        <Provider store={appStore}>
          <HashRouter>
            <Header />
            {/*TODO add lazy load*/}
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <AdminRoute path="/edit/:id">
                <EditItem />
              </AdminRoute>
              <AdminRoute path="/new">
                <NewItem />
              </AdminRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </HashRouter>
        </Provider>
      </NotificationProvider>
    </AppContainer>
  );
}

export default App;
