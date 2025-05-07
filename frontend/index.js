function addNewTask(event) {
  event.preventDefault();

  let task = document.getElementById("addTask").value;
  let status = document.getElementById("status").value;

  let taskDetails = {
    task,
    status,
  };
  axios
    .post(
      "https://crudcrud.com/api/5eb2f1f38a654fe098efb0cee9365232/tasks",
      taskDetails
    )
    .then((res) => {
      show(res.data);
      document.getElementById("addTask").value = ''
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
    axios
      .delete(
        `https://crudcrud.com/api/5eb2f1f38a654fe098efb0cee9365232/tasks/${data._id}`
      )
      .then((res) => {
        if(data.status === 'pending'){
          ulPending.removeChild(li);
        }
        else{
          ulCompleted.removeChild(li)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Completed";

  completeBtn.onclick = () => {
    let updatedTask = {
      id: data._id,
      task: data.task,
      status: "completed",
    };
    axios
      .put(
        `https://crudcrud.com/api/5eb2f1f38a654fe098efb0cee9365232/tasks/${data._id}`,
        updatedTask
      )
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  li.textContent = `Task: ${data.task}, Status: ${data.status}`;
  li.append(completeBtn);
  li.append(dltBtn);
  if(data.status === 'pending'){
    ulPending.appendChild(li);
  }
  else{
    ulCompleted.appendChild(li)
  }
  
}

window.addEventListener("load", () => {
  axios
    .get("https://crudcrud.com/api/5eb2f1f38a654fe098efb0cee9365232/tasks")
    .then((res) => {
      let allData = res.data;
      console.log(allData);
      for (let i = 0; i < allData.length; i++) {
        show(allData[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
