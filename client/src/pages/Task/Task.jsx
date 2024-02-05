import axios from "axios";
import React, { useEffect, useState } from "react";

const Task = () => {
  const [taskState, setTaskState] = useState({
    name: "",
    desc: "",
  });
  const [refetch, setRefetch] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const taskHandler = (event) => {
    setTaskState({
      ...taskState,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(taskState);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/task", {
        name: taskState.name,
        desc: taskState.desc,
      });
      console.log(res, "task creation");
      setTaskState({
        email: "",
        password: "",
        name: "",
      });
      setRefetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/getTasks");
        console.log("tasks", res.data.data);
        setTaskList(res.data.data);
        setRefetch(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTasks();
  }, [refetch]);

  const deleteTask = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/deleteTask", {
        id: id,
      });
      console.log("tasks", res.data.data);
      setTaskList(res.data.data);
      setRefetch(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const editTask = async () => {};

  return (
    <div>
      <h1>Task Management </h1>

      <form onSubmit={submitForm} style={{ width: "500px" }}>
        <label htmlFor="tlId">Task Name</label>
        <input
          type="text"
          name="name"
          id="tlId"
          placeholder="enter Task name"
          value={taskState.name}
          onChange={taskHandler}
        />
        <label htmlFor="pId">Description</label>
        <input
          type="text"
          name="desc"
          id="pId"
          placeholder="enter Des"
          value={taskState.des}
          onChange={taskHandler}
        />
        <input type="submit" value={"create task"} />
      </form>

      <div>
        <table border={"1px"}>
          <caption>Tasks</caption>
          <thead>
            <tr>
              <th>task name</th>
              <th>task desc</th>
              <th>delete</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length > 0 &&
              taskList?.map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{item?.name}</td>
                    <td>{item?.desc}</td>
                    <td>
                      <button onClick={() => deleteTask(item?._id)}>del</button>{" "}
                    </td>
                    <td>
                      <button onClick={() => editTask(item?._id)}>edit</button>{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
