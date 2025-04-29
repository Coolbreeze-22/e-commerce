import React, { createContext, useState, ReactNode, useContext } from "react";

interface ContextType {
  isWishlist: boolean;
  setIsWishlist: React.Dispatch<React.SetStateAction<boolean>>;

  searchItems: string;
  setSearchItems: React.Dispatch<React.SetStateAction<string>>;

  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;

  isDropdown: boolean;
  setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;

  checkoutFormData: CheckoutFormType;
  setCheckoutFormData: React.Dispatch<React.SetStateAction<CheckoutFormType>>;
}

interface ChildrenType {
  children: ReactNode;
}

export interface CheckoutFormType {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  email: string;
}

export const CommerceContext = createContext<ContextType>({} as ContextType);

export const CommerceProvider = ({ children }: ChildrenType) => {

  const initialState: CheckoutFormType = {
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    email: "",
  };

  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [checkoutFormData, setCheckoutFormData] =
    useState<CheckoutFormType>(initialState);
  const [searchItems, setSearchItems] = useState<string>("");
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  return (
    <CommerceContext.Provider
      value={{
        isWishlist,
        setIsWishlist,
        checkoutFormData,
        setCheckoutFormData,
        searchItems,
        setSearchItems,
        isSidebar,
        setIsSidebar,
        isDropdown,
        setIsDropdown,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useStateContext = () => useContext(CommerceContext);