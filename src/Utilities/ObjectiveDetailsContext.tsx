import React, { ReactNode, createContext, useContext, useState } from "react";

type ObjectiveDetailsContextType = {
	detailsOverlayVisible: boolean;
	toggleDetailsOverlayVisible: () => void;
};

const ObjectiveDetailsContext = createContext<ObjectiveDetailsContextType | undefined>(undefined);

type ObjectiveDetailsProviderProps = {
	children: ReactNode;
};

export const ObjectivesDetailsProvider: React.FC<ObjectiveDetailsProviderProps> = ({ children }) => {
	const [detailsOverlayVisible, setDetailsOverlayVisible] = useState(false);

	const toggleDetailsOverlayVisible = () => {
		setDetailsOverlayVisible(!detailsOverlayVisible);
	};

	return (
		<ObjectiveDetailsContext.Provider value={{ detailsOverlayVisible, toggleDetailsOverlayVisible }}>
			{children}
		</ObjectiveDetailsContext.Provider>
	);
};

export const useObjectiveDetails = () => {
	const context = useContext(ObjectiveDetailsContext);
	if (!context) {
		throw new Error("useActiveObjectives must be used within an ActiveObjectivesProvider");
	}
	return context;
};
