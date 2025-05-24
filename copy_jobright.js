function copy_job_details() {
    console.log("Copying from Jobsright...")
    selected_card = document.querySelector("div.index_jobDetailContent__8y0CT")
    if(selected_card === null) {
        alert("No card selected!")
    }
    console.log(selected_card)
    title = selected_card.querySelector("h1.index_job-title__sStdA").textContent
    console.log(title)
    company = selected_card.querySelector('h2.index_company-row__vOzgg>strong').textContent
    console.log(company)
    link = window.location.href
    console.log(link)
    return text_to_copy = [company, title, "Jobright", link, "", format_date(new Date())].join("\t")
}

function extractTerms(arr) {
    return arr.flatMap(item => {
        const match = item.match(/^(.*) \((.*)\)$/);
        return match ? [match[1], match[2]] : [item];
    });
}



function copy_resume_keywords() {
    responsibilities = document.querySelector("section.index_sectionContent__zTR73:nth-child(3) > div:nth-child(1) > h2:nth-child(2)").parentElement.parentElement.textContent
    required = document.querySelector("div.index_flex-col__Y_QL8:nth-child(4)").textContent
    try {
        preferred = document.querySelector("div.index_flex-col__Y_QL8:nth-child(5)").textContent
    } catch (error) {
        console.debug("No preferred qualifications found...")
        preferred = ""
    }
    

    job_descrption = responsibilities + "\r\n" + required + "\r\n" + preferred
    console.log("Job description extracted as: " + job_descrption)
    const keywords_promise = GetKeywordsFromJobDescription(GetToken(), job_descrption)
    return keywords_promise.then(keywords=>{
        console.debug("Getting keywords from bullets...")
        bullets_section = document.querySelectorAll("#skills-section > div")[1]
        bullets = bullets_section.querySelectorAll("span")
        bullets.forEach(b => {
            keywords.push(b.textContent)
        });
        keywords = extractTerms(keywords)
        return keywords.join("\r\n")
    })
}

function copy_resume_keywords_old() {
    return new Promise((resolve, reject) => {
        console.debug("Copy resume keywords in copy_jobright.js")
        bullets_section = document.querySelectorAll("#skills-section > div")[1]
        bullets = bullets_section.querySelectorAll("span")
        skills = []
        bullets.forEach(b => {
            skills.push(b.textContent)
        });

        return_value =  skills.join("\r\n")
        resolve(return_value)
    })      
}