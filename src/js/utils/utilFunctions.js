/** 格式化输出时间，输入为10位时间戳*/
function add0(m){return m<10?'0'+m:m }
export function date(shijianchuo) { //时间戳到秒即共13位
    //shijianchuo是整数，否则要parseInt转换
    let time = new Date(+shijianchuo);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
    // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
/**
 * 把形如'1495705983239'（13位）这种的形式的时间戳表示转换为周几，并输出小时数
 * 输出一个数组[周几, 小时] 周的返回0-6，0表示周日
 * 比如输入参数为"1495705983239"
 * 输出为[4, 10]，表示周四早十点
 */
export function dateToWeek(shijianchuo) {
    let myDate = new Date(+shijianchuo);
    let day = myDate.getDay() == 0 ? 7 : myDate.getDay();
    return [day, myDate.getHours()];
}
/**
 * @param {*} week 表示本周还是下周,0表示本周，1表示下周
 * @param {*} day 周几 1-7  表示周一到周日
 * @param {*} hours 时间
 * 
 * return 13位时间戳
 */
export function weekToDate(week, day, hours) {
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let oneDayLong = 24*60*60*1000;
    let aimTime = nowTime - (nowDate.getDay() - day) * oneDayLong + week * 7 * oneDayLong;
    aimTime = new Date(aimTime);
    let year = aimTime.getFullYear(), month = aimTime.getMonth(), date = aimTime.getDate();
    aimTime = new Date();
    aimTime.setFullYear(year, month, date);
    aimTime.setHours(hours);
    aimTime.setMinutes(0);
    aimTime.setSeconds(0);
    aimTime.setMilliseconds(0);
    return aimTime.getTime();
}

export function weekToDay(weekId, weekDay) {
    let curDate = new Date();
    let curDay = curDate.getDate(); 
    let curWeekDay = curDate.getDay() == 0 ? 7 : curDate.getDay();  //当前日期为周几（1-7表示周一到周日）
    let day = curDay + weekId*7 + ( weekDay - curWeekDay);
    let date = curDate.setDate(day);
    let y = curDate.getFullYear();
    let m = curDate.getMonth()+1;
    let d = curDate.getDate();
    return y+'-'+add0(m)+'-'+add0(d);
}

export function roughDate(shijianchuo) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    let now = new Date().getTime();
    let diffValue = now - +shijianchuo*1000;
    let result = '';
    if(diffValue < 0){
        result =  date(shijianchuo);
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7*day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if(monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if(weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if(dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if(hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if(minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else {
        result = "刚刚发表";
    }

    return result;
}

export function getTry(f) {
    try {
        return f();
    } catch (e) {
        console.log(e);
    }
}