import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";
import imageRoutes from "./routes/image.routes";
import claimRoutes from "./routes/claim.routes";
import notificationRoutes from "./routes/notification.routes";
import matchRoutes from "./routes/match.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/claims", claimRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use(
  "/api/matches",
  matchRoutes
);

app.get("/", (req, res) => {
  res.send("NSBM LostLink API Running");
});

export default app;