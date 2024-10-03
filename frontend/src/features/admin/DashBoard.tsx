import { Box } from "@mui/material";
import FormatterDemoNoSnap from "../../component/charts/bar_chat";
import BarsDataset from "../../component/charts/linear_graph";
import PieArcLabel from "../../component/charts/Pichart";

const DashBoard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <BarsDataset />
        <PieArcLabel />
      </Box>
      <Box sx={{ display: "flex" }}>
        <FormatterDemoNoSnap />
      </Box>
    </>
  );
};

export default DashBoard;
