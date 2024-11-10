import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Guide from "./pages/Guide";
import Search from "./pages/Search";
import { TranslationProvider } from "./contexts/TranslationContext";
import PreAlphaNotification from "./components/PreAlphaNotification";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Contribute from "./pages/Contribute";

function App() {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/docs/:category" element={<Documentation />} />
            <Route path="/guide/:slug" element={<Guide />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <PreAlphaNotification />
        <SpeedInsights />
        <Analytics />
      </div>
    </TranslationProvider>
  );
}

export default App;
