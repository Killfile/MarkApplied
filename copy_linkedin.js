//import { GetKeywordsFromJobDescription } from "./chatgpt.js"
//import { GetToken } from "./chatgpt_token.js"

function copy_job_details() {
    console.log("Copying from LinkedIn...")
    const title_element = document.querySelector("h1.t-24")
    title = title_element.textContent
    console.debug("Found title: " + title_element)
    const company_element = document.querySelector("div.job-details-jobs-unified-top-card__company-name a") //a..app-aware-link
    company = company_element.textContent
    console.debug("Found company: " + company_element)
    link = window.location
    text_to_copy = [company, title, "LinkedIn", link, "", format_date(new Date())].join("\t")
    return text_to_copy
}

function copy_job_description() {
    job_descrption = document.getElementById("job-details").textContent
    return job_descrption
}

function copy_resume_keywords() {
    job_descrption = copy_job_description()
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        return keywords.join("\r\n")
    })
}


setInterval(function(){
    let follow_company = document.querySelector("#follow-company-checkbox")
    if(follow_company != null) {
        follow_company.checked = false
    }
},1000)