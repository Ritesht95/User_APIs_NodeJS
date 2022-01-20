class UserRoute {
  constructor(router: any) {
    const user = require("../controllers/user.controller");
    router.post("/api/user/registration", user.userRegistration);
    router.post("/api/user/login", user.userLogin);
  }
}

module.exports = UserRoute;
