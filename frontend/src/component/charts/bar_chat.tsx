import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";

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

// New dataset representing the number of applicants per month
const dataset = [
  {
    month: "January",
    applicants: 120,
  },
  {
    month: "February",
    applicants: 150,
  },
  {
    month: "March",
    applicants: 175,
  },
  {
    month: "April",
    applicants: 200,
  },
  {
    month: "May",
    applicants: 225,
  },
  {
    month: "June",
    applicants: 250,
  },
  {
    month: "July",
    applicants: 300,
  },
  {
    month: "August",
    applicants: 280,
  },
  {
    month: "September",
    applicants: 240,
  },
  {
    month: "October",
    applicants: 260,
  },
  {
    month: "November",
    applicants: 300,
  },
  {
    month: "December",
    applicants: 230,
  },
];

const valueFormatter = (value: number | null) => `${value} applicants`;

export default function ApplicantStats() {
  return (
    <BarChart
      dataset={dataset}
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
