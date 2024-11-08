import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Guide from "./pages/Guide";
import Search from "./pages/Search";
import { TranslationProvider } from "./contexts/TranslationContext";
import PreAlphaNotification from "./components/PreAlphaNotification";

function App() {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs/:category?" element={<Documentation />} />
            <Route path="/guide/:slug?" element={<Guide />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <PreAlphaNotification />
      </div>
    </TranslationProvider>
  );
}

export default App;
