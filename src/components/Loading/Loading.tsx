import "./Loading.css";
import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton variant="text" width={"90%"} height={"33%"} />
      <Skeleton variant="rectangular" width={"90%"} height={"33%"} />
      <Skeleton variant="text" width={"90%"} height={"33%"} />
    </div>
  );
};

export default Loading;
