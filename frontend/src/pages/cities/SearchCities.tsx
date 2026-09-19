import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import type { City } from "../../types";

import translations from "../../i18n";

const t = translations;

type SearchType = "city" | "state";

function SearchCities() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("city");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setCities([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          q: normalizedQuery,
          type: searchType,
        });

        const response = await api.get<City[]>(
          `/api/v2/search_cities?${params.toString()}`
        );

        setCities(response);
      } catch (error) {
        console.error("Error searching cities:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, searchType]);

  return (
    <div className="card w-50 mx-auto mt-5">
      <div className="card-header">
        <h1>{`${t.search} ${t.cities}`}</h1>
      </div>

      <div className="card-body">
        <div
          className="btn-group w-100 mb-3"
          role="group"
          aria-label="Search type"
        >
          <button
            type="button"
            className={`btn ${
              searchType === "city"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSearchType("city")}
          >
            {t.city}
          </button>

          <button
            type="button"
            className={`btn ${
              searchType === "state"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSearchType("state")}
          >
            {t.state}
          </button>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder={
            searchType === "city"
              ? `${t.search} ${t.city}...`
              : t.search_state
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />

        <div className="mt-4">
          {loading && <p>Searching...</p>}

          {!loading &&
            query.trim() &&
            cities.length === 0 && (
              <p>{t.noResults}</p>
            )}

          {!loading && cities.length > 0 && (
            <div>
              {cities.map((city) => (
                <p key={city.id}>
                  {`${city.name}, ${t.population}: ${city.population.toLocaleString("pt-BR")}`}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card-footer d-flex justify-content-end">
        <Link
          to="/cities"
          className="btn btn-secondary"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}

export default SearchCities;
