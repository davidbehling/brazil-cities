import { useLocation, useNavigate } from "react-router-dom";
import type { City } from "../../types";

interface LocationState {
  cities: City[];
}

function SearchCitiesResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const cities = state?.cities ?? [];

  return (
    <div className="card w-25 mx-auto mt-5">
      <div className="card-body">
        {cities.length > 0 ? (
          cities.map((city) => (
            <div key={city.id}>
              <p>
                <strong>Name:</strong>
                {" "}
                {city.name}
              </p>

              <p>
                <strong>Population:</strong>
                {" "}
                {city.population.toLocaleString("pt-BR")}
              </p>

              <p>
                <strong>State:</strong>
                {" "}
                {city.state?.name ?? city.state_id}
              </p>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>

      <div className="card-footer d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-3"
          onClick={() => navigate("/cities/search")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SearchCitiesResults;