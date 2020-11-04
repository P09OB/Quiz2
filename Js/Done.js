class Done {

    constructor(taskDone){
        this.taskDone = taskDone;
    }


    render =() =>{

        let component = document.createElement('div');
        let taskText = document.createElement('div');
        let dateText = document.createElement('div');
        let delateButton = document.createElement('button');
        delateButton.innerHTML = 'X';
        let doingButton = document.createElement('button');
        doingButton.innerHTML = 'Doing';


        //AGREGO AL COMPONENTE LOS DATOS RECIBIDOS

        taskText.innerHTML = (

            this.taskDone.task
        );

        dateText.innerHTML = (

            this.taskDone.date
        );

        //EVENTOS DE BOTONES

        //ELIMINAR 

        delateButton.addEventListener('click', ()=>{

            const database = firebase.database();
            database.ref('task/done/'+this.taskDone.id).set(null);

        });

        //ENVIAR A LA RAMA DOING 

        doingButton.addEventListener('click', ()=>{

            let ref = database.ref('task/doing/').push()
            let date = this.taskDone.date;
            let task = this.taskDone.task;
        
            let objectDone = {
                id: ref.key,
                date: date,
                task: task,
            }

            ref.set(objectDone);

            database.ref('task/done/'+this.taskDone.id).set(null);

            

        });




        //AGREGO AL COMPONENTE 


        component.appendChild(doingButton);
        component.appendChild(delateButton);
        component.appendChild(dateText);
        component.appendChild(taskText);

        

     return component; 

    }
}