import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserType {
    email: string;
    password: string;
}

const initialState: UserType = {
    email: "",
    password: ""
};

interface ContextType {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    isColor: boolean;
    setIsColor: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChildrenType {
    children: ReactNode;
}

export const CommerceContext = createContext<ContextType | undefined>(undefined);

export const CommerceProvider: React.FC<ChildrenType> = ({ children }) => {
    const [user, setUser] = useState<UserType>(initialState);
    const [isColor, setIsColor] = useState<boolean>(false);

    return (
        <CommerceContext.Provider value={{ user, setUser, isColor, setIsColor }}>
            {children}
        </CommerceContext.Provider>
    );
};

export const useStateContext = () => useContext(CommerceContext);

