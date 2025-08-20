setInterval(showTime, 1000);

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
}

showTime();