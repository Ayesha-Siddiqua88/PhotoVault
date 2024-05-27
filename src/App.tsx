import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home" 
import Signup from "./pages/Signup"
import {AuthProvider} from "./context/auth"
import PublicRoute from "./routes/PublicRoute"
import PrivateRoute from "./routes/PrivateRoute"
import ViewImage from "./components/viewImage"
import Analytics from "./components/Analytics"
import Footer from "./components/Footer"

function App() {

  const location = useLocation();
  return (
    <AuthProvider>
    <div>
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }/>
      <Route path="/signup" element={
        <PublicRoute>
          <Signup/>
        </PublicRoute>
      }/>
      <Route path="/view" element={
        <PrivateRoute>
          <ViewImage/>
        </PrivateRoute>
      }/>
      <Route path="/analytics" element={
        <PrivateRoute>
          <Analytics/>
        </PrivateRoute>
      }/>
    </Routes>
    {location.pathname !== "/analytics" && <Footer />}
    </div>
    </AuthProvider>
  )
}

export default App
