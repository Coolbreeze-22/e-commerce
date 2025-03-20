import React from "react";
import "./GroupCategory.css";
import { useLocation } from "react-router-dom";




export const GroupedCategory = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const queryCategory = query.get("category");
  
  return <div>GroupedCategory</div>;
};
