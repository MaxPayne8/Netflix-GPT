import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import MoreInfo from "./components/MoreInfo";
import GptSearchPage from "./components/GptSearchPage";
import MoreInfoTwin from "./components/MoreInfoTwin";
import MoreInfoTv from "./components/MoreInfoTv";
import MoreInfoTvTwin from "./components/MoreInfoTvTwin";
import Results from "./components/Results";

function App() {
  return (
    <Provider store={appStore}>
      <Header />
      <Outlet />
    </Provider>
  );
}

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/browse/moreinfo/:movId",
        element: <MoreInfo />,
      },
      {
        path: "/browse/gptsearch",
        element: <GptSearchPage />,
      },
      {
        path: "/browse/moreinfotwin/:movId",
        element: <MoreInfoTwin />,
      },
      {
        path: "/browse/moreinfotv/:movId",
        element: <MoreInfoTv />,
      },
      {
        path: "/browse/moreinfotvtwin/:movId",
        element: <MoreInfoTvTwin />,
      },
      {
        path: "/browse/results",
        element: <Results />,
      },
    ],
  },
]);

export default App;
