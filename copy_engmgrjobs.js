function get_company_text(selected_card) {
    job_metadata = selected_card.querySelector("p.leading-relaxed");
    metadata_text = job_metadata.textContent;
    
    left_bound = "Company:"
    right_bound = "Posted:"

    // Define the bounding substrings
    const companySubstring = "Company:";
    const postedSubstring = "Posted:";

    // Regular expression to match the company-name
    const regex =  new RegExp(`${companySubstring}(.*)`);
    const match = metadata_text.match(regex);

    extractedText = "ERROR; SEE CONSOLE"
    if (match && match[1]) {
        extractedText = match[1].trim();
    } else {
        console.error("Couldn't extract company name");
    }

    return extractedText
}


function copy_job_details() {
    
    console.log("Copying from Engmgrjobs...")
    selected_card = document.querySelector('div.container.py-24')
    if(selected_card === null) {
        alert("Couldn't find outer container!")
    }
    console.log(selected_card)
    title = selected_card.querySelector('h2').textContent.trim()
    console.log(title)
    company = get_company_text(selected_card).trim()
    console.log(company)
    link = window.location.href
    console.log(link)
    return text_to_copy = [company, title, "Engmgrjobs", link, "", format_date(new Date())].join("\t")
}

function copy_resume_keywords() {
    job_descrption = document.getElementsByClassName("content")[0].textContent
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        return keywords.join("\r\n")
    })
}