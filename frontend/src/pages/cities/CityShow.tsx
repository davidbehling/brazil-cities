import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";
import type { City, State } from "../../types";

function CityShow() {
  const { id } = useParams();

  const [city, setCity] = useState<City | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    if (!id) {
      return;
    }

    try {
      const cityData = await api.get<City>(`/api/v1/cities/${id}`);

      const stateData = await api.get<State>(
        `/api/v1/states/${cityData.state_id}`
      );

      setCity(cityData);
      setState(stateData);
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

  if (!city || !state) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="card w-25 mx-auto mt-5">
      <div className="card-body">
        <p>
          <strong>Name:</strong> {city.name}
        </p>

        <p>
          <strong>Population:</strong>{" "}
          {city.population.toLocaleString("pt-BR")}
        </p>

        <p>
          <strong>State:</strong> {state.name}
        </p>
      </div>

      <div className="card-footer d-flex justify-content-end">
        <Link to="/cities" className="btn btn-secondary me-3">
          Back
        </Link>

        <Link
          to={`/cities/${city.id}/edit`}
          className="btn btn-warning"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default CityShow;
