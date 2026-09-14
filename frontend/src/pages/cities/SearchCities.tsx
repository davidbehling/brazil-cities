import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface SearchFormData {
  name: string;
  state_name: string;
}

function SearchCities() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SearchFormData>({
    name: "",
    state_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/api/v2/search_cities",
        {
          search_cities: formData,
        }
      );

      navigate("/cities/search/results", {
        state: {
          cities: response,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Unable to search cities.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card w-25 mx-auto mt-5">
      <div className="card-header">
        <h1>Search Cities</h1>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="state_name" className="mt-2">
            State
          </label>

          <input
            id="state_name"
            name="state_name"
            type="text"
            className="form-control"
            value={formData.state_name}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-around mt-4">
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => navigate("/cities")}
            >
              Back
            </button>

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchCities;