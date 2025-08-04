import "./App.css";

import { Routes, Route } from "react-router";
import Homepage from "./pages/homepage/Homepage";
import Errorpage from "./pages/error/Error";
import Settings from "./pages/settings/Settings";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}

export default App;
