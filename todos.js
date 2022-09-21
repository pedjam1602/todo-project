const BASE_URL = 'https://jsonplaceholder.typicode.com';

const COMPLETED = "COMPLETED";
const UNCOMPLETED = "UNCOMPLETED";
const USERID = "userId"

async function getTodos(path) {

    const url = BASE_URL + path;
    const response = await fetch(url);
    const todos = await response.json();

    return todos;
}

function filterCompletedTodos(todos) {
    const completedTodos = todos.filter(todo => todo.completed === true)

    return completedTodos;
}

function filterTodosByCompletion(todos, typeOfTodo) {

    if(typeOfTodo === COMPLETED) {
        return todos.filter(todo => todo.completed === true);
    } else { 
        return todos.filter(todo => todo.completed === false);
    }
    
}

// NAPISATI FUNKCIJU KOJA CE DA VRATI SVE TODO-ove KORISNIKA 3 
// (podsetnik: id = 3......pogledaj property koji sadrzi jedan todo objekat)

function todosOfUser(idOfUser,listOfTodos){
    return listOfTodos
        .filter(todo => {
            if  (idOfUser===todo.userId){
                    return todo;
            }
        })
        
}

// NAPISATI FUNKCIJU KOJA CE DA VRATI SVE !!!KOMPLETIRANE!!! TODO-ove KORISNIKA 1 
// koristiti funkciju napisanu gore!!!!!!!!!!
function completedForUser(listOfTodos, idOfUser){
    // return listOfTodos.filter(
    //     todo => {
    //         if(idOfUser===todo.userId && todo.completed === true){
    //             return todo;
    //         }

    //     }
    // )
    const userTodos = todosOfUser(idOfUser,listOfTodos);
    return filterCompletedTodos(userTodos)

}

// NAPISATI FUNKCIJU KOJA CE DA VRATI NEKOMPLETIRANE TODO-ove KORISNIKA 2 I 3





async function main() {

    const todos = await getTodos("/todos");

    const nonCompleted = filterTodosByCompletion(todos, UNCOMPLETED)
    const completed = filterTodosByCompletion(todos, COMPLETED);

    //console.log(nonCompleted, completed);
    const userCompletedTodos = completedForUser(todos,1);
    console.log(userCompletedTodos);


    // const userTodos = todosOfUser(3, todos);
    // console.log(userTodos)

    //const completedTodos = filterCompletedTodos(todos);
}

main();

