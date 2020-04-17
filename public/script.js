//window.onload = getTaskPrioritySorted()
var list = document.querySelector('ul');
var submit = document.getElementById('submit');

submit.onclick = function() {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const status = document.getElementById('status').value
    const duedate = document.getElementById('duedate').value
    const priority = document.getElementById('priority').value
    const note = document.getElementById('note').value

    addNewTodoJson(title, description, duedate, status, priority, note)
}

async function getTaskPrioritySorted() {
    const todos = await getTasks();
    const html =
        todos.sort(sortByPriority(todos))
        .map(todos => {
            return `<li><a href="/todos/${todos.id}">${todos.title}</a></li>`
        }).join('')
    console.log(html);
    document.querySelector('#myUL').insertAdjacentHTML("afterbegin", html)
}

async function getTodos() {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    console.log(todos)

    for (const element in todos) {
        // console.log(`${element}: ${todos[element]}`);

        var ul = document.getElementById('myUL')

        var li = document.createElement("li");
        li.setAttribute('id', todos[element].title);
        li.setAttribute('class', 'expandable')
        li.appendChild(document.createTextNode(todos[element].title));
        ul.appendChild(li);
    }
}



//getTasks from GET/todos
async function getTasks() {

    const resp = await fetch('/todos')
    const todos = await resp.json()
    return todos;
}

function sortByPriority(data) {
    var priorities = {
        'High': 0,
        'Medium': 1,
        'Low': 2,
    }
    data.sort(function(task1, task2) {
        return priorities[task1.priority] - priorities[task2.priority];
    })
}

function LoadTasks() {
    const todos = getTasks();
    const html = todos
        .map(todos => {
            return `<li><a href="${todos.id}">${todos.title}</li>`
        }).join('')
    console.log(html);
    document.querySelector('#myUL').insertAdjacentHTML("afterbegin", html)

}

async function addNewTodoUrlEncoded(task, done, due) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `task=${task}&done=${done}&due=2020-04-05`
    })
}
async function addTodosList() {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    const len = todos.length - 1;
    console.log(len)
    var ul = document.getElementById('myUL')

    var li = document.createElement("li");
    li.setAttribute('id', todos[len].title);
    li.appendChild(document.createTextNode(todos[len].title));
    ul.appendChild(li);
}

async function addNewTodoJson(title, description, duedate, status, priority, note) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(title, description, duedate, status, priority, note)
    })
    getTaskPrioritySorted()
}