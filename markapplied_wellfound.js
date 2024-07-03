function add_to_card(container) {
    endcap = container.querySelector("div.col-12.col-lg-6")
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
    console.debug("markapplied_wellfound:style_page")
    allContainers = document.querySelectorAll('div[data-test="StartupResult"]')
    let promises = []
    for(i=0;i<allContainers.length;i++) {
        company_element = allContainers[i].querySelector("h2")
        company_text = company_element.textContent.trim()
        if (array_matches_company_name(company_text).length > 0) {
            promises.push(style_on_company_match(allContainers[i], company_text))
        }
        
        allContainers[i].classList.add("smart-apply-evaluated")
    }
    Promise.allSettled(promises).then(allContainers = null)
}


function style_on_company_match(company_container, company_text) { 
    // console.debug("Applied to at least one job at " + company_text)
    company_element.classList.add("smart_apply_match")
    company_container.classList.add("applied")
    title_cards = company_container.querySelectorAll("div.styles_component__Ey28k")
    for (j = 0; j < title_cards.length; j++) 
    {
        if (title_cards[j] !== undefined) {
            style_title_card(title_cards[j], company_text)
        }
    }
}

function style_title_card(title_card, company_text) {
    title_element = title_card.querySelector("span.styles_title__xpQDw")
    console.debug(title_element)
    title_text = title_element.textContent.trim()
    if (array_matches_title(company_text, title_text).length > 0) 
    {
        title_card.classList.add("applied")
        title_card.classList.add("title_applied")
    }
    else 
    {
        // console.debug("\tApplied to " + company_text + " but not as " + title_text)
    }
    title_card.classList.add("smart-apply-evaluated")

}
