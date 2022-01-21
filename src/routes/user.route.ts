class UserRoute {
  constructor(router: any) {
    const user = require("../controllers/user.controller");
    router.post("/sign-up", user.userRegistration);
    router.post("/sign-in", user.userLogin);
  }
}

module.exports = UserRoute;
