export const OrderHistoryTableHeaders = {
  order: "Order",
  date: "Date",
  status: "Status",
  total: "Total",
} as const;

export type OrderHistoryTableHeaders = (typeof OrderHistoryTableHeaders)[keyof typeof OrderHistoryTableHeaders];