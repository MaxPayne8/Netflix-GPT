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
        path: "/browse/:movId",
        element: <MoreInfo />,
      },
      {
        path: "/browse/gptsearch",
        element: <GptSearchPage />,
      },
    ],
  },
]);

export default App;
