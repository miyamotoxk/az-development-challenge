import * as express from "express";
import pgPromise from "pg-promise";

export const register = (app: express.Application) => {
  const port = parseInt(process.env.PGPORT || "5432", 10);
  const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres",
  };

  const pgp = pgPromise();
  const db = pgp(config);

  app.get(`/api/actions`, async (req: any, res) => {
    try {
      const actions = await db.any(
        `
        SELECT *
        FROM actions
        ORDER BY id`
      );
      return res.json(actions);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });

  app.get(`/api/actions/:id`, async (req: any, res) => {
    try {
      const action = await db.one(
        `
        SELECT *
        FROM actions
        WHERE id = $[id]`,
        { id: req.params.id }
      );
      return res.json(action);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });

  app.post(`/api/actions`, async (req: any, res) => {
    try {
      const id = await db.one(
        `
        INSERT INTO actions( action )
        VALUES( $[action] )
        RETURNING id;`,
        { ...req.body }
      );
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });

  app.patch(`/api/actions/:id`, async (req: any, res) => {
    try {
      const id = await db.one(
        `
        UPDATE actions
        SET action = $[action]
        WHERE id = $[id]
        RETURNING id;`,
        { id: req.params.id, ...req.body }
      );
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });

  app.delete(`/api/actions/:id`, async (req: any, res) => {
    try {
      const deleted = await db.result(
        `
        DELETE
        FROM actions
        WHERE id = $[id]`,
        { id: req.params.id },
        (r) => r.rowCount
      );
      return res.json({ deleted });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });
};
