import  express  from "express";
import HomeController from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/",HomeController.getHomePage);
  router.get("/crud",HomeController.getCRUD);
  router.post("/post-crud",HomeController.postCRUD);
  router.get("/get-crud",HomeController.displayGetCRUD);
  router.get("/edit-crud",HomeController.getEditCRUD);
  router.post("/put-crud",HomeController.putCRUD);

  return app.use("/", router);
};

module.exports = initWebRoutes;
