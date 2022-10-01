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
function evenNum(num){
    if(num%2==0){
        return true;
    }else{
        return false;
    }
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

function allIds (list){
    list.forEach(todo => {
        console.log(todo.id + ' Hello neighbor');
    });
}

// NAPISATI FUNKCIJU KOJA VRACA SVE TACNE TODO-ove CIJI JE BROJ KARAKTERA U TITLE-u MANJI OD 40
function shortAndtrue (list) {
    //KOMENTARI 

    // trueElements treba da bude const, ne let 
    // nigde u okviru ove funkcije se ne menja vrednost ove promenljive
    // u tom slucaju koristimo const
   let trueElements = filterCompletedTodos(list);
    let short = [];
    for( let i=0; i<trueElements.length; i++){
        if(trueElements[i].title.length<40)
        short.push(trueElements[i].id)
    }
    return short;

    // evo ti dobar primer zasto koristimo map, filter i ostale takve funkcije
    // pogledaj moju implementaciju dole i tvoju gore
    // ti imas dodatni niz short koji svakako negde zauzima mesto u memoriji 
    // ja sam preskocio i taj dodatni niz i for petlju i naredbu short.push(...) 
    // u ovom slucaju ce moj kod da radi primetno brze od tvog 
    // zato je bitno da razumes map, filter, foreach i tako dalje
}

function shortAndTrue2(list) {
    const trueElements = filterCompletedTodos(list);

    return trueElements.filter(todo => {
        if(todo.title.length<40)
            return todo;
    })
    .map(todo => todo.title) // AKO DODAMO OVAJ MAP - VRATICEMO SAMO NASLOVE SVIH TODO-OVAw
}

function shortAndTrue3(list) {
    const trueElements = filterCompletedTodos(list);
    // ============= FUNKCIONALNOST MOZE DA SE SVEDE I NA JEDNU LINIJU SAMO ===================
    return trueElements.filter(element => element.title.length < 40)
    // ============= OBRATI PAZNJU NA LINIJU KODA GORE ===========
    
    // OVO JE IDENTICNO KAO filter KOJI SAM NAPISAO GORE
    // SAMO JE JOS KRACE
}


//NAPISATI FUNKCIJU KOJA VRACA SVE TITLOVE TODO-A ZA UNETI USERID
function titles(list,eneredId){
    return list.filter(todo => {
        if(todo.userId===eneredId){   
            return todo;
        }
    })
    .map(todo =>todo.title)
}
//NAPISATI FUNKCIJU KOJA VRACA TITLE SVIH TACNIH TODO-A
function titlesOfTrue(list){
    return list.filter(todo => todo.completed === true).map(todo=>todo.title)
}
//NAPISATI FUNKCIJU KOJA VRACA SVE ID ZA SVE NETACNE TODO-E ZA UNETI USERID
function idOfFalse(list,enteredId){
    return list.filter(todo => todo.userId === enteredId && todo.completed===false).map(todo=>todo.id)
}
//NAPISATI FUNKCIJU KOJA VRACA TITLOVE ZA SVE PARNE ID-JEVE KOJI SU KOMPLETIRANI
function evenTitle(list){
    return list.filter(todo =>{
        if(evenNum(todo.id)===true &&todo.completed ===true){
            
            return todo;
        }
    }).map(todo =>todo.id)
}
// NAPISATI FUNKCIJU KOJA VRACA UKUPAN BROJ KARAKTERA U CELOM TODOS-u
let num = 0;
function total(list){
    return list.reduce((acc,cur) =>{
        return acc + cur.title.length
    },0)
}
//NAPISATI FUNKCIJU KOJA VRACA UKUPAN BROJ KARAKTERA TITLE-a SVIH TRUE-COMPLETED TODO-OVA
function sumOfTrueTodos(list){
    return list.filter(todo => todo.completed === true).reduce((first,current) => first+current.title.length,0)
}
//NAPISATI FUNKCIJU KOJA PRIKAZUJE UKUPAJ BROJ TACNIH I NETACNIH TODO-ova
function sumOfTrueAndFalse(list){
    let trueTodo = 0;
    let falseTodo = 0;
    list.forEach(todo=>todo.completed===true?trueTodo++:falseTodo++);
    let sum ={trueTodo,
        falseTodo,
        suma:trueTodo+falseTodo}
    return (sum)
}
//PRIKAZIVANJE SAMO PRVE POLOVINE LISTE
function firstHalf(list){
    return list.slice(0,list.length/2);
}
//NAPISATIO FUNKCIJU KOJA CE DA NADJE IZMEDJU low I high TODO-A TODO 
//KOJI JE TRUE I CIJI JE BROJ KARAKTERA MANJI OD 40,A USERID NEPARAN I PRIKAZE NJEGOV TITLE
function test(list,low,high){
    const neededList = list.slice(low,high+1);
    let element = neededList.filter(todo =>todo.completed === true && todo.title.length<=40 && todo.userid%2!=0).map(todo =>todo.title)
    return element
}




async function main() {

    const todos = await getTodos("/todos");
    console.log(todos);
    console.log(titles(todos,8));
    console.log(titlesOfTrue(todos))
    console.log(idOfFalse(todos,2))
    console.log(evenTitle(todos))
    console.log(total(todos))
    console.log(sumOfTrueTodos(todos))
    console.log(sumOfTrueAndFalse(todos))
    console.log(firstHalf(todos))
    console.log(test(todos,50,100))

    // allIds(todos);
    // console.log(shortAndtrue(todos))
    // console.log(shortAndTrue2(todos))
    // const nonCompleted = filterTodosByCompletion(todos, UNCOMPLETED)
    // const completed = filterTodosByCompletion(todos, COMPLETED);

    //console.log(nonCompleted, completed);
    // const userCompletedTodos = completedForUser(todos,1);
    // console.log(userCompletedTodos);
    // console.log(nonCompleted);
    // console.log(completed);


    // const userTodos = todosOfUser(3, todos);
    // console.log(userTodos)

    //const completedTodos = filterCompletedTodos(todos);
}

main();

