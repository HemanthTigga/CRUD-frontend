import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AddCustomer from "./Pages/AddCustomer";
import ViewCustomer from "./Pages/ViewCustomer";
import Navbar from "./Components/Navbar";
import RegisterUser from "./Pages/RegisterUser";
import LoginUser from "./Pages/LoginUser";
import PrivateRoute from "./PrivateRoute";
import Home from "./Pages/Home";

function App() {
  const location = useLocation();
  const hideNavbar = ["/registerUser", "/loginUser"];
  return (
    <>
      {/* <BrowserRouter> */}
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        
        <Route path="/addCustomer" element={
          <PrivateRoute>
          <AddCustomer />
          </PrivateRoute>
          } />
        <Route path="/viewCustomer" element={
          <PrivateRoute>
          <ViewCustomer />
          </PrivateRoute>
          } />
        <Route path="/" element={<Home/>}/>
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/loginUser" element={<LoginUser />} />

        {/* <Route path="*" element={<Navigate to="/loginUser" replace />} /> */}

      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
