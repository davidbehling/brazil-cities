import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import type { State } from "../../types";

function StateIndex() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStates();
  }, []);

  async function loadStates() {
    try {
      const data = await api.get<State[]>("/api/v1/states");
      setStates(data);
    } catch {
      setError("Unable to load states.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this state?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/api/v1/states/${id}`);

      setStates((currentStates) =>
        currentStates.filter((state) => state.id !== id)
      );
    } catch {
      setError("Unable to delete state.");
    }
  }

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="card w-50 mx-auto mt-5">
      <div className="card-header">
        <h1>States</h1>

        <div className="d-flex justify-content-end">
          <Link to="/states/new" className="btn btn-primary">
            New State
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
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {states.map((state) => (
              <tr key={state.id}>
                <td>{state.name}</td>

                <td>
                  {state.population.toLocaleString("pt-BR")}
                </td>

                <td>
                  <Link
                    to={`/states/${state.id}`}
                    className="btn btn-secondary"
                  >
                    Show
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/states/${state.id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(state.id)}
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

export default StateIndex;
