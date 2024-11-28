export const companyTypes = [
  {
    label: "Tech",
    value: 45.0,
  },
  {
    label: "Finance",
    value: 25.0,
  },
  {
    label: "Healthcare",
    value: 15.0,
  },
  {
    label: "Education",
    value: 10.0,
  },
  {
    label: "Other",
    value: 5.0,
  },
];

export const jobTypes = [
  {
    label: "Full-Time",
    value: 60.0,
  },
  {
    label: "Part-Time",
    value: 25.0,
  },
  {
    label: "Contract",
    value: 10.0,
  },
  {
    label: "Internship",
    value: 5.0,
  },
];

export const platforms = [
  {
    label: "Remote",
    value: 70.0,
  },
  {
    label: "On-Site",
    value: 30.0,
  },
];

const normalize = (v: number, v2: number) =>
  Number.parseFloat(((v * v2) / 100).toFixed(2));

export const combinedCompanyData = [
  ...companyTypes.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Company)" : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...jobTypes.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Job Type)" : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;
