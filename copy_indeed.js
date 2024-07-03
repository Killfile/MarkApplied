function copy_job_details() {
    console.log("Copying from Indeed...")
    selected_card = document.querySelector("div.vjs-highlight")
    if(selected_card === null) {
        alert("No card selected!")
    }
    console.log(selected_card)
    title = selected_card.querySelector("a.jcs-JobTitle>span").textContent
    console.log(title)
    company =selected_card.querySelector('span[data-testid="company-name"]').textContent
    console.log(company)
    link = selected_card.querySelector("a.jcs-JobTitle").href
    console.log(link)
    return text_to_copy = [company, title, "Indeed", link, "", format_date(new Date())].join("\t")
}