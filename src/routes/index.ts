import * as express from "express";

export const register = (app: express.Application) => {
  // define a route handler for the default home page
  app.get("/", (req: any, res) => {
    res.render("index");
  });

  // define a route handler for the calculator page
  app.get("/calculator", (req: any, res) => {
    res.render("calculator");
  });
};
