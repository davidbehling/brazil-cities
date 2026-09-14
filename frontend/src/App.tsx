import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import StateIndex from "./pages/states/StateIndex";
import StateNew from "./pages/states/StateNew";
import StateEdit from "./pages/states/StateEdit";
import StateShow from "./pages/states/StateShow";

import CityIndex from "./pages/cities/CityIndex";
import CityNew from "./pages/cities/CityNew";
import CityEdit from "./pages/cities/CityEdit";
import CityShow from "./pages/cities/CityShow";

import SearchCities from "./pages/cities/SearchCities";
import SearchCitiesResults from "./pages/cities/SearchCitiesResults";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/states" element={<StateIndex />} />
        <Route path="/states/new" element={<StateNew />} />
        <Route path="/states/:id" element={<StateShow />} />
        <Route path="/states/:id/edit" element={<StateEdit />} />

        <Route path="/cities" element={<CityIndex />} />
        <Route path="/cities/new" element={<CityNew />} />
        <Route path="/cities/:id" element={<CityShow />} />
        <Route path="/cities/:id/edit" element={<CityEdit />} />

        <Route
          path="/cities/search"
          element={<SearchCities />}
        />

        <Route
          path="/cities/search/results"
          element={<SearchCitiesResults />}
        />

        <Route
          path="/"
          element={<Navigate to="/states" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
