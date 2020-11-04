const inputTask = document.getElementById('inputTask');
const buttonTask = document.getElementById('buttonTask');
const taskComponent = document.getElementById('taskComponent');
const componentDoing = document.getElementById('componentDoing');
const componenDone = document.getElementById('componenDone');
const database = firebase.database();


newTask =() =>{

    if(inputTask.value ===  ''){
        alert('Los campos estan vacios');
        return;
    } 

    var now = new Date();
    console.log(now.toUTCString());
    let reference = database.ref('task/toDo').push()

    let getTask = inputTask.value;
    let date = now.toUTCString();

    let objectTask = {
        id: reference.key,
        date: date,
        task: getTask,
    }

    reference.set(objectTask);
    inputTask.value= '';

    
}

database.ref('task/toDo/').on('value',function(data){

    taskComponent.innerHTML = '';

    data.forEach(
        
        taskElement => {

            let get = taskElement.val();
            let filaTask = new ToDo(get);
            taskComponent.appendChild(filaTask.render());
        
    });


});

database.ref('task/doing').on("value", function(data){

    componentDoing.innerHTML ='';

    data.forEach(


        sendDoing =>{

            let info = sendDoing.val();
            let doing = new Doing(info);
            componentDoing.appendChild(doing.render());

    })



});

database.ref('task/done/').on("value", function(data){

    componenDone.innerHTML ='';

    data.forEach(


        sendDone =>{

            let info = sendDone.val();
            let done = new Done(info);
            componenDone.appendChild(done.render());

    });



});


buttonTask.addEventListener('click',newTask);