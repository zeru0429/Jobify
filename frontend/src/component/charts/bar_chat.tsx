import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import Loader from "../Loading";

const otherSetting = {
  height: 300,
  yAxis: [{ label: "Number of Applicants" }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const valueFormatter = (value: number | null) => `${value} applicants`;

interface ApplicantsProps {
  triggerQuery: any;
}

const ApplicantStats: React.FC<ApplicantsProps> = ({ triggerQuery }) => {
  const [trigger, { isError, isLoading, isSuccess, data, error }] =
    triggerQuery();

  useEffect(() => {
    trigger({});
  }, [trigger]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error occurred: {error.toString()}</div>;
  }

  if (isSuccess) {
    return (
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            valueFormatter: (month, context) =>
              context.location === "tick"
                ? `${month.slice(0, 3)} \n2023`
                : `${month} 2023`,
          },
        ]}
        series={[
          {
            dataKey: "applicants",
            label: "Number of Applicants",
            valueFormatter,
          },
        ]}
        {...otherSetting}
      />
    );
  }
};

export default ApplicantStats;
