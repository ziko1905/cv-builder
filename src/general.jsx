export function getYearFromMonths(months) {
    months = +months;
    const years = Math.floor(months/12);
    months = months % 12
    let retS = ""
    if (years) {
        retS = `${years} ${years == 1 ? "year" : "years"}`
        if (months) retS = retS +" and "
    }
    if (months) retS = retS + `${months} ${months == 1 ? "month" : "months"}`
    return retS
}