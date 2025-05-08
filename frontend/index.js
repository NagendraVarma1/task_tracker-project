function addNewTask(event) {
  event.preventDefault();

  let task = document.getElementById("addTask").value;
  let status = document.getElementById("status").value;

  let taskDetails = {
    task,
    status,
  };
  axios
    .post("http://localhost:3000/add-task", taskDetails)
    .then((res) => {
      show(res.data.newTask);
      document.getElementById("addTask").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

function show(data) {
  let ulPending = document.getElementById("pendingTaskList");
  let ulCompleted = document.getElementById("completedTaskList");
  let li = document.createElement("li");
  let dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete";

  dltBtn.onclick = () => {
    taskDeleteHandler(data);
    if (data.status === "pending") {
      ulPending.removeChild(li);
    } else {
      ulCompleted.removeChild(li);
    }
  };

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Completed";

  completeBtn.onclick = () => {
    let updatedTask = {
      id: data._id,
      task: data.task,
      status: "completed",
    };
    taskEditHandler(updatedTask);
    location.reload();
  };
  li.textContent = `Task: ${data.task}, Status: ${data.status}`;
  li.append(completeBtn);
  li.append(dltBtn);
  if (data.status === "pending") {
    ulPending.appendChild(li);
  } else {
    ulCompleted.appendChild(li);
  }
}

function taskDeleteHandler(task) {
  axios
    .delete(`http://localhost:3000/delete-task/${task._id}`) //this is not working should look into it
    .then(() => {
      console.log("Task Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

function taskEditHandler(task) {
  console.log(task)
  axios
    .put(`http://localhost:3000/update-task/${task._id}`) //this is not working should look into it
    .then(() => {
      console.log("Task updated");
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", () => {
  axios
    .get("http://localhost:3000/get-all-tasks")
    .then((res) => {
      let allData = res.data.allTasks;
      console.log(allData);
      for (let i = 0; i < allData.length; i++) {
        show(allData[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
