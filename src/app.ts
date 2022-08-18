import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import privateRoutes from "./routes/privates.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

// Initializations
const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(cors()); //connect to db
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
// routes
app.get("/", (req, res) => {
  res.send(`THE API IS AT localhost: ${app.get("port")}`);
});
app.use(authRoutes);
app.use(privateRoutes);

export default app;
