import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PokemonPage from "./PokemonPage";

function App() {
  return (
    <div>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
