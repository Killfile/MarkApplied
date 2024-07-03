const csv_url = "LINK TO YOUR PUBLISHED CSV OUTPUT FROM GOOGLE SHEETS GOES HERE"

/*
about:debugging#/runtime/this-firefox
*/


function trim(str, ch) {
    let start = 0, 
        end = str.length;

    while(start < end && str[start] === ch)
        ++start;

    while(end > start && str[end - 1] === ch)
        --end;

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

function array_trim(arr, index, ch) {
    for (let i = 0; i < arr.length; i++) {
        arr[i][index] = trim(arr[i][index], ch);
    }
    return arr
}




snackbar = document.createElement("div")
snackbar.setAttribute("id","snackbar")
snackbar.className = "snackbar"
document.body.appendChild(snackbar)

function blink_snackbar(message) {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");
    x.innerText = message
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  } 



var applied_jobs = []
var applied_jobs_array = []


function add_to_db(jobs) {
    if(typeof(_add_to_db_override) == "function")
    {
        _add_to_db_override(jobs)
    }
    else {
        let transaction = create_transaction([applications_table], "readwrite")
        

        transaction.oncomplete = (event) => { console.log("Transaction done!")}
        transaction.onerror = (event) => { console.error("Transaction failed")}
        trans_objectStore = transaction.objectStore(applications_table) 
        //trans_objectStore.clear()
        for(i=0;i<jobs.length;i++) {
            app = {
                id: jobs[i][0],
                company: jobs[i][1],
                title: jobs[i][2],
                applied: jobs[i][3],
                rejected: jobs[i][4],
                withdrew: jobs[i][5],
                offer: jobs[i][6],
                interview: jobs[i][7]
            }

            trans_objectStore.put(app)
        }
    }
}

function add_to_mem_cache(jobs) {
    if(typeof(_add_to_mem_cache_override) === "function") {
        _add_to_mem_cache_override(jobs)
    }
    else {
        console.log("No meme-cache is defined")
    }
}

class JobApplication {
    constructor(db_record) {
        this.record = db_record
    }

    get_status() {
        if(this.record.withdrew != "")
            return "Withdrew " + this.record.withdrew
        else if(this.record.offer != "")
            return "Offer " + this.record.offer
        else if(this.record.rejected != "")
            return "Rejected " + this.record.rejected
        else if(this.record.interview != "")
            return "Interviewing"
        else
            return "Pending " + this.record.applied 
    }

    to_string() {
        return this.record.title + " ["+this.get_status()+"]"
    }
}

function make_fetch_happen() {
    
    console.log("Fetching...")
    blink_snackbar("Fetching...")
    return fetch(csv_url)
        .then(r=>{
            return r.text()})
        .then((r)=>{
            return r.split("\r\n"); 
            })
        //.then((r) => {applied_jobs = r.map(item => item.split(/,(.*)/s)); return applied_jobs})
        .then((r)=> {
            return r.map(item=>item.split(",")); 
            })
        .then((r)=>{
            return r.map(item=> trim(item, '"'));
            //return array_trim(r,1,'"'); 
            })
        .then((r)=>{
            add_to_db(r);
            add_to_mem_cache(r)
            applied_jobs = r 
            //window.setInterval(styleSpans, 2000)
        })
}


class cache_update {
    parent_cache = null

    constructor(cache) {
        this.parent_cache = cache
    }
    then(passed_in_function) {
        let value = make_fetch_happen().then(passed_in_function())
        this.parent_cache.update_cache_time()
    }
  }

class null_pattern_update {
    then(passed_in_function) {
        passed_in_function()
    }
}
  
class cache {
    stale_interval = 5 * 60 * 1000
    cachetime = 0;
    _cache_update = null
    _null_pattern_update = null

    constructor() {
        this._cache_update = new cache_update(this)
        this._null_pattern_update = new null_pattern_update()
    }

    _cache_age() {
        return Date.now() - this.cachetime
    }

    _cache_is_stale() {
        return this._cache_age() > this.stale_interval
    }
    
    update_cache_time() {
        this.cachetime = Date.now()
    }

    check_and_update() {
        if (this._cache_is_stale()) {
            console.log("CACHE UPDATE!!!")
            return this._cache_update
        }
        else {
            console.debug("cache is good: " + this._cache_age())
            return this._null_pattern_update

        }
        
    }
  }


function legacy_style_spans() {
    let allSpans = document.querySelectorAll("span.job-card-container__primary-description:not(.smart-apply-evaluated)")
    //console.log("Checking application status for " + allSpans.length + " jobs")
    for(let i=0;i<allSpans.length;i++) {
        if(!allSpans[i].classList.contains("applied") && !allSpans[i].classList.contains("not-applied")) { 
            company_name = allSpans[i].textContent.trim()
            if (applied_jobs.includes(company_name)) {
                allSpans[i].classList.add("applied")
            }
            else {
                //console.log("Have not applied to:" + company_name)
            }
            allSpans[i].classList.add("smart-apply-evaluated")
        }
    }
}

function sanatize(text) {
    return text.replace(",","")
}



function on_company_match(company_name, company_text_element, outer_job_container, callback) {
    let transaction = create_transaction([applications_table], "readonly")
    let foo = transaction.objectStore(applications_table).getAll().onsuccess = (event) => { 
        let query_result = event.target.result
        let company_matches = query_result.filter((r)=> r.company == sanatize(company_name))
        
        if (company_matches.length > 0) {
            console.debug("Company match on " + company_name + " == " + company_matches[0].company)
            callback(company_matches, company_text_element, outer_job_container)
        }
        else
            console.debug("No matches for " + company_name)
    }
}

function on_match_inner(query_result, company_name, title, company_text_element, title_text_element, outer_job_container, company_callback, title_callback) 
{
    const sanitized_company_name = sanatize(company_name);
    const sanitized_title = sanatize(title);
    let matches = query_result.filter((r)=> r.company == sanitized_company_name && r.title == sanitized_title)
    
    if (matches.length > 0) {
        console.debug("Title match on " + company_name + "/" + title + " == " + matches[0].company + "/" + matches[1])
        title_callback(matches, title_text_element, outer_job_container)
    }
    else
    {
        console.debug("No matches for " + title + " at " + company_name)
        matches = query_result.filter((r)=> r.company == sanitized_company_name)
        if(matches.length > 0)
            company_callback(matches, company_text_element, outer_job_container)
    }   
}

function get_all_applications_from_db() {
    return new Promise(
        function(resolve,reject) 
        {
            let transaction = create_transaction([applications_table], "readonly")
            const request = transaction.objectStore(applications_table).getAll();
            request.onsuccess = function(event) { resolve(event.target.result) }
            request.onerror = function(event) {console.error(event)}
        })
}


function on_match(company_name, title, company_text_element, title_text_element, outer_job_container, company_callback, title_callback) {
    return new Promise(function(resolve, reject){
        let transaction = create_transaction([applications_table], "readonly")
        transaction.objectStore(applications_table).getAll().onsuccess = (event) => { 
            let query_result = event.target.result
            const sanitized_company_name = sanatize(company_name);
            const sanitized_title = sanatize(title);
            let matches = query_result.filter((r)=> r.company == sanitized_company_name && r.title == sanitized_title)
            
            if (matches.length > 0) {
                console.debug("Title match on " + company_name + "/" + title + " == " + matches[0].company + "/" + matches[1])
                new Promise(function(resolve,reject) {
                    console.log("Title Callback is: " + title_callback)
                    title_callback(matches, title_text_element, outer_job_container)
                    resolve()
                }).then(resolve())
            }
            else
            {
                console.debug("No matches for " + title + " at " + company_name)
                let matches = query_result.filter((r)=> r.company == sanitized_company_name)
                if(matches.length > 0)
                    new Promise(function(resolve,reject) {
                    company_callback(matches, company_text_element, outer_job_container)
                    resolve()
                }).then(resolve())
            }    
        }
    })
}

function array_matches_company_name(company_name) {   
    const returnValue = applied_jobs.filter(row => row[1] === sanatize(company_name));
    //return company_matches
    return returnValue
}

function array_matches_title(company_name, title) {
    const returnValue = applied_jobs.filter(row => row[1] === sanatize(company_name) && row[2] === sanatize(title));
    return returnValue
}

markapplied_cache = new cache()

function styleSpans() {
    console.debug("styleSpans...")
    try {
        value = markapplied_cache.check_and_update().then(style_page)
        console.log("Returned Value from cache update...")
        console.log(value)
    }
    catch (error) {
        console.error("Error in style strategy: " + error)
    }
    
    
}
console.debug("Markapplie.js root level code fired")
window.setInterval(styleSpans, 2000)
//var coloring_interval = window.setInterval(styleSpans, 2000)

//setInterval(styleSpans, 2000)