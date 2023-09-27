import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface PointsState {
	points: number;
}

interface PointsContextType {
	state: PointsState;
	dispatch: React.Dispatch<PointsAction>;
}

type PointsAction = { type: "ADD_POINTS"; payload: number } | { type: "SUBTRACT_POINTS"; payload: number };

const PointsContext = createContext<PointsContextType | undefined>(undefined);

function pointsReducer(state: PointsState, action: PointsAction): PointsState {
	switch (action.type) {
		case "ADD_POINTS":
			return { points: state.points + action.payload };
		case "SUBTRACT_POINTS":
			return { points: state.points - action.payload };
		default:
			return state;
	}
}

export function PointsProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(pointsReducer, { points: 0 });

	return <PointsContext.Provider value={{ state, dispatch }}>{children}</PointsContext.Provider>;
}

export function usePointsContext(): PointsContextType {
	const context = useContext(PointsContext);
	if (context === undefined) {
		throw new Error("usePointsContext must be used within a PointsProvider");
	}
	return context;
}
