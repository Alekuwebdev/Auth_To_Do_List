import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IntroPage from "./pages/IntroPage";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path="/intropage"
            element={<IntroPage />}
          />
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to='/intropage'/>}
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/"/>}
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/"/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
