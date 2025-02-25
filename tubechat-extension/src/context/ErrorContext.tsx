import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ChildrenProps {
    children: ReactNode;
}

interface ErrorContextProps {
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

export const ErrorContext = createContext<ErrorContextProps>({
    error: null,
    setError: () => {}
});

export const ErrorContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [error, setError] = useState<Error | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
