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