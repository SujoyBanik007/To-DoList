const form  = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todo')
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos){
    todos.forEach(todo => {
        addToDo(todo)
    })
}


form.addEventListener ('submit', (e) => {
    e.preventDefault()

    addToDo();
})

function addToDo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text
    }

    if (todoText){
        const todoEl = document.createElement('li');
        if(todo && todoEl.completed){
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText
        
        todoEl.addEventListener('click', ()=>{
            todoEl.classList.toggle('completed')
            updateLs()
        })

        todoEl.addEventListener('contextmenu', (e) =>{
            e.preventDefault()

            todoEl.remove()
            updateLs()
        })

        todosUL.appendChild(todoEl);
        input.value = ''
        updateLs();
    }
}


function updateLs(){
    const ToDoEl = document.querySelectorAll('li');

    const todos = [];
    ToDoEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    });
    localStorage.setItem('todos', JSON.stringify(todos))
}