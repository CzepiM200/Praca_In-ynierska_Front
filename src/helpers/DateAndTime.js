export const GetFullDate = (date, time) => {
    let fullDate = new Date(Date.parse(`${date}`));
    fullDate.setHours(time.slice(0, 2));
    fullDate.setMinutes(time.slice(3, 5));
    return fullDate
}

export const GetTimeDifferenceInMinutes = (startDate, startTime, endDate, endTime) => {
    const tempStartDate = GetFullDate(startDate, startTime)
    const tempEndDate = GetFullDate(endDate, endTime)
    return Math.abs(tempEndDate - tempStartDate)/(1000 * 60)
} 

export const ConvertSecToNormalTime = (sec) => {
    const hours = Math.floor(sec/60)
    const minutes = sec%60
    if(hours !== 0)
        return `${hours} h ${minutes} min`
    else 
        return `${minutes} min`
}

export const CalculateEndDate = (start, duration) => {
    console.log(start);
    //console.log(duration);
    const year = start.slice(0,4)
    const month = start.slice(5, 7)
    const day = start.slice(8, 10)
    const hour = start.slice(11, 13)
    const minute = start.slice(14, 16)
    const second = start.slice(17, 19)
    const startDate = new Date(year, month-1, day, hour, minute, second)
    const endDate = new Date(startDate.getTime() + Math.floor(duration*60000))
    console.log(startDate); 
    console.log(endDate);
    console.log(endDate.toDateString());
    
    let endDay = "";
    if(endDate.getDate() < 10)
      endDay = `0${endDate.getDate()}`
    else 
      endDay = endDate.getDate();

    let endMonth = "";
    if(endDate.getMonth() < 10)
      endMonth = `0${endDate.getMonth()}`
    else 
      endMonth = endDate.getMonth();

    let endHour = "";
    if(endDate.getHours() < 10)
      endHour = `0${endDate.getHours()}`
    else 
      endHour = endDate.getHours();

    let endMinute = "";
    if(endDate.getMinutes() < 10)
      endMinute = `0${endDate.getMinutes()}`
    else 
      endMinute = endDate.getMinutes();

    let endSeconds = "";
    if(endDate.getSeconds() < 10)
      endSeconds = `0${endDate.getSeconds()}`
    else 
      endSeconds = endDate.getSeconds();
    
    const endDateString = `${endDate.getFullYear()}-${endMonth}-${endDay} ${endHour}:${endMinute}:${endSeconds}`;
    return endDateString
}