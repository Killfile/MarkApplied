const search_string_for_append = "span.index_apply-time__mm_bL"

function style_for_company_match(matches, company_text_element, outer_job_container) {
    company_text_element.classList.add("smart_apply_match")
    outer_job_container.classList.add("applied")
    
    let last = matches.length - 1
    let application = new JobApplication(matches[last])
    let container = outer_job_container.querySelector(search_string_for_append)
    prev_matches = container.querySelectorAll('p[added_by_markapplied="true"]')
    prev_matches.forEach((element)=>element.remove())
    let p = document.createElement("p")
    p.setAttribute("added_by_markapplied","true")
    container.appendChild(p)
    p.appendChild(document.createTextNode("Applied as: " + application.to_string()))

}

function style_for_company_and_title_match(matches, title_text_element, outer_job_container) {
    title_text_element.classList.add("smart_apply_title_match")
    outer_job_container.classList.add("title_applied")
    outer_job_container.classList.add("applied")
    let application = new JobApplication(matches[0])
    container = outer_job_container.querySelector(search_string_for_append)
    prev_matches = container.querySelectorAll('p[added_by_markapplied="true"]')
    prev_matches.forEach((element)=>element.remove())
    let p = document.createElement("p")
    p.setAttribute("added_by_markapplied","true")
    container.appendChild(p)
    p.appendChild(document.createTextNode("Applied as: " + application.to_string()))
}

function style_page() {
    console.debug("markapplied_jobright:style_page")
    allContainers = document.querySelectorAll("div.index_job-card__AsPKC")
    console.debug("allContainers length"+allContainers.length)
    let promises = []
    for(i=0;i<allContainers.length;i++) {
        company_span = allContainers[i].querySelector('div.index_company-name__gKiOY')
        company_text = company_span.textContent.trim()
        let title_a = allContainers[i].querySelector("h2.index_job-title__UjuEY")
        let title_text = title_a.textContent.trim()
//        on_company_match(company_text, company_span, allContainers[i], style_for_company_match)
        promises.push(
            on_match(company_text, title_text, company_span, title_a, allContainers[i], style_for_company_match, style_for_company_and_title_match))
        allContainers[i].classList.add("smart-apply-evaluated")
    }
    Promise.allSettled(promises).then(allContainers = null)
}