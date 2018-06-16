import { RequestHandler } from "express";
import { IDocumentSession, IDocumentStore } from "ravendb";

declare global {
  namespace Express {
    export interface Request {
      documentSession: IDocumentSession;
    }
  }
}

export const ravenDbRequestHandler = (documentStore: IDocumentStore): RequestHandler =>
  (req, _res, next) => {
    req.documentSession = documentStore.openSession();

    next();
  };
