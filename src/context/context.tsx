import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserProps } from "../states/redux/reducerTypes";
import { userInitialState } from "../states/redux/userReducer";

interface ContextType {
  isWishlist: boolean;
  setIsWishlist: React.Dispatch<React.SetStateAction<boolean>>;

  searchItems: string;
  setSearchItems: React.Dispatch<React.SetStateAction<string>>;

  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;

  isDropdown: boolean;
  setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;

  paymentMode: string;
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>;

  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;

  userFormData: UserProps;
  setUserFormData: React.Dispatch<React.SetStateAction<UserProps>>;
}

interface ChildrenType {
  children: ReactNode;
}

export const CommerceContext = createContext<ContextType>({} as ContextType);

export const CommerceProvider = ({ children }: ChildrenType) => {
  const initialState: UserProps = {
    ...userInitialState,
  };

  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [userFormData, setUserFormData] =
    useState<UserProps>(initialState);
  const [searchItems, setSearchItems] = useState<string>("");
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [paymentMode, setPaymentMode] = useState<string>("bank");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");

  return (
    <CommerceContext.Provider
      value={{
        isWishlist,
        setIsWishlist,
        userFormData,
        setUserFormData,
        searchItems,
        setSearchItems,
        isSidebar,
        setIsSidebar,
        isDropdown,
        setIsDropdown,
        paymentMode,
        setPaymentMode,
        couponCode,
        setCouponCode,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useStateContext = () => useContext(CommerceContext);
