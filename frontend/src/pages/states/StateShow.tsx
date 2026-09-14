import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";
import type { State } from "../../types";

function StateShow() {
  const { id } = useParams();
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    loadState();
  }, [id]);

  async function loadState() {
    if (!id) {
      return;
    }

    const data = await api.get<State>(`/api/v1/states/${id}`);
    setState(data);
  }

  if (!state) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="card w-25 mx-auto mt-5">
      <div className="card-body">
        <p>
          <strong>Name:</strong> {state.name}
        </p>

        <p>
          <strong>Population:</strong>{" "}
          {state.population.toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="card-footer d-flex justify-content-end">
        <Link to="/states" className="btn btn-secondary me-3">
          Back
        </Link>

        <Link
          to={`/states/${state.id}/edit`}
          className="btn btn-warning"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default StateShow;