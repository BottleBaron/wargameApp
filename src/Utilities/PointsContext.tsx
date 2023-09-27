import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface PointsState {
	points: [number, number];
}

interface PointsContextType {
	state: PointsState;
	dispatch: React.Dispatch<PointsAction>;
}

export type PointsAction =
	| { type: "ADD_POINTS"; payload: number; target: "YOUR_POINTS" }
	| { type: "SUBTRACT_POINTS"; payload: number; target: "YOUR_POINTS" }
	| { type: "ADD_POINTS"; payload: number; target: "OPPONENT_POINTS" }
	| { type: "SUBTRACT_POINTS"; payload: number; target: "OPPONENT_POINTS" };

    

const PointsContext = createContext<PointsContextType | undefined>(undefined);

function pointsReducer(state: PointsState, action: PointsAction): PointsState {
	if (action.type === "ADD_POINTS" && action.target === "YOUR_POINTS") {
		return { points: [state.points[0] + action.payload, state.points[1]] };
	} else if (action.type === "SUBTRACT_POINTS" && action.target === "YOUR_POINTS") {
		return { points: [state.points[0] - action.payload, state.points[1]] };
	} else if (action.type === "ADD_POINTS" && action.target === "OPPONENT_POINTS") {
		return { points: [state.points[0], state.points[1] + action.payload] };
	} else if (action.type === "SUBTRACT_POINTS" && action.target === "OPPONENT_POINTS") {
		return { points: [state.points[0], state.points[1] - action.payload] };
	} else {
		return state;
	}
}

export function PointsProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(pointsReducer, { points: [0, 0] });

	return <PointsContext.Provider value={{ state, dispatch }}>{children}</PointsContext.Provider>;
}

export function usePointsContext(): PointsContextType {
	const context = useContext(PointsContext);
	if (context === undefined) {
		throw new Error("usePointsContext must be used within a PointsProvider");
	}
	return context;
}
