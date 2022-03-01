import express from "express";
const router = express.Router();

export default () => {
  router.get("/abc", (req, res) => {
    res.send({ hi: "hello?" });
  });
  return router;
};
