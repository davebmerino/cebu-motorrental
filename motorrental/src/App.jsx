// App.jsx - Refactored version
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

// Layout components
import Navbar from "./sections/Navbar";
import SideBar from "./sections/SideBar";
import Footer from "./sections/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

// User pages
import Home from "./pages/Home";
import MotorCycles from "./pages/MotorCycles";
import MotorDetails from "./pages/MotorDetails";
import MyBooking from "./pages/MyBooking";
// import NotFound from "./pages/NotFound";

// Owner pages
import OwnerDashboard from "./pages/owner/OwnerDashBoard";
import ManageMotor from "./pages/owner/ManageMotor";
import AddMotor from "./pages/owner/AddMotor";
import ManageBooking from "./pages/owner/ManageBooking";

// Components
import LogIn from "./components/LogIn";
import ScrollFadeIn from "./components/ScrollFadeIn";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { showLogin, user } = useAppContext();

  const OwnerLayout = ({ children }) => (
    <>
      <SideBar />
      <div className="mx-auto">{children}</div>
      <ScrollToTopButton />
    </>
  );

  // Create a layout component for user pages
  const UserLayout = ({ children }) => (
    <>
      <Navbar />
      <div className="mx-auto">{children}</div>
      <ScrollFadeIn>
        <Footer />
      </ScrollFadeIn>

      <ScrollToTopButton />
    </>
  );

  return (
    <>
      <ScrollToTop />
      <Toaster />
      {showLogin && <LogIn />}

      {user?.role === "owner" ? (
        <OwnerLayout>
          <Routes>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/owner/addmotorcycle" element={<AddMotor />} />
            <Route path="/owner/managemotorcycle" element={<ManageMotor />} />
            <Route path="/owner/managebookings" element={<ManageBooking />} />
            <Route path="*" element={<Navigate to="/owner" />} />
          </Routes>
        </OwnerLayout>
      ) : (
        <UserLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motorcycles" element={<MotorCycles />} />
            <Route path="/motorcycle-details/:_id" element={<MotorDetails />} />
            <Route path="/mybookings" element={<MyBooking />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </UserLayout>
      )}
    </>
  );
}

export default App;
