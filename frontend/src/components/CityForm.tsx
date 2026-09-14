import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import type { City, CityFormData, State } from "../types";

interface CityFormProps {
  city?: City;
  title: string;
}

function CityForm({ city, title }: CityFormProps) {
  const navigate = useNavigate();

  const [states, setStates] = useState<State[]>([]);

  const [formData, setFormData] = useState<CityFormData>({
    name: city?.name ?? "",
    population: city?.population ?? 0,
    state_id: city?.state_id ?? 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);

  const isEditing = Boolean(city);

  useEffect(() => {
    loadStates();
  }, []);

  async function loadStates() {
    try {
      const data = await api.get<State[]>("/api/v1/states");

      setStates(data);
    } catch {
      setErrors(["Unable to load states."]);
    } finally {
      setLoadingStates(false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "population" || name === "state_id"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaving(true);
    setErrors([]);

    try {
      const payload = {
        city: formData,
      };

      if (isEditing) {
        await api.patch(`/api/v1/cities/${city?.id}`, payload);
      } else {
        await api.post("/api/v1/cities", payload);
      }

      navigate("/cities");
    } catch {
      setErrors(["Unable to save city."]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card w-25 mx-auto mt-5">
      <div className="card-header">
        <h1>{title}</h1>
      </div>

      <div className="card-body">
        {errors.length > 0 && (
          <div id="error_explanation" className="alert alert-danger">
            <h2>
              {errors.length} error(s) prohibited this city from being saved:
            </h2>

            <ul>
              {errors.map((error, index) => (
                <li key={`${error}-${index}`}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field mb-3">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="field mb-3">
            <label htmlFor="population">Population</label>

            <input
              id="population"
              name="population"
              type="number"
              value={formData.population}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="field">
            <label htmlFor="state_id">State</label>

            <select
              id="state_id"
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              className="form-control"
              disabled={loadingStates}
            >
              <option value={0}>Select a state</option>

              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="actions d-flex justify-content-end mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={saving || loadingStates}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <div className="card-footer d-flex justify-content-start">
        <Link to="/cities" className="btn btn-secondary">
          Back
        </Link>
      </div>
    </div>
  );
}

export default CityForm;
