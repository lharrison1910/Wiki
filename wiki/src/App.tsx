import "./App.css";

import { Routes, Route } from "react-router";
import Cookies from "js-cookie";

import Homepage from "./pages/homepage/Homepage";
import Errorpage from "./pages/error/Error";
import Navbar from "./components/navbar/Navbar";
import Settings from "./pages/settings/Settings";

function App() {
  if (Cookies.get("display") === undefined) {
    Cookies.set("display", "list");
  }

  return (
    <>
      <div className="top-0 mb-2">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}

export default App;
