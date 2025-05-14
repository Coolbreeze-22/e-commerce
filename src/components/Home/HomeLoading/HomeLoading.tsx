import { Skeleton } from "@mui/material";

const HomeLoading = () => {
  return (
    <div style={{display:"flex", gap:"20px"}}>
      <Skeleton width={"40%"} height={"300px"} />
      <Skeleton width={"40%"} height={"300px"} />
      <Skeleton width={"20%"} height={"300px"} />
    </div>
  );
};

export default HomeLoading;
