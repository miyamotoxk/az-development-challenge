import express from "express";
import path from "path";
import dotenv from "dotenv";
import * as routes from "./routes";

dotenv.config();

const app = express();

const port = process.env.SERVER_PORT || 3000;

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure routes
routes.register(app);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server started at http://localhost:${port}`);
});
