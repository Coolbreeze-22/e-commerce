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

  paymentMode: string;
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>;

  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
}

interface ChildrenType {
  children: ReactNode;
}

export const CommerceContext = createContext<ContextType>({} as ContextType);

export const CommerceProvider = ({ children }: ChildrenType) => {
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
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
