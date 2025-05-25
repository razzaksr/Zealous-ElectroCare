import { BrowserRouter, Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Header } from "./Components/Header";
import Footer from "./Components/Footer";
import { Service } from "./pages/Service";
import { NewBooking } from "./pages/NewBooking";
import { Home } from "./pages/Home";
import { ViewBookings } from "./pages/ViewBookings";
import { Signup } from "./pages/Signup";
import { ErrorPage } from "./pages/ErrorPage";
import { Login } from "./pages/Login";


const App = () => {
  return(
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Service/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/" element={<Landing/>} /> */}
          <Route path="/error/:error" element={<ErrorPage/>} />
          {(localStorage.getItem("logged"))?<>
            <Route path="/book/:service" element={<NewBooking/>} />
            <Route path="/bookings" element={<ViewBookings/>} />
          </>:
          <></>
          }
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;