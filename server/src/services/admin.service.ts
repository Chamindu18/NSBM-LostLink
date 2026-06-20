import { getDashboardStats } from "../repositories/admin.repository";

export const fetchDashboardStats =
  async () => {
    return getDashboardStats();
  };