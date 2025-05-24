function copy_job_details() {
    console.log("Copying from BuiltIn...")
    selected_card = document.querySelector(".col-lg-5")
    if(selected_card === null) {
        alert("Couldn't find outer container!")
    }
    console.log(selected_card)
    title_element = selected_card.querySelector("h1")
    if(title_element == null)
        title_element = selected_card.querySelector("h3")

    title = title_element.textContent.trim()
    console.log(title)
    company_element = selected_card.querySelector('h2')
    
    company = company_element.textContent.trim()
    console.log(company)
    link = window.location.href.trim()
    console.log(link)
    return text_to_copy = [company, title, "Builtin", link, "", format_date(new Date())].join("\t")
}

function copy_resume_keywords() {
    job_descrption_element = document.querySelector(".bg-white.rounded-3.p-md.mb-sm.overflow-hidden")
    if(job_descrption_element == null) {
        job_descrption_element = document.querySelector(".col-12.col-lg-6.mb-sm.mb-lg-0") 
    }
    
    
    job_descrption = job_descrption_element.textContent
    console.log(`Found this job text:${job_descrption}`)
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        return keywords.join("\r\n")
    })
}