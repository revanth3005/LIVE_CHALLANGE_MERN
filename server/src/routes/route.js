const test = require("../controllers/test");
const user = require("../controllers/user");
const task = require("../controllers/task");

module.exports = async (app) => {
  app.route("/test").get(test.testRoute);
  app.route("/api/v1/register").post(user.createUser);
  app.route("/api/v1/login").post(user.logUser);
  app.route("/api/v1/task").post(task.createTask);
  app.route("/api/v1/getTasks").get(task.fetchTasks);
  app.route("/api/v1/deleteTask").post(task.deleteTask);
};
