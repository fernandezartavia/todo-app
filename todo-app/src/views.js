import { getTodos, saveTodos, removeTodo, toggleToDo } from "./todos"
import { getFilters } from "./filters"


// renderTodos
// Arguments: none
// Return value: none
//function to render todos based on filters
const renderTodos = () => {
    const filterTodo = getFilters()
    const todos = getTodos()
    if(todos.length>0){
        document.querySelector("#todo-div").innerHTML = ""
        let filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filterTodo.searchText.toLocaleLowerCase()))
        const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)
        if (filterTodo.hideCompleted) {
            filteredTodos = filteredTodos.filter((todo) => !todo.completed)
        }
        generateSummaryDom(incompletedTodos)
        generateToDoDom(filteredTodos)
    } 
    else{
        document.querySelector("#todo-div").innerHTML = ""
        let noTodos = document.createElement('p')
        noTodos.innerText='No to-dos to show'
        noTodos.classList.add('empty-message')
        document.querySelector("#todo-div").appendChild(noTodos)
    }
}


// generateTodoDOM
// Arguments: todo
// Return value: the todo element
//function to generate a todo Dom
let generateToDoDom = function (filteredTodos) {
    
    const todos = getTodos()
    filteredTodos.forEach( (todo) => {
        //creating the div that is going to have all of the todo elements
        const newToDo = document.createElement('label')
        const containerEl = document.createElement('div')

        //create a checkbox for marking the todo
        const todoCheckBox = document.createElement('input')
        todoCheckBox.setAttribute('type', 'checkbox')
        todoCheckBox.checked = todo.completed
        todoCheckBox.addEventListener('change', () => {
            toggleToDo(todo.id)
            saveTodos(todos)
            renderTodos()
        })


        //creating the todo text element
        const newParagraph = document.createElement('span')
        newParagraph.textContent = "- " + todo.text + "     "

        //create a button for deleting the todo
        const removeToDoButton = document.createElement('button')
        removeToDoButton.textContent = 'Remove'
        removeToDoButton.classList.add('button','button--text')
        removeToDoButton.addEventListener('click',  (e) => {
            removeTodo(todo.id)
            saveTodos(todos)
            renderTodos()

        })

        newToDo.classList.add('list-item')
        containerEl.classList.add('list-item__container')
        containerEl.appendChild(todoCheckBox)
        containerEl.appendChild(newParagraph)
        newToDo.appendChild(containerEl)
        newToDo.appendChild(removeToDoButton)

    

        document.querySelector('#todo-div').appendChild(newToDo)
    })

        
}


// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
//function to generate the summary Dom
let generateSummaryDom = (incompletedTodos) => {
    const newParagraph = document.createElement('h2')
    newParagraph.classList.add('list-title')
    if (incompletedTodos.length===1){
        newParagraph.textContent = `You have ${incompletedTodos.length} to do left`
    } else if(incompletedTodos.length>1){
        newParagraph.textContent = `You have ${incompletedTodos.length} things to do left`
    }
    
    document.querySelector('#todo-div').appendChild(newParagraph)
}

// Make sure to set up the exports

export {renderTodos, generateToDoDom, generateSummaryDom}