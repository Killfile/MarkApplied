//col-12 col-lg-6

function add_to_card(container) {
    let endcap = container.querySelector("div.col-12.col-lg-6")

    let prev_matches = endcap.querySelectorAll('p[added_by_markapplied="true"]')
    prev_matches.forEach((element)=>element.remove())

    let new_paragraph = document.createElement("p")
    new_paragraph.setAttribute("added_by_markapplied","true")
    endcap.appendChild(new_paragraph)

    return new_paragraph
}

function add_last_applied(container, match) {
    let new_paragraph = add_to_card(container)
    let application = new JobApplication(match)
    new_paragraph.appendChild(document.createTextNode("Applied: " + application.to_string()))
}

function add_last_applied_as(container, matches) {
    let new_paragraph = add_to_card(container)
    let last = matches.length - 1
    let application = new JobApplication(matches[last])
    new_paragraph.appendChild(document.createTextNode("Applied as " + application.to_string()))
}

function style_for_company_match(matches, company_text_element, outer_job_container) {
    company_text_element.classList.add("smart_apply_match")
    outer_job_container.classList.add("applied")
    add_last_applied_as(outer_job_container,matches)
}

function style_for_company_and_title_match(matches, title_text_element, outer_job_container) {
    title_text_element.classList.add("smart_apply_title_match")
    outer_job_container.classList.add("title_applied")
    outer_job_container.classList.add("applied")
    add_last_applied(outer_job_container, matches[0])
}

function style_page() {
    console.debug("markapplied_builtin:style_page")
    let allContainers = document.querySelectorAll("div.job-match-item:not(#job-match-results):not(.smart-apply-evaluated)")
    let promises=[]

    for(let i=0;i<allContainers.length;i++) {
        let company_span = allContainers[i].querySelector("h2.text-pretty-blue.m-0")
        let company_text = company_span.textContent.trim()
        let title_a = allContainers[i].querySelector("h3.fw-extrabold>span")
        let title_text = title_a.textContent.trim()
        on_match(company_text, title_text, company_span, title_a, allContainers[i], style_for_company_match, style_for_company_and_title_match)
        promises.push(allContainers[i].classList.add("smart-apply-evaluated"))
    }

    Promise.allSettled(promises).then(allContainers = null)
}