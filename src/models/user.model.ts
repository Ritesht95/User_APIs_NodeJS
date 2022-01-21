const fs = require("fs");
var path = require("path");
const rootPath = path.resolve(__dirname);
const userDataFilePath = `${rootPath}/../../src/data/userData.json`;

class User {
  userId: number;
  fullname: string;
  email: string;
  password: string;
  token: string;

  constructor(
    fullname: string,
    email: string,
    password: string,
    token: string
  ) {
    this.userId = new Date().getTime();
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.token = token;
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
      const user = parsedJSON.find((u: User) => u.email === email);
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
      const userIndex = allUsers.indexOf((u: any) => u.userId === user.userId);
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
