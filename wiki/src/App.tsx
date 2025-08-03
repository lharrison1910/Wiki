import "./App.css";

import { Routes, Route } from "react-router";
import Homepage from "./pages/homepage/Homepage";
import Errorpage from "./pages/error/Error";
import Settings from "./pages/settings/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}

export default App;
