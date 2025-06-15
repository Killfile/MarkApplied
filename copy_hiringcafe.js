function copy_job_details() {
    console.log("Copying from HiringCafe...")    
    title = document.querySelector("h2.font-extrabold").textContent
    console.debug("Title: " + title)
    company = document.querySelector('.mb-3 > span:nth-child(1)').textContent
    console.debug("Company: " + company)
    link = document.querySelector("a.flex:nth-child(3)").href
    console.debug("Link: "+ link)
    return text_to_copy = [company, title, "HiringCafe", link, "", format_date(new Date())].join("\t")
}

function copy_job_description() {
    job_descrption = document.getElementsByTagName("article")[0].textContent
    return job_descrption
}

function copy_resume_keywords() {
    
    job_descrption = copy_job_description()
    console.debug("Found this text content:" + job_descrption)
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        return keywords.join("\r\n")
    })
}