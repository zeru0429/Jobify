import { Box } from "@mui/material";
import FormatterDemoNoSnap from "../../component/charts/bar_chat";
import BarsDataset from "../../component/charts/linear_graph";
import PieArcLabel from "../../component/charts/Pichart";
import {
  useLazyGetCompanyTypeQuery,
  useLazyGetJobTypeQuery,
  useLazyGetCompanyJobQuery,
  useLazyGetMonthlyApplicantQuery,
} from "../../services/dashboard_service";

const dataKeys = [{ key: "jobs", label: "Number of Users" }];

const DashBoard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <PieArcLabel triggerQuery={useLazyGetCompanyTypeQuery} />
        <BarsDataset
          dataKeys={dataKeys}
          triggerQuery={useLazyGetCompanyJobQuery}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <FormatterDemoNoSnap triggerQuery={useLazyGetMonthlyApplicantQuery} />
        <PieArcLabel triggerQuery={useLazyGetJobTypeQuery} />
      </Box>
    </>
  );
};

export default DashBoard;
