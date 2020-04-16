window.onload = getTaskPrioritySorted()
var list = document.querySelector('ul');

let submit = document.getElementById('submit')
submit.onclick = function() {
    getTasks()
}
async function getTaskPrioritySorted() {
    const todos = await getTasks();
    const html =
        todos.sort(sortByPriority(todos))
        .map(todos => {
            return `<li><a href="">${todos.title}</a></li>`
        }).join('')
    console.log(html);
    document.querySelector('#myUL').insertAdjacentHTML("afterbegin", html)
}

async function getTaskPrioritySorted() {
    const todos = await getTasks();
    const html =
        todos.sort(sortByPriority(todos))
        .map(todos => {
            return `<li><a href="">${todos.title}</a></li>`
        }).join('')
    console.log(html);
    document.querySelector('#myUL').insertAdjacentHTML("afterbegin", html)
}
//getTasks from GET/todos
async function getTasks() {

    const resp = await fetch('/todos')
    const todos = await resp.json()
    return todos;
    /*const html = todos
        .sort(sortByPriority(todos))
        .map(todos => {
            return `<li><a href="">${todos.title}</a></li>`
        }).join('')
    console.log(html);
    document.querySelector('#myUL').insertAdjacentHTML("afterbegin", html)
*/

}

function sortByPriority(data) {
    // const data = getTasks();
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
            return `<tr><a href="">${todos.title}</tr>`
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

async function addNewTodoJson(todo) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo: {
                todo: "John",
                email: "john@example.com"
            }

        })
    })
}