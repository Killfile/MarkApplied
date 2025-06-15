function copy_job_details() {
    console.log("Copying from Wellfound...")
    selected_card = document.querySelector('div[data-test="JobListingSlideIn"]')
    if(selected_card === null) {
        alert("Couldn't find outer container!")
    }
    console.debug("Card:" + selected_card)
    title = selected_card.querySelector(".mt-4").textContent
    console.debug("Title: " + title)
    company_element = selected_card.querySelector('div.items-center.flex > div.ml-4 span')
    
    company = company_element.textContent
    console.debug("Company: " + company)
    link = window.location.href
    console.debug("Link: "+ link)
    return text_to_copy = [company, title, "Wellfound", link, "", format_date(new Date())].join("\t")
}

function copy_job_description() {
    job_descrption = document.getElementById("job-description").textContent
    return job_descrption
}

function copy_resume_keywords() {
    job_descrption = copy_job_description()
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        return keywords.join("\r\n")
    })
}