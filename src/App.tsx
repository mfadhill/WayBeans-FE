import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Fragment } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import router from "./router";
const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <RouterProvider router={createBrowserRouter(router)} />
    </Fragment>
  )
}

export default App;