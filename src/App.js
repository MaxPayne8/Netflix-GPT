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

import MoreInfoTv from "./components/MoreInfoTv";

import Results from "./components/Results";
import ActorDetails from "./components/ActorDetails";

function App() {
  return (
    <Provider store={appStore}>
      <div className="font-signature">
        <Header />
        <Outlet />
      </div>
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
        path: "/browse/moreinfotv/:movId",
        element: <MoreInfoTv />,
      },

      {
        path: "/browse/results",
        element: <Results />,
      },
      {
        path: "/browse/actor/:actorId",
        element: <ActorDetails />,
      },
    ],
  },
]);

export default App;
