function copy_job_details() {
    console.log("Copying from Wellfound...")
    selected_card = document.querySelector('div[data-test="JobListingSlideIn"]')
    if(selected_card === null) {
        alert("Couldn't find outer container!")
    }
    console.log(selected_card)
    title = selected_card.querySelector('span.text-center').textContent
    console.log(title)
    company_element = selected_card.querySelector('div.text-lg')
    
    company = company_element.textContent
    console.log(company)
    link = window.location.href
    console.log(link)
    return text_to_copy = [company, title, "Wellfound", link, "", format_date(new Date())].join("\t")
}