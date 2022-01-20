class APIRoutes {
  constructor(app: any) {
    const UserRoutes = require("./user.route");
    new UserRoutes(app);
  }
}

module.exports = APIRoutes;
