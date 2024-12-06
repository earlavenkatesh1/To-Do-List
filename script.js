let todoItemContainer = document.getElementById("todoItemsContainer");
let addTodo = document.getElementById("addTodo");

function onAddTodo(){
    let usertInput = document.getElementById("todoUserInput");
    let inputValue = usertInput.value;
    if (inputValue === ""){
        alert("plese enter valied text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: inputValue,
        uniqueno: todoCount,
        isChecked: false
    }
    todoList.push(newTodo);
    createAndAppend(newTodo);
    usertInput.value = "";
}




addTodo.onclick = function(){
    onAddTodo();
}
let todoList = getTodoList();


let todoCount = todoList.length;

function onTodoStatus(checkboxId,labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement1 = document.getElementById(labelId);
    let todoObjectIndex = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueno;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
        if(todoObjectIndex !== -1){
            let todoObject = todoList[todoObjectIndex];
            todoObject.isChecked = !todoObject.isChecked;

            if(todoObject.isChecked){
                labelElement1.classList.add("checked");
            }
            else{
                labelElement1.classList.remove("checked");
            }
        }
    
   
    }


function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
    
    let deleteElementIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueno;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(deleteElementIndex,1);
}

function createAndAppend(todo){
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;
    let todoId = "todo" + todo.uniqueno;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoItemContainer.appendChild(todoElement);
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;

    todoElement.appendChild(inputElement);

    inputElement.onclick = function(){
        onTodoStatus(checkboxId,labelId,todoId);
    }

    let labelContainer = document.createElement("div")
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.textContent = todo.text;
    if(todo.isChecked){
        labelElement.classList.add("checked")
    }
    labelContainer.appendChild(labelElement);

    let deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIcon);

    let icon = document.createElement("i");
    icon.classList.add("fas","fa-trash-alt","delete-icon");
    deleteIcon.appendChild(icon);
    icon.onclick = function (){
        onDeleteTodo(todoId);
    }

}

for (let todo of todoList){
    createAndAppend(todo);
}

let saveTodoButton = document.getElementById("saveTodoButton");

saveTodoButton.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
function getTodoList(){
    let stringifyTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifyTodoList);

    if (parsedTodoList === null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}