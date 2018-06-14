var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('listTodos')) || [];

btnElement.onclick = function addTodo(){
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}

function removeTodo(pos){
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

function renderTodos(){
    listElement.innerHTML = '';

    for(todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'removeTodo('+ pos +')');

        linkElement.setAttribute('href', '#');

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function saveToStorage(){
    localStorage.setItem('listTodos', JSON.stringify(todos));
}