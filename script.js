document.addEventListener('DOMContentLoaded',() => {
    localStorage.setItem("name", "Tammy");
    console.log(localStorage.getItem("name"));
    localStorage.setItem("name2", "Sean");
    console.log(localStorage.getItem("name2"));
    localStorage.removeItem("name2");
    console.log(localStorage.getItem("name2"));
    
    setInterval(showTime, 1000);
    showTime();
    showDate();

    const taskFilter = document.getElementById('task-filter');
    const toDo = document.querySelector('.task-filter__btn--incomplete'); // querySelector returns just the first matching elem, no arr
    const toCelebrate = document.querySelector('.task-filter__btn--complete');

    const taskList = document.getElementById('task-list');

    const completedList = document.getElementById('task-list--completed');

    const addTaskForm = document.getElementById('add-task-form');
    const addTaskMobileBtn = document.querySelector('.add-task-form__btn--mobile');
    const addTaskDesc = document.querySelector('.add-task-form__desc');
    
    const initialData = {
        tasksToDo: [],
        tasksCompleted: [],
        lastVisitDate: new Date().toLocaleDateString()
    }
    let appData = loadData() || initialData;

    taskList.addEventListener('click',(event) =>{
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
        }
    });

    completedList.addEventListener('click',(event) =>{
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
        }
    });

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

    addTaskForm.addEventListener('keydown', (event) =>{
        if(event.key === "Enter"){
            const newTask = createTaskElement(addTaskDesc.value);
            taskList.appendChild(newTask);
            addTaskDesc.value = '';
        }
    })

    addTaskMobileBtn.addEventListener('click', () => {
        const newTask = createTaskElement(addTaskDesc.value);
        taskList.appendChild(newTask);
        addTaskDesc.value = '';
    })


});

function createTaskElement(desc){
    const taskEl = document.createElement('div');
    taskEl.classList.add('task-list__item','task-list__item--incomplete');

    const taskBtn = document.createElement('button');
    taskBtn.classList.add('task-list__btn', 'task-list__btn--incomplete');

    const taskBtnIcon = document.createElement('i');
    taskBtnIcon.classList.add('ph','ph-circle', 'task-list__btn__icon','task-list__btn__icon--incomplete');

    const taskDesc = document.createElement('p');
    taskDesc.classList.add('task-list__item__desc');
    taskDesc.innerHTML = desc;

    taskBtn.appendChild(taskBtnIcon);
    taskEl.appendChild(taskBtn);
    taskEl.appendChild(taskDesc);
    return taskEl;
}

function showTime(){
    let time = new Date;
    // let month = time.getMonth();
    // let day = time.getDay();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;

    let timeStr = hour + ":" + min + ":" + sec;
    document.getElementById('header__time').innerHTML = timeStr;
    // Add thing that when it hits midnight call showDate again
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

function saveData(){

}

function loadData(){
    
}

function midnightReset() {
    localStorage.clear();
}

/* In local storage
    During the day store the current tasks in the completed list and incomplete list, git sta
    create object for each list, counter.
    when complete task, incomplete task, add task, edit task

    localStorage.setitem(keystr, valstr)
    */