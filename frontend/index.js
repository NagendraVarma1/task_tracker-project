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
  let divPending = document.getElementById("pendingTaskList");
  let divCompleted = document.getElementById("completedTaskList");

  let card = document.createElement('div');
  card.className = 'card'

  let task = document.createElement('h3')
  task.className = 'task'

  let dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete";
  dltBtn.className = 'dltBtn'

  dltBtn.onclick = () => {
    taskDeleteHandler(data);
    if (data.status === "pending") {
      divPending.removeChild(card);
    } else {
      divCompleted.removeChild(card);
    }
  };

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Mark as Complete";
  completeBtn.className = 'completeBtn'

  completeBtn.onclick = () => {
    taskEditHandler(data);
  };
  task.textContent = `Task: ${data.task}, Status: ${data.status}`;
  card.append(task)
  if (data.status === "pending") {
    card.append(completeBtn);
  }
  card.append(dltBtn);
  if (data.status === "pending") {
    divPending.appendChild(card);
  } else {
    divCompleted.appendChild(card);
  }
}

function taskDeleteHandler(task) {
  axios
    .delete(`http://localhost:3000/delete-task/${task.id}`)
    .then(() => {
      console.log("Task Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

function taskEditHandler(task) {
  console.log(task);
  axios
    .put(`http://localhost:3000/update-task/${task.id}`, task) 
    .then(() => {
      console.log("Task updated");
      location.reload();
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
      for (let i = 0; i < allData.length; i++) {
        show(allData[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
