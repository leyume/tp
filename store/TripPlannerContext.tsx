import { createContext, useReducer, useContext } from "react";
import tripPlannerReducer, { initialState } from "./tripPlannerReducer";

const TripPlannerContext = createContext(initialState);

export const TripPlannerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(tripPlannerReducer, initialState);

  const setName = (name: string) => {
    dispatch({
      type: "SET_NAME",
      payload: { name },
    });
  };

  const setOrigin = (origin: any) => {
    dispatch({
      type: "SET_ORIGIN",
      payload: { origin },
    });
  };

  const setDestination = (destination: any) => {
    dispatch({
      type: "SET_DESTINATION",
      payload: { destination },
    });
  };

  const setStartDate = (start_date: string) => {
    dispatch({
      type: "SET_START_DATE",
      payload: { start_date },
    });
  };

  const setJourneys = (journeys: any) => {
    dispatch({
      type: "SET_JOURNEYS",
      payload: { journeys },
    });
  };

  const setMode = (mode: string) => {
    dispatch({
      type: "SET_MODE",
      payload: { mode },
    });
  };

  const value = {
    name: state.name,
    origin: state.origin,
    destination: state.destination,
    start_date: state.start_date,
    journeys: state.journeys,
    mode: state.mode,
    setName,
    setOrigin,
    setDestination,
    setStartDate,
    setJourneys,
    setMode,
  };

  return <TripPlannerContext.Provider value={value}>{children}</TripPlannerContext.Provider>;
};

const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (context === undefined) throw new Error("useTripPlanner must be used with TripPlannerContext");
  return context;
};

export default useTripPlanner;
