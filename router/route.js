const router = require("express").Router();

/** import all controllers */
const appController = require("../controllers/appControllers");
const auth = require("../middleware/auth");

/** POST Methods */
router.route("/register").post(appController.register);
router.route("/registerMail").post();
router.route("/authentication").post((req, res) => {
  res.end();
});
router.route("/login").post(appController.verifyUser, appController.login);

/** GET Methods */
router.route("/user/:username").get(appController.getUser);
router.route("/generateOTP").get(appController.generateOTP);
router.route("/verifyOTP").get(appController.verifyOTP);
router.route("/createResetSession").get(appController.createResetSession);

/** PUT Methods */
router.route("/updateuser").put(auth.Auth, appController.updateUser);
router.route("/resetPassword").put(appController.resetPassword);

/** DELETE Methods */

module.exports = router;
