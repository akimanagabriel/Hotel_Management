const authController = require("../controllers/auth/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const route = require("express").Router();

// auth routes
route.post("/signin", authController.login);

// protect rest routes routes
route.use(authMiddleware);

// user routes
route.get("/user", userController.index);
route.get("/user/:id", userController.show);
route.post("/user", userController.create);
route.put("/user/:id", userController.update);
route.delete("/user/:id", userController.remove);

module.exports = route;
