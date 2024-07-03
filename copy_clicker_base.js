function format_date(datestamp) {
    month = datestamp.getMonth()+1
    day = datestamp.getDate()
    year = datestamp.getFullYear()
    return month + "/" + day + "/" + year
}