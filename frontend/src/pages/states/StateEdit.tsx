import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StateForm from "../../components/StateForm";
import api from "../../services/api";
import type { State } from "../../types";

function StateEdit() {
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

  return <StateForm state={state} title="Editing State" />;
}

export default StateEdit;