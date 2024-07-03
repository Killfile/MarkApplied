//heading6 
function add_to_card(container) {
    endcap = container.querySelector('divdiv.heading6')
    new_paragraph = document.createElement("p")
    endcap.appendChild(new_paragraph)
    return new_paragraph
}

function add_last_applied(container, date) {
    new_paragraph = add_to_card(container)
    new_paragraph.appendChild(document.createTextNode("Applied on " + date))
}

function add_last_applied_as(container, title, date) {
    new_paragraph = add_to_card(container)
    new_paragraph.appendChild(document.createTextNode("Last applied as " + title + " on " + date))
}

function style_for_company_match(matches, company_text_element, outer_job_container) {
    company_text_element.classList.add("smart_apply_match")
    outer_job_container.classList.add("applied")
    add_last_applied_as(outer_job_container,matches[0].title, matches[0].applied)
}

function style_for_company_and_title_match(matches, title_text_element, outer_job_container) {
    title_text_element.classList.add("smart_apply_title_match")
    outer_job_container.classList.add("title_applied")
    outer_job_container.classList.add("applied")
    add_last_applied(outer_job_container, matches[0].applied)
}

function style_page() {
    console.debug("markapplied_indeed:style_page")
    allContainers = document.querySelectorAll("div.cardOutline>div.slider_container:not(.smart-apply-evaluated)")
    console.debug("allContainers length"+allContainers.length)
    let promises = []
    for(i=0;i<allContainers.length;i++) {
        company_span = allContainers[i].querySelector('span[data-testid="company-name"]')
        company_text = company_span.textContent.trim()
        title_a = allContainers[i].querySelector("a.jcs-JobTitle")
        title_text = title_a.textContent.trim()
        promises.push(on_match(company_text, title_text, company_span, title_a, allContainers[i], style_for_company_match, style_for_company_and_title_match))
        allContainers[i].classList.add("smart-apply-evaluated")
    }
    Promise.allSettled(promises).then(allContainers = null)
}