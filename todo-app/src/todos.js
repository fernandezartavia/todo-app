import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    }
    catch (e) {
        return []
    }
}

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const addToDo = (todo) => {
    const ToDo = {
        id: uuidv4(),
        text: todo,
        completed: false
    }
    todos.push(ToDo)
    saveTodos(todos)
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
//function to remove a todo
const removeTodo = (id) => {
    const toDoIndex = todos.findIndex((todo) => todo.id === id)
    if (toDoIndex > -1) {
        todos.splice(toDoIndex, 1)
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
//function to toggle a todo (change to completed or not completed)
let toggleToDo = (id) => {
    const todo = todos.find((todo) =>todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
    }
}


todos = loadTodos()

export{ loadTodos, saveTodos, getTodos, addToDo, removeTodo, toggleToDo }
// Make sure to call loadTodos and setup the exports