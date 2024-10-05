export const jobDataset = [
  {
    london: 120,
    paris: 100,
    newYork: 150,
    seoul: 50,
    month: "Jan",
  },
  {
    london: 130,
    paris: 110,
    newYork: 160,
    seoul: 70,
    month: "Feb",
  },
  {
    london: 145,
    paris: 115,
    newYork: 175,
    seoul: 65,
    month: "Mar",
  },
  {
    london: 160,
    paris: 130,
    newYork: 180,
    seoul: 80,
    month: "Apr",
  },
  {
    london: 170,
    paris: 140,
    newYork: 200,
    seoul: 90,
    month: "May",
  },
  {
    london: 180,
    paris: 150,
    newYork: 210,
    seoul: 100,
    month: "June",
  },
  {
    london: 190,
    paris: 160,
    newYork: 220,
    seoul: 110,
    month: "July",
  },
  {
    london: 200,
    paris: 170,
    newYork: 230,
    seoul: 120,
    month: "Aug",
  },
  {
    london: 210,
    paris: 180,
    newYork: 240,
    seoul: 130,
    month: "Sept",
  },
  {
    london: 220,
    paris: 190,
    newYork: 250,
    seoul: 140,
    month: "Oct",
  },
  {
    london: 230,
    paris: 200,
    newYork: 260,
    seoul: 150,
    month: "Nov",
  },
  {
    london: 240,
    paris: 210,
    newYork: 270,
    seoul: 160,
    month: "Dec",
  },
];

export function valueFormatter(value: number | null) {
  return `${value} jobs`;
}
