import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CityForm from "../../components/CityForm";
import api from "../../services/api";
import type { City } from "../../types";

import translations from "../../i18n";

const t = translations;

function CityEdit() {
  const { id } = useParams();

  const [city, setCity] = useState<City | null>(null);
  const [error, setError] = useState("");
  const t_edit =`${t.edit} ${t.city}`;

  useEffect(() => {
    loadCity();
  }, [id]);

  async function loadCity() {
    if (!id) {
      return;
    }

    try {
      const data = await api.get<City>(`/api/v1/cities/${id}`);

      setCity(data);
    } catch {
      setError("Unable to load city.");
    }
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 mx-auto w-50">
        {error}
      </div>
    );
  }

  if (!city) {
    return <div className="container mt-5">Loading...</div>;
  }

  return <CityForm city={city} title={t_edit} />;
}

export default CityEdit;
