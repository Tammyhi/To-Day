document.addEventListener('DOMContentLoaded',() => {
    let tasks = [];
    let settings = {
        resetHour: 0,
        resetMin: 0,
        timeTillReset: 0
    };

    const taskFilter = document.getElementById('task-filter');
    const toDo = document.querySelector('.task-filter__btn--incomplete'); // querySelector returns just the first matching elem, no arr
    const toCelebrate = document.querySelector('.task-filter__btn--complete');

    const taskList = document.getElementById('task-list');
    const completedList = document.getElementById('task-list--completed');

    const addTaskForm = document.getElementById('add-task-form');
    const addTaskMobileBtn = document.querySelector('.add-task-form__btn--mobile');
    const addTaskDesc = document.querySelector('.add-task-form__desc');

    // make incomplete task complete
    taskList.addEventListener('click',(event) =>{
        const target = event.target;
        if(target.closest('.task-list__btn__icon--incomplete')){
            const taskListItem = event.target.closest('.task-list__item--incomplete');
            if (taskListItem) {
                taskListItem.remove();
                completedList.appendChild(taskListItem);
                taskListItem.classList.remove('task-list__item--incomplete');
                taskListItem.classList.add('task-list__item--completed');
                const taskListBtn = taskListItem.querySelector('.task-list__btn--incomplete');
                taskListBtn.classList.remove('task-list__btn--incomplete');
                taskListBtn.classList.add('task-list__btn--completed');
                const taskListBtnIcon = taskListBtn.querySelector('.task-list__btn__icon--incomplete');
                taskListBtnIcon.classList.remove('task-list__btn__icon--incomplete','ph');
                taskListBtnIcon.classList.add('task-list__btn__icon--completed','ph-fill');
                let task = tasks.find(task => task.id === taskListItem.id);
                task.status = "completed";
                saveData();
            }
        }
        else if(target.closest('.task-list__item__desc')){
           //const taskListItem = event.target.closest('.task-list__item--incomplete');
            let newDesc = target.closest('.task-list__item__desc');
            newDesc.addEventListener('keydown', (event) => {
                if(event.key === 'Enter'){
                    event.preventDefault();
                }
            })
            newDesc.addEventListener('blur', (event) => {
                let task = tasks.find(task => task.id === newDesc.parentElement.id);
                task.desc = newDesc.innerHTML;
                saveData();
            })
        }
        else if (target.closest('.task-list__btn__icon--delete')){
            const taskListItem = event.target.closest('.task-list__item--incomplete');
            taskListItem.remove();
            tasks = tasks.filter(task => task.id !== taskListItem.id);
            saveData();
        }
    });

    // make complete task incomplete
    completedList.addEventListener('click',(event) =>{
        const target = event.target;
        if(target.closest('.task-list__btn__icon--completed')){
            const completedListItem = event.target.closest('.task-list__item--completed');
            if (completedListItem) {
                completedListItem.remove();
                taskList.appendChild(completedListItem);
                completedListItem.classList.remove('task-list__item--completed');
                completedListItem.classList.add('task-list__item--incomplete');
                const completedListBtn = completedListItem.querySelector('.task-list__btn--completed');
                completedListBtn.classList.remove('task-list__btn--completed');
                completedListBtn.classList.add('task-list__btn--incomplete');
                const completedListBtnIcon = completedListBtn.querySelector('.task-list__btn__icon--completed');
                completedListBtnIcon.classList.remove('task-list__btn__icon--completed','ph-fill');
                completedListBtnIcon.classList.add('task-list__btn__icon--incomplete','ph');
                let task = tasks.find(task => task.id === completedListItem.id);
                task.status = "incomplete";
                saveData();
            }
        }
        else if(target.closest('.task-list__item__desc')){
            let newDesc = target.closest('.task-list__item__desc');
            newDesc.addEventListener('keydown', (event) => {
                if(event.key === 'Enter'){
                    event.preventDefault();
                }
            })
            newDesc.addEventListener('blur', (event) => {
                let task = tasks.find(task => task.id === newDesc.parentElement.id);
                task.desc = newDesc.innerHTML;
                saveData();
            })
        }
        else if (target.closest('.task-list__btn__icon--delete')){
            const completedListItem = event.target.closest('.task-list__item--completed');
            completedListItem.remove();
            tasks = tasks.filter(task => task.id !== completedListItem.id);
            saveData();
        }
    });

    // switch between toDo and toCelebrate lists view
    taskFilter.addEventListener('click', (event) => {
        const toDoDetected = event.target.closest('.task-filter__btn--incomplete');
        const toCelebrateDetected = event.target.closest('.task-filter__btn--complete')
        if (toCelebrateDetected){
            if (toCelebrate.classList.contains('inactive')) {
                toDo.classList.add('inactive');
                taskList.classList.add('hidden');
                addTaskForm.classList.add('hidden');

                toCelebrate.classList.add('active');
                toCelebrate.classList.remove('inactive');
                completedList.classList.remove('hidden');
            }
        }
        else if (toDoDetected) {
            if(toDo.classList.contains('inactive')) {
                toCelebrate.classList.add('inactive');
                completedList.classList.add('hidden');

                toDo.classList.add('active');
                toDo.classList.remove('inactive');
                taskList.classList.remove('hidden');
                addTaskForm.classList.remove('hidden');
            }
        }
    })

    // Add new task with enter key or clicking on add
    addTaskForm.addEventListener('keydown', (event) =>{
        if(event.key === "Enter"){
            if (addTaskDesc.value.trim() !== ''){
                const newTask = createTaskElement(addTaskDesc.value, "incomplete");
                taskList.appendChild(newTask);
                tasks.push({
                     id: newTask.id,
                     desc: addTaskDesc.value,
                     status: "incomplete",
                 });
                saveData();
                addTaskDesc.value = '';
            }
        }
    })

    addTaskMobileBtn.addEventListener('click', () => {
        if (addTaskDesc.value.trim() !== ''){
                const newTask = createTaskElement(addTaskDesc.value, "incomplete");
                taskList.appendChild(newTask);
                tasks.push({
                     id: newTask.id,
                     desc: addTaskDesc.value,
                     status: "incomplete",
                 });
                saveData();
                addTaskDesc.value = '';
            }
    })

        
    // return created task element 
    function createTaskElement(desc, status, id = Date.now()){
        const taskEl = document.createElement('div');
        taskEl.classList.add('task-list__item','task-list__item--' + status);

        const taskBtn = document.createElement('button');
        taskBtn.classList.add('task-list__btn', 'task-list__btn--' + status);

        const taskBtnIcon = document.createElement('i');
        if(status === 'incomplete'){
            taskBtnIcon.classList.add('ph');
        }
        else{
            taskBtnIcon.classList.add('ph-fill');
        }
        taskBtnIcon.classList.add('ph-circle', 'task-list__btn__icon','task-list__btn__icon--' + status);

        const delBtn = document.createElement('button');
        delBtn.classList.add('task-list__btn', 'task-list__btn--delete');

        const delBtnIcon = document.createElement('i');
        delBtnIcon.classList.add('ph','ph-x', 'task-list__btn__icon','task-list__btn__icon--delete');

        const taskDesc = document.createElement('p');
        taskDesc.classList.add('task-list__item__desc');
        taskDesc.setAttribute("contenteditable", "true");
        taskDesc.setAttribute("spellcheck", "false");
        taskDesc.innerHTML = desc;

        taskBtn.appendChild(taskBtnIcon);
        delBtn.appendChild(delBtnIcon);
        taskEl.appendChild(taskBtn);
        taskEl.appendChild(taskDesc);
        taskEl.appendChild(delBtn);
        taskEl.setAttribute('id', id);
        return taskEl;
    }

    function showTime(){
        let time = new Date;
        
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();

        console.log(time.getTime());
        if(time.getTime() > settings.timeTillReset){
            calcReset();
            localStorage.removeItem('tasks');
            tasks = [];
            saveData();
            location.reload();
        }
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        let timeStr = hour + ":" + min + ":" + sec;
        document.getElementById('header__time').innerHTML = timeStr;
    }

    function showDate(){
        let date = new Date;
        let month = date.getMonth();
        let dayOfWeek = date.getDay();
        let dayOfMonth = date.getDate();

        switch(month) {
            case 0:
                month = "Jan";
                break;
            case 1:
                month = "Feb";
                break;
            case 2:
                month = "Mar";
                break;
            case 3:
                month = "Apr";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "Jun";
                break;
            case 6:
                month = "Jul";
                break;
            case 7:
                month = "Aug";
                break;
            case 8:
                month = "Sep";
                break;
            case 9:
                month = "Oct";
                break;
            case 10:
                month = "Nov";
                break;
            case 11:
                month = "Dec";
                break;
        }

        switch(dayOfWeek) {
            case 0:
                dayOfWeek = "Sun";
                break;
            case 1:
                dayOfWeek = "Mon";
                break;
            case 2:
                dayOfWeek = "Tue";
                break;
            case 3:
                dayOfWeek = "Wed";
                break;
            case 4:
                dayOfWeek = "Thu";
                break;
            case 5:
                dayOfWeek = "Fri";
                break;
            case 6:
                dayOfWeek = "Sat";
                break;
        }

        let dateStr = dayOfWeek + " " + month + " " + dayOfMonth;
        document.getElementById('header__date').innerHTML = dateStr;
    }

    function calcReset(){
        const now = new Date();
        const resetTime = new Date();

        resetTime.setHours(settings.resetHour, settings.resetMin, 0, 0);
        if (now > resetTime){
            resetTime.setDate(resetTime.getDate() + 1);
        }
        settings.timeTillReset = resetTime.getTime();
    }

    function saveData(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    function loadData(){
        if (localStorage.getItem('tasks')){
            let savedList = JSON.parse(localStorage.getItem('tasks'));
            savedList.forEach(taskEl => {
                tasks.push(taskEl);
                let elId = taskEl.id;
                let elStatus = taskEl.status;
                let elDesc = taskEl.desc;
                let newEl = createTaskElement(elDesc, elStatus, elId);
                if(elStatus === "incomplete"){
                    taskList.appendChild(newEl);
                }
                else{
                    completedList.appendChild(newEl);
                }
            })
        }
        else{
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        if (localStorage.getItem('settings')){
            settings = JSON.parse(localStorage.getItem('settings'));
        }
        else {
            localStorage.setItem('settings', JSON.stringify(settings));
        }
    }

    setInterval(showTime, 1000);

    loadData();

    showTime();
    showDate();
});
