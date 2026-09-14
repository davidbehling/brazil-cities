import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import type { City, State } from "../../types";

function CityIndex() {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [citiesData, statesData] = await Promise.all([
        api.get<City[]>("/api/v1/cities"),
        api.get<State[]>("/api/v1/states"),
      ]);

      setCities(citiesData);
      setStates(statesData);
    } catch {
      setError("Unable to load cities.");
    } finally {
      setLoading(false);
    }
  }

  function getStateName(stateId: number) {
    return states.find((state) => state.id === stateId)?.name ?? "-";
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this city?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/api/v1/cities/${id}`);

      setCities((currentCities) =>
        currentCities.filter((city) => city.id !== id)
      );
    } catch {
      setError("Unable to delete city.");
    }
  }

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="card w-50 mx-auto mt-5">
      <div className="card-header">
        <h1>Cities</h1>

        <div className="d-flex justify-content-end">
          <Link
            to="/cities/search"
            className="btn btn-secondary me-3"
          >
            Search Cities
          </Link>

          <Link to="/cities/new" className="btn btn-primary">
            New City
          </Link>
        </div>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Population</th>
              <th>State</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cities.map((city) => (
              <tr key={city.id}>
                <td>{city.name}</td>

                <td>
                  {city.population.toLocaleString("pt-BR")}
                </td>

                <td>{getStateName(city.state_id)}</td>

                <td>
                  <Link
                    to={`/cities/${city.id}`}
                    className="btn btn-secondary"
                  >
                    Show
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/cities/${city.id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(city.id)}
                    className="btn btn-danger"
                  >
                    Destroy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CityIndex;
