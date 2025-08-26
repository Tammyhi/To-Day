document.addEventListener('DOMContentLoaded',() => {
    setInterval(showTime, 1000);
    showTime();
    showDate();

    const taskFilter = document.getElementById('task-filter');
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('add-task-form');
    const completedList = document.getElementById('task-list--completed');
    const toDo = document.querySelector('.task-filter__btn--incomplete'); // querySelector returns just the first matching elem, no arr
    const toCelebrate = document.querySelector('.task-filter__btn--complete');

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
});



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

