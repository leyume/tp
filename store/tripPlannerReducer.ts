// Interface for our state
interface IState {
  name?: string;
  mode?: string;
  origin?: { id?: string | number; name?: string };
  destination?: { id?: string | number; name?: string };
  start_date?: string;
  journeys?: any[];
  setName: (name: string) => void;
  setOrigin: (origin: {}) => void;
  setDestination: (destination: {}) => void;
  setStartDate: (start_date: string) => void;
  setJourneys: (journeys: any[]) => void;
  setMode: (mode: string) => void;
}

export const initialState: IState = {
  name: "",
  mode: "dark",
  origin: {},
  destination: {},
  start_date: "",
  journeys: [],
  setName: () => {},
  setOrigin: () => {},
  setDestination: () => {},
  setStartDate: () => {},
  setJourneys: () => {},
  setMode: () => {},
};

const tripPlannerReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_NAME":
      return { ...state, name: payload.name };

    case "SET_ORIGIN":
      return { ...state, origin: payload.origin };

    case "SET_DESTINATION":
      return { ...state, destination: payload.destination };

    case "SET_START_DATE":
      return { ...state, start_date: payload.start_date };

    case "SET_JOURNEYS":
      return { ...state, journeys: payload.journeys };

    case "SET_MODE":
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(payload.mode);
      return { ...state, mode: payload.mode };

    default:
      throw new Error(`No case for type ${type} found.`);
  }
};

export default tripPlannerReducer;
