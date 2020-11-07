class Doing {

    constructor(taskDoing){
        this.taskDoing = taskDoing;
    }


    render =() =>{

        let component = document.createElement('div');
        component.className = 'componentDoing';
        let taskText = document.createElement('div');
        let dateText = document.createElement('div');
        dateText.className = 'date';
        let delateButton = document.createElement('button');
        delateButton.innerHTML = 'X';
        delateButton.className = 'buttonDelate'
        let doneButton = document.createElement('button');
        doneButton.innerHTML = 'Done';
        doneButton.className = 'button';
        let toDoButton = document.createElement('button');
        toDoButton.innerHTML = 'To Do';
        toDoButton.className = 'button';

        //AGREGO AL COMPONENTE LOS DATOS RECIBIDOS

        taskText.innerHTML = (

            this.taskDoing.task
        );

        dateText.innerHTML = (

            this.taskDoing.date
        );



        //EVENTOS DE BOTONES

        //ELIMINAR DE LA RAMA DOING

        delateButton.addEventListener('click', ()=>{

            const database = firebase.database();
            database.ref('task/doing/'+this.taskDoing.id).set(null);

        });

        //ENVIAR A LA RAMA DONE

        doneButton.addEventListener('click', ()=>{

            let ref = database.ref('task/done/').push()
            let date = this.taskDoing.date;
            let task = this.taskDoing.task;
            

            let objectDone = {

                id: ref.key,
                date: date,
                task: task,
            }

            ref.set(objectDone);

            database.ref('task/doing/'+this.taskDoing.id).set(null);
        });

        //Volver A LA RAMA ToDo

        toDoButton.addEventListener('click', ()=>{

            let refToDo = database.ref('task/toDo/').push()
            let date = this.taskDoing.date;
            let task = this.taskDoing.task;

            let objectToDo = {

                id: refToDo.key,
                date: date,
                task: task,
            }

            refToDo.set(objectToDo);

            database.ref('task/doing/'+this.taskDoing.id).set(null);
        });
 

        //AGREGO AL COMPONENTE 

        
        
        
        component.appendChild(delateButton);
        component.appendChild(dateText);
        component.appendChild(taskText);
        component.appendChild(toDoButton);
        component.appendChild(doneButton);




        

     return component; 

    }
}