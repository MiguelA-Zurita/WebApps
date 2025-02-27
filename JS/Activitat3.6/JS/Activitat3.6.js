const campoTexto = document.querySelector("input");
const taskList = document.getElementById("taskList");
const strawberry = document.getElementById("strawberry");

function addTask(){
    let newTaskText = campoTexto.value;
    let newTask = document.createElement("li");
    let buttonContainer = document.createElement("div");
    newTask.className = 'task';
    let newCompletedButton = document.createElement("button");
    let newDeleteButton = document.createElement("button");
    newCompletedButton.innerText = 'Task completed';
    newCompletedButton.className = 'completeButton';
    newCompletedButton.addEventListener('click', function(event){
        let boton = event.target;
        let contenedor = boton.parentNode;
        let elemento = contenedor.parentNode;
        elemento.className = 'completedTask';
        boton.style.display = 'none';
    })
    newDeleteButton.innerText = 'Delete Task';
    newDeleteButton.className = 'deleteButton';
    newDeleteButton.addEventListener('click', function(event){
        let boton = event.target;
        let contenedor = boton.parentNode;
        let elemento = contenedor.parentNode;
        elemento.remove();
    })
    let newTaskParagraph = document.createElement("p");
    newTaskParagraph.innerText = newTaskText;
    buttonContainer.appendChild(newCompletedButton);
    buttonContainer.appendChild(newDeleteButton);
    newTask.appendChild(newTaskParagraph);
    newTask.appendChild(buttonContainer);
    taskList.appendChild(newTask);
}

function deleteAllCompletedTasks(){
    let allCompletedTasks = document.getElementsByClassName('completedTask');
    for(i = allCompletedTasks.length-1; i>=0; i--){
        let completedTask = allCompletedTasks[i];
        completedTask.remove();
    }
}

strawberry.addEventListener('click',function(event){
    let filterList = document.getElementById("filterList");
    filterList.classList.toggle("inactive");
});

function filter(event){
    let eleccionFiltrado = event.target;
    let allTasks = taskList.childNodes;
    let completedTasks = document.getElementsByClassName('completedTask');
    let activeTasks = document.getElementsByClassName('task');
    switch(eleccionFiltrado.value){
        case ("all"):
            for(i = allTasks.length-1; i>=0; i--){
                let task = allTasks[i];
                task.style.display = "flex";
            }
            break;

        case("active"):
            for(i = activeTasks.length-1; i>=0; i--){
                let task = activeTasks[i];
                task.style.display = "flex";
            }
            
            for(i = completedTasks.length-1; i>=0; i--){
                let task = completedTasks[i];
                task.style.display = "none";
            }
            break;

        case("completed"):
            for(i = activeTasks.length-1; i>=0; i--){
                let task = activeTasks[i];
                task.style.display = "none";
            }
            for(i = completedTasks.length-1; i>=0; i--){
                let task = completedTasks[i];
                task.style.display = "flex";
            }
            break;
    }
}