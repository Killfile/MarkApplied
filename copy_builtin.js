function copy_job_details() {
    console.log("Copying from BuiltIn...")
    selected_card = document.querySelector("div.l-content.right")
    if(selected_card === null) {
        alert("Couldn't find outer container!")
    }
    console.log(selected_card)
    title = selected_card.querySelector("h1.node-title").textContent
    console.log(title)
    company_element = selected_card.querySelector('div.company-title') ?? selected_card.querySelector("div.job-info>div.company-info>div")
    
    company = company_element.textContent
    console.log(company)
    link = window.location.href
    console.log(link)
    return text_to_copy = [company, title, "Builtin", link, "", format_date(new Date())].join("\t")
}