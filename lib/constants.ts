export const companyTypeOptions = [
  { id: 1, name: "Record Label" },
  { id: 2, name: "Digital Distribution" },
  { id: 3, name: "Management" },
  { id: 4, name: "company 4" },
  { id: 5, name: "Others" },
];

export const rosterSizeOptions = [
  { id: 1, name: "Less than 10" },
  { id: 2, name: "11-20" },
  { id: 3, name: "More than 20" },
];
export const catalogueSizeOptions = [
  { id: 1, name: "Less than 20" },
  { id: 2, name: "21-50" },
  { id: 3, name: "More than 50" },
];
export const roleOptions = [
  { id: 1, name: "Owner" },
  { id: 2, name: "Administrator" },
  { id: 3, name: "Manager" },
  { id: 4, name: "Other" },
];

export const unauthenticatedPaths = [
  "/signin",
  "/select-workspace",
  "/signup",
  "/login-link",
  "/login-link-sent",
  "/forgot/password/notify",
  "/email/activate",
  "/user/password",
  "/forgot/password/reset",
  "/loginlink",
];

export const dateOptions = [
  {
    label: "Last 12 months",
    value: "Last 12 months",
    val: "Last 12 months",
  },
  {
    label: "Last 6 Months",
    value: "Last 6 Months",
    val: "Last 6 Months",
  },
  {
    label: "This Quarter",
    value: "This Quarter",
    val: "Last 3 Months",
  },
  {
    label: "This Year",
    value: "This Year",
    val: "This Year",
  },
  {
    label: "All Time",
    value: "All Time",
    val: "All Time",
  },
  {
    label: "Last Year",
    value: "Last Year",
    val: "Last Year",
  },
];

export const paymentCurrencyList = [
  { id: 1, value: "USD", label: "USD" },
  { id: 2, value: "NGN", label: "NGN" },
];

export const initialQuery = {
  page: 1,
  size: 10,
  search: "",
  pageSize: 10,
};

export const usdCurrencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const eurCurrencyFormat = new Intl.NumberFormat("sfb", {
  style: "currency",
  currency: "EUR",
});
export const ngnCurrencyFormat = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const gbpCurrencyFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const audCurrencyFormat = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export const date = [
  {
    label: "Last 12 months",
    value: "Last 12 months",
    val: "Last 12 months",
  },
  {
    label: "Last 6 Months",
    value: "Last 6 Months",
    val: "Last 6 Months",
  },
  {
    label: "This Quarter",
    value: "This Quarter",
    val: "Last 3 Months",
  },
  {
    label: "This Year",
    value: "This Year",
    val: "This Year",
  },
  {
    label: "All Time",
    value: "All Time",
    val: "All Time",
  },
  {
    label: "Last Year",
    value: "Last Year",
    val: "Last Year",
  },
];
