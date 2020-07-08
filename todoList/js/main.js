//윈도우켜 켜지자 마자 포커스되게, focus on input_list when opening window
window.onload = function(){
    document.getElementById('input_list').focus();
}




//전역변수설정
var addTask = document.getElementById('input_list'); // 입력창
var todoList = document.getElementById('todo-list'); //todolist dl
var doneList = document.getElementById('done-list'); //donelist dl




// 엔터랑 add버튼 동일하게 구현, enter button works the same as add button
addTask.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            addToDoList();
        }
});



// to dd list 추가하기!!, add to do List
function addToDoList(){

    //입력창, 입력한 값 가져오기, define input_list and bring value from it
    var addTaskText = addTask.value;

    //입력한 값이 없으면 다시 커서 포커스 후 실행 취소, return false if nothing in value
    if(addTaskText === null || addTaskText === "" || addTaskText ===" "){
        alert("NEW TASK를 작성해주세요.");
        addTask.focus();
        return false;
    } else {
        var taskLeft = document.createElement('dd');
        taskLeft.classList.add('todo-list-dd');
        taskLeft.innerHTML = '<input class="checkbox" type="checkbox" onclick="moveToDoneList(this);"/>' +
            '<input class="task-title" type="text" value="'+addTaskText+'" readonly="true"/>' +
            '<input class="edit-btn" type="button" value="Edit" onclick="editList(this);">' +
            '<input class="del-btn" type="button" value="Delete" onClick="deleteList(this);">';
        todoList.appendChild(taskLeft);

        addTask.value = "";
        addTask.focus();
    }



}






//todo에서 done으로 보내기, move list into done list
function moveToDoneList(checkbox) {

    var taskCom = checkbox.parentNode;

    checkbox.setAttribute('onclick','moveToDoList(this)');
    taskCom.classList.remove('todo-list-dd');
    taskCom.classList.add('done-list-dd');

    doneList.appendChild(taskCom);

}


//done에서 todo로 다시 보내기, move list into todo list
function moveToDoList(checkbox){

    var taskBack = checkbox.parentNode;

    checkbox.setAttribute('onclick','moveToDoneList(this)');
    taskBack.classList.remove('done-list-dd');
    taskBack.classList.add('todo-list-dd');

    todoList.appendChild(taskBack);
}

function editList(editBtn) {
    var taskTitle = editBtn.previousElementSibling;

    console.log(taskTitle);
    taskTitle.readOnly = false;
    taskTitle.focus();

}

function deleteList(deleteBtn) {
    console.log(deleteBtn.parentNode)
    deleteBtn.parentNode.remove('todo-list-dd');
}
