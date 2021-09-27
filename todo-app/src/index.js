// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary
import { addToDo, loadTodos, saveTodos } from './todos'
import {renderTodos} from './views'
import {setFilters} from './filters'


// --

// Add necessary imports

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#todo-text').addEventListener('input', (e) => {
    setFilters({searchText:e.target.value})
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed-checkbox').addEventListener('change', (e) =>{
    if(e.target.checked===true){
        setFilters({hideCompleted:true})
    }
    else if(e.target.checked===false){
        setFilters({hideCompleted:false})
    }
    renderTodos()
})

// Set up form submission handler
document.querySelector('#add-todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let text = e.target.elements.addToDo.value
    text = text.trim()
    if(text!=""){
        addToDo(text)
        renderTodos()
        e.target.elements.addToDo.value = ""
    } else{
        e.target.elements.addToDo.value = ""
    }
    
})

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})