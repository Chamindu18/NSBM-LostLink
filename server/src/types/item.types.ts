export interface CreateItemInput {
  title: string;
  description: string;
  categoryId: string;
  locationId: string;
  status: "LOST" | "FOUND";
  date: Date;
}