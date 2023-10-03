import React, { ReactNode, createContext, useContext, useState } from "react";
import { SecondaryObjective } from "../../assets/ObjectivesData";

type ActiveObjectivesContextType = {
	activeObjectives: SecondaryObjective[];
	toggleActiveObjective: (objective: SecondaryObjective) => void;
	removeActiveObjective: (objectiveId: number) => void;
	updateActiveObjective: (updatedObjective: SecondaryObjective) => void;
};

const ActiveObjectivesContext = createContext<ActiveObjectivesContextType | undefined>(undefined);

type ActiveObjectivesProviderProps = {
	children: ReactNode;
};

export const ActiveObjectivesProvider: React.FC<ActiveObjectivesProviderProps> = ({ children }) => {
	const [activeObjectives, setActiveObjectives] = useState<SecondaryObjective[]>([]);

	const toggleActiveObjective = (objective: SecondaryObjective) => {
		const isActive = activeObjectives.some((m) => m.id === objective.id);

		if (!isActive && activeObjectives.length < 3) {
			setActiveObjectives([...activeObjectives, objective]);
		} else {
			setActiveObjectives(activeObjectives.filter((m) => m.id !== objective.id));
		}
	};

	const removeActiveObjective = (objectiveId: number) => {
		const updatedObjectives = activeObjectives.filter((objective) => objective.id !== objectiveId);
		setActiveObjectives(updatedObjectives);
	};

	const updateActiveObjective = (updatedObjective: SecondaryObjective) => {
		const updatedObjectives = activeObjectives.map((objective) =>
			objective.id === updatedObjective.id ? updatedObjective : objective
		);
		setActiveObjectives(updatedObjectives);
	};

	return (
		<ActiveObjectivesContext.Provider value={{ activeObjectives, toggleActiveObjective, removeActiveObjective, updateActiveObjective }}>
			{children}
		</ActiveObjectivesContext.Provider>
	);
};

export const useActiveObjectives = () => {
	const context = useContext(ActiveObjectivesContext);
	if (!context) {
		throw new Error("useActiveObjectives must be used within an ActiveObjectivesProvider");
	}
	return context;
};
