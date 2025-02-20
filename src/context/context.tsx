import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserType {
    email: string;
    password: string;
}

interface ContextType {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

interface ChildrenType {
    children: ReactNode;
}

const initialState: UserType = {
    email: "",
    password: ""
};

export const CommerceContext = createContext<ContextType | undefined>(undefined);

export const CommerceProvider: React.FC<ChildrenType> = ({ children }) => {
    const [user, setUser] = useState<UserType>(initialState);

    return (
        <CommerceContext.Provider value={{ user, setUser }}>
            {children}
        </CommerceContext.Provider>
    );
};

export const useStateContext = () => useContext(CommerceContext);

