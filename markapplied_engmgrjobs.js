function get_raw_text_from_element(element) {
    text = ""
    for (var i = 0; i < element.childNodes.length; ++i)
        if (element.childNodes[i].nodeType === Node.TEXT_NODE)
            text += element.childNodes[i].textContent;
    
    return text
}

function sanitize_company_name(company_name) {
    return company_name.replaceAll("—","")
}

function add_to_endcap(container) {
    endcap = container.querySelector("div.items-start")
    new_paragraph = document.createElement("p")
    endcap.appendChild(new_paragraph)
    
    return new_paragraph
}

function add_last_applied(container, date) {
    new_paragraph = add_to_endcap(container)
    new_paragraph.appendChild(document.createTextNode("Applied on " + date))
}

function add_last_applied_as(container, title, date) {
    new_paragraph = add_to_endcap(container)
    new_paragraph.appendChild(document.createTextNode("Last applied as " + title + " on " + date))
}

function style_page() {
    console.debug("markapplied_engmrgjobs:style_page")
    allContainers = document.querySelectorAll("a.py-6:not(.smart-apply-evaluated)")
    for(i=0;i<allContainers.length;i++) {
        company_element = allContainers[i].querySelector('p.leading-relaxed.text-gray-900')
        company_text = sanitize_company_name(get_raw_text_from_element(company_element)).trim()
        title_element = allContainers[i].querySelector("h2")
        title_text = title_element.textContent.trim()
        company_matches = array_matches_company_name(company_text)
        if(company_matches.length > 0) {
            company_element.classList.add("smart_apply_match")
            title_matches = array_matches_title(company_text, title_text)
            if(title_matches.length > 0) {
                title_element.classList.add("smart_apply_title_match")
                allContainers[i].classList.add("title_applied")
                add_last_applied(allContainers[i],title_matches[0][2])
            }
            else {
                last_app = company_matches.slice(-1)
                add_last_applied_as(allContainers[i], last_app[0][1], last_app[0][2])
            }
            allContainers[i].classList.add("applied")
        }
        allContainers[i].classList.add("smart-apply-evaluated")
    }
}