const fs = require("fs");
var path = require("path");
const rootPath = path.resolve(__dirname);
const userDataFilePath = `${rootPath}/../../src/data/userData.json`;

class User {
  userId: number;
  FullName: string;
  Email: string;
  Password: string;
  Token: string;

  constructor(
    fullname: string,
    email: string,
    password: string,
    token: string
  ) {
    this.userId = new Date().getTime();
    this.FullName = fullname;
    this.Email = email;
    this.Password = password;
    this.Token = token;
  }

  save() {
    try {
      const allUsers: any = User.getAllUsersData();
      allUsers.push(this);
      fs.writeFileSync(userDataFilePath, JSON.stringify(allUsers));
      return true;
    } catch (err) {
      console.error("Error writing file:", err);
      throw new Error("Error writing file!");
    }
  }

  static getUserData(email: string) {
    try {
      const jsonString = fs.readFileSync(userDataFilePath);
      const parsedJSON = JSON.parse(jsonString);
      const user = parsedJSON.find((u: User) => u.Email === email);
      return user;
    } catch (err) {
      console.error("Error reading file:", err);
      throw new Error("Error reading file!");
    }
  }

  static getAllUsersData() {
    try {
      const jsonString = fs.readFileSync(userDataFilePath);
      const parsedJSON = JSON.parse(jsonString);
      return parsedJSON;
    } catch (err) {
      console.error("Error reading file:", err);
      throw new Error("Error reading file!");
    }
  }

  static updateUserData(user: User): boolean {
    try {
      const allUsers = User.getAllUsersData();
      const userIndex = allUsers.findIndex(
        (u: any) => u.userId === user.userId
      );
      allUsers[userIndex] = user;
      fs.writeFileSync(userDataFilePath, JSON.stringify(allUsers));
      return true;
    } catch (err) {
      console.error("Error writing file:", err);
      throw new Error("Error writing file!");
    }
  }
}

module.exports = User;
