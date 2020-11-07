class ToDo {

    constructor(taskToDo){
        this.taskToDo = taskToDo;
    }


    render =() =>{

        let component = document.createElement('div');
        component.className = 'componentToDo';

        let toDoText = document.createElement('div');

        toDoText.innerHTML = 'To Do';
        toDoText.className = 'headToDo';

        let taskText = document.createElement('div');
        taskText.className = 'task';

        let dateText = document.createElement('div');
        dateText.className = 'date';

        let delateButton = document.createElement('button');
        delateButton.innerHTML = 'X';
        delateButton.className = 'buttonDelate';


        let doingButton = document.createElement('button');
        doingButton.innerHTML = 'Doing';
        doingButton.className = 'button';



        //AGREGO AL COMPONENTE LOS DATOS RECIBIDOS

        taskText.innerHTML = (

            this.taskToDo.task
        );

        dateText.innerHTML = (

            this.taskToDo.date
        );

        //EVENTOS DE BOTONES

        //ELIMINAR DE LA RAMA TO DO

        delateButton.addEventListener('click', ()=>{

            const database = firebase.database();
            database.ref('task/toDo/'+this.taskToDo.id).set(null);

        });

        //ENVIAR A LA RAMA DOING

        doingButton.addEventListener('click', ()=>{
            
            let ref = database.ref('task/doing/').push()
            let date = this.taskToDo.date;
            let task = this.taskToDo.task;

            let objectToDo = {

                id: ref.key,
                date: date,
                task: task,
            }

            ref.set(objectToDo);

            database.ref('task/toDo/'+this.taskToDo.id).set(null);

            

        });

        


        //AGREGO AL COMPONENTE 
       
        component.appendChild(delateButton);
        component.appendChild(dateText);
        component.appendChild(taskText);
        component.appendChild(doingButton);


        

     return component; 

    }
}