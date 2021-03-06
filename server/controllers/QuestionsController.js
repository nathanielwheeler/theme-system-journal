import express from "express";
import BaseController from "../utils/BaseController";
import { questionsService } from "../services/QuestionsService";
import auth0Provider from "@bcwdev/auth0provider";

export class QuestionsController extends BaseController {
  constructor() {
    super("api/questions");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.isAuthorized)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      return res.send(["question1", "question2"]);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
