import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { valueFormatter } from "../../demo/pi_chart_static_demo_data";

export default function PieArcLabel({
  statistic,
}: {
  statistic: { label: string; value: number }[];
}) {
  return (
    <PieChart
      series={[
        {
          data: statistic.map((item) => ({
            id: item.label,
            value: item.value,
            label: item.label,
          })),
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
          valueFormatter, // Apply the custom value formatter
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

const size = {
  width: 400,
  height: 200,
};
