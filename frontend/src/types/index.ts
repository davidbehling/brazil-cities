export interface State {
  id: number;
  name: string;
  population: number;
  created_at?: string;
  updated_at?: string;
}

export interface City {
  id: number;
  name: string;
  population: number;
  state_id: number;
  state?: State;
  created_at?: string;
  updated_at?: string;
}

export interface StateFormData {
  name: string;
  population: number;
}

export interface CityFormData {
  name: string;
  population: number;
  state_id: number;
}
