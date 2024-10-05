import { Box } from "@mui/material";
import FormatterDemoNoSnap from "../../component/charts/bar_chat";
import BarsDataset from "../../component/charts/linear_graph";
import PieArcLabel from "../../component/charts/Pichart";
import { companyTypes, jobTypes } from "../../demo/pi_chart_static_demo_data";

const userDataset = [
  { company: "Tech Corp", users: 150 },
  { company: "Finance Inc", users: 100 },
  { company: "Health Co", users: 75 },
  { company: "Edu Group", users: 50 },
];

const dataKeys = [{ key: "users", label: "Number of Users" }];

const DashBoard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <BarsDataset dataset={userDataset} dataKeys={dataKeys} />
        <PieArcLabel statistic={companyTypes} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <PieArcLabel statistic={jobTypes} />
        <FormatterDemoNoSnap />
      </Box>
    </>
  );
};

export default DashBoard;
