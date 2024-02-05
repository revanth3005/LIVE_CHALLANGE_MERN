const task_model = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const { name, desc } = req.body;

  const response = {
    status: 200,
    success: false,
    data: null,
    error: null,
    message: null,
    resource: req.originalUrl,
  };
  if (!name || !desc) {
    response.error = "name, desc is required";
    response.message = "please provide the required details";
    return res.status(400).json(response);
  }

  const task = {
    name: name,
    desc: desc,
  };

  try {
    const userData = new task_model(task);
    await userData.save();

    response.data = userData;
    response.message = "task created!";
    response.success = true;

    return res.status(200).json(response);
  } catch (error) {
    console.log(error, "while creating task");
    response.data = null;
    response.error = error;
    response.message = error?.message;
    return res.status(500).json(response);
  }
};

exports.fetchTasks = async (req, res) => {
  const tasks = await task_model.find();
  return res.status(200).json({
    success: true,
    data: tasks,
    error: null,
    message: "fetched all tasks",
    resource: req.originalUrl,
  });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.body;

  const response = {
    status: 200,
    success: false,
    data: null,
    error: null,
    message: null,
    resource: req.originalUrl,
  };
  if (!id) {
    response.error = "id is required";
    response.message = "please provide the required details";
    return res.status(400).json(response);
  }

  try {
    const findId = await task_model.deleteOne({ _id: id });

    response.data = findId;
    response.message = "task deleted!";
    response.success = true;

    return res.status(200).json(response);
  } catch (error) {
    console.log(error, "while deleting task");
    response.data = null;
    response.error = error;
    response.message = error?.message;
    return res.status(500).json(response);
  }
};


exports.edidTask = async()=>{
    const { name, desc} =req.body;

    
}