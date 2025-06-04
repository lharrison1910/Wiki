import "./App.css";

import { Routes, Route } from "react-router";
import Cookies from "js-cookie";

import Homepage from "./pages/homepage/Homepage";
import Errorpage from "./pages/error/Error";
import Navbar from "./components/navbar/Navbar";
import Settings from "./pages/settings/Settings";
import { useState } from "react";
import { DataProvider } from "./context/dataContext";

function App() {
  const [display, setDisplay] = useState<string | undefined>(
    Cookies.get("display")
  );

  function updateDisplay(updated: string) {
    setDisplay(updated);
    if (display !== undefined) {
      Cookies.set("display", display);
    }
  }

  return (
    <DataProvider>
      <>
        <div className="top-0 mb-2">
          <Navbar updateDisplay={updateDisplay} />
        </div>

        <Routes>
          <Route path="/" element={<Homepage display={display} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </>
    </DataProvider>
  );
}

export default App;
