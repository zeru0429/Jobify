import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect } from "react";
import Loader from "../Loading";
const chartSetting = {
  yAxis: [
    {
      label: "Number of Users",
    },
  ],
  width: 600,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const BarsDataset = ({
  triggerQuery,
  dataKeys,
}: {
  triggerQuery: any;
  dataKeys: any;
}) => {
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
        xAxis={[{ scaleType: "band", dataKey: "company" }]}
        series={dataKeys.map(({ key, label }: { key: any; label: any }) => ({
          dataKey: key,
          label: label,
        }))}
        {...chartSetting}
      />
    );
  }
};
export default BarsDataset;
