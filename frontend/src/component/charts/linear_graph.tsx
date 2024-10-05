import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const chartSetting = {
  yAxis: [
    {
      label: "Number of Users",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function BarsDataset({
  dataset,
  dataKeys,
}: {
  dataset: {
    [key: string]: number | string;
  }[];
  dataKeys: { key: string; label: string }[];
}) {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "company" }]}
      series={dataKeys.map(({ key, label }) => ({
        dataKey: key,
        label: label,
      }))}
      {...chartSetting}
    />
  );
}
