import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import type { State, StateFormData } from "../types";

import translations from "../i18n";

const t = translations;

interface StateFormProps {
  state?: State;
  title: string;
}

function StateForm({ state, title }: StateFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StateFormData>({
    name: state?.name ?? "",
    population: state?.population ?? 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(state);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "population" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaving(true);
    setErrors([]);

    try {
      const payload = {
        state: formData,
      };

      if (isEditing) {
        await api.patch(`/api/v1/states/${state?.id}`, payload);
      } else {
        await api.post("/api/v1/states", payload);
      }

      navigate("/states");
    } catch {
      setErrors(["Unable to save state."]);
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
            <h2>{errors.length} error(s) prohibited this state from being saved:</h2>

            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field mb-3">
            <label htmlFor="name">{t.name}</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="field">
            <label htmlFor="population">{t.population}</label>

            <input
              id="population"
              name="population"
              type="number"
              value={formData.population}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="actions d-flex justify-content-end mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={saving}
            >
              {saving ? t.saving : t.save}
            </button>
          </div>
        </form>
      </div>

      <div className="card-footer d-flex justify-content-start">
        <Link to="/states" className="btn btn-secondary">
          {t.back}
        </Link>
      </div>
    </div>
  );
}

export default StateForm;
