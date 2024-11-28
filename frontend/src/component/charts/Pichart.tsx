import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { valueFormatter } from "../../demo/pi_chart_static_demo_data";
import { useEffect } from "react";
import Loader from "../Loading";

const PieArcLabel = ({ triggerQuery }: { triggerQuery: any }) => {
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
    // Filter out null labels or provide a default value for them
    const filteredData = data
      .filter((item: any) => item.label !== null)
      .map((item: any) => ({
        value: item.value,
        label: item.label || "Unknown",
      }));

    return (
      <PieChart
        series={[
          {
            data: filteredData,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            valueFormatter,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
          },
        }}
        {...size}
      />
    );
  }
};

const size = {
  width: 800,
  height: 350,
};

export default PieArcLabel;
