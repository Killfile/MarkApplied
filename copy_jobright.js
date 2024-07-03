function copy_job_details() {
    console.log("Copying from Jobsright...")
    selected_card = document.querySelector("div.index_jobDetailContent__8y0CT")
    if(selected_card === null) {
        alert("No card selected!")
    }
    console.log(selected_card)
    title = selected_card.querySelector("h1.index_job-title__sStdA").textContent
    console.log(title)
    company = selected_card.querySelector('h2.index_company-row__vOzgg>strong').textContent
    console.log(company)
    link = window.location.href
    console.log(link)
    return text_to_copy = [company, title, "Jobright", link, "", format_date(new Date())].join("\t")
}