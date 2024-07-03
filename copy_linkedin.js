function copy_job_details() {
    console.log("Copying from LinkedIn...")
    const title_element = document.querySelector("h1.t-24")
    title = title_element.textContent
    console.debug("Found title: " + title_element)
    const company_element = document.querySelector("div.job-details-jobs-unified-top-card__company-name a.app-aware-link")
    company = company_element.textContent
    console.debug("Found company: " + company_element)
    link = window.location
    text_to_copy = [company, title, "LinkedIn", link, "", format_date(new Date())].join("\t")
    return text_to_copy
}

setInterval(function(){
    let follow_company = document.querySelector("#follow-company-checkbox")
    if(follow_company != null) {
        follow_company.checked = false
    }
},1000)