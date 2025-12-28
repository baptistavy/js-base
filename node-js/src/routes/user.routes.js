const Router = require("express");
const controllerUser = require("../controller/user.controller");

const router = Router();

router.post("/", controllerUser.createUser);
router.get("/", controllerUser.getAllUsers);
router.get("/:id", controllerUser.getUserById);
router.put("/:id", controllerUser.updateUser);
router.delete("/:id", controllerUser.deleteUser);

module.exports = router;