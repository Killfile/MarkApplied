var mem_cache = []
function _add_to_mem_cache_override(jobs) {
    let new_cache = []
    jobs.forEach(function(item,index,array) {
        app = {
            id: item[0],
            company: item[1],
            title: item[2],
            applied: item[3],
            rejected: item[4],
            withdrew: item[5],
            offer: item[6],
            interview: item[7]
        }
        new_cache.push(app)
    })
    mem_cache = new_cache
}

function _add_to_db_override(jobs) {
    //noop 
}

function style_for_company_match(matches, company_text_element, outer_job_container) {
   
    company_text_element.classList.add("smart_apply_match")
    outer_job_container.classList.add("applied")
    let bullets = outer_job_container.querySelector("ul.job-card-list__footer-wrapper:not(.smart-apply-evaluated)")
    if (bullets != null) {
        //let prev_matches = bullets.querySelectorAll('li[added_by_markapplied="true"]')
        //prev_matches.forEach((element)=>element.remove())
        let li = document.createElement("li")
        li.classList.add("job-card-container__footer-item")
        li.classList.add("inline-flex")
        li.classList.add("align-items-center")
        li.setAttribute("added_by_markapplied","true")
        bullets.appendChild(li)
        bullets.classList.add("smart-apply-evaluated")
        let last = matches.length - 1
        let application = new JobApplication(matches[last])
        let app_string = application.to_string()
        li.appendChild(document.createTextNode("Applied: " + app_string))
    }
        
}

function style_for_company_and_title_match(match, title_text_element, outer_job_container) {

    title_text_element.classList.add("smart_apply_title_match")
    outer_job_container.classList.add("title_applied")
    outer_job_container.classList.add("applied")
    let bullets = outer_job_container.querySelector("ul.job-card-list__footer-wrapper:not(.smart-apply-evaluated)")
    if (bullets != null) {
        //let prev_matches = bullets.querySelectorAll('li[added_by_markapplied="true"]')
        //prev_matches.forEach((element)=>element.remove())
        //prev_matches = null
        let li = document.createElement("li")
        li.classList.add("job-card-container__footer-item")
        li.classList.add("inline-flex")
        li.classList.add("align-items-center")
        li.setAttribute("added_by_markapplied","true")
        bullets.appendChild(li)
        bullets.classList.add("smart-apply-evaluated")
        let application = new JobApplication(match)
        let app_string = application.to_string()
        li.appendChild(document.createTextNode("Applied: " + app_string))
    }
}

var allContainers = []


function style_page() {
    console.debug("markapplied_linkedin:style_page")
    allContainers = document.querySelectorAll("div.job-card-container:not(.smart-apply-evaluated)")
    for(i=0;i<allContainers.length;i++) {
        let company_span = allContainers[i].querySelector("span.job-card-container__primary-description")
        let company_text = sanatize(company_span.textContent.trim())
        let title_container = allContainers[i].querySelector("a.job-card-container__link")
        let title_drilldown = title_container.querySelector("span>strong")
        let title_text = sanatize(title_drilldown.textContent.trim())
        allContainers[i].classList.add("smart-apply-evaluated")
        company_and_title_match = mem_cache.find(app=>app.company == company_text && app.title == title_text)
        if( company_and_title_match === undefined) {
            company_match = mem_cache.filter(app=>app.company == company_text)
            if(company_match.length > 0) {
                style_for_company_match(company_match,company_span,allContainers[i])
            }
        }
        else {
            style_for_company_and_title_match(company_and_title_match,title_drilldown,allContainers[i])
            //Company and Title Match
        }
    }
               
}
