const TaskTracker = require("../Modal/task");

exports.addNewTask = async (req, res, next) => {
  try {
    let task = req.body.task;
    let status = req.body.status;

    const data = await TaskTracker.create({
      task: task,
      status: status,
    });
    res.status(202).json({ newTask: data });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllTasks = (req, res, next) => {
  TaskTracker.findAll().then((data) => {
    res.status(200).json({ allTasks: data });
  });
};

exports.updateTask = async (req, res, next) => {
  try {
    let taskId = req.params.id;
    await TaskTracker.update(
      {
        status: "completed",
      },
      {
        where: {
          id: taskId,
        },
      }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    let taskId = req.params.id;
    await TaskTracker.destroy({
      where: {
        id: taskId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
