(() => {

    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
    
    console.log("content script fired")

    
    function copy_to_clipboard(text) {
        title = document.querySelector("div")
        g = document.createElement("textarea");
        g.setAttribute("type","text");
        g.setAttribute("id", "copy_clicker_input")
        g.innerHTML = text
        g.setAttribute("value", text)
        title.parentNode.insertBefore(g,title) 
        g.select()
        if (document.execCommand("copy")) {
            console.log("Adding \"" + g.innerHTML + "\" to cliboard")
        }
        else {
            console.log("Couldn't copy text")
        }
        g.remove()
        //return navigator.clipboard.writeText(text)
    }

    function generate_resume(skills, company, title) {
      url = window.location.origin
      if (url.includes("linkedin") === true) 
        { 
          generate_resume_by_get(skills, company, title)
        }
        else 
        { 
          generate_resume_by_post(skills, company, title, true) //add true to use fetch
        }
    }

    function generate_resume_by_get(skills, company, title) {
      array_argument = "[\"" + skills.replaceAll("\r\n","\",\"") + "\"]"
      window.open("http://localhost:5000/compute_intersection/"+company+"/"+title+"?skills="+array_argument,'_blank').focus()

    }

    function postRedirect(url, data) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      form.target = "_blank"

      // Add data as hidden inputs
      for (const key in data) {
          if (data.hasOwnProperty(key)) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
          }
      }

      document.body.appendChild(form);
      form.submit();
    }

    function postDataByFetch(url, data) {
      browser.runtime.sendMessage({
        action: "sendData",
        url: url,
        data: data
      }).then(response => {
        console.log("Server response received in popup:", response);
        window.open("http://localhost:5000/compute_intersection/"+response.response, "_blank")
      }).catch(error => console.error("Message error:", error));
    }
  

    function generate_resume_by_post(skills, company, title, useFetch=false) {
      array_argument = "[\"" + skills.replaceAll("\r\n","\",\"") + "\"]"
      
      if(useFetch == false)
        {
          url = "http://localhost:5000/start_resume/"
          data = {
            "skills": array_argument,
            "company": company,
            "title": title,
          }
          postRedirect(url, data)
        }
        else
        {
          url = "http://localhost:5000/start_resume_by_fetch/"
          data = {
            "skills": JSON.parse(array_argument),
            "company": company,
            "title": title,
          }
          postDataByFetch(url,data)
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "insertBeast()" or "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
      console.debug("cc_content_script.js recieved message: " + message.command)

      switch(message.command) {
        case "smartapply":
          try 
            {
                text_to_copy = copy_job_details()
                copy_to_clipboard(text_to_copy)
                blink_snackbar("Job details copied!")
            }
            catch(error) {
                console.error(error)
                text_to_copy = "Unable to to copy: " + error
            }
            break;
        case "copy_skills":
          try {
            text_to_copy = copy_resume_keywords().then(text=>copy_to_clipboard(text)).then( blink_snackbar("Keywords copied!"))
          }
          catch(error) {
            console.error(error)
            text_to_copy = "Unable to to copy: " + error
          }
        break;
        case "generate_resume":
          try {
            job_details = copy_job_details().split("\t")
            console.info("Found deets: " + job_details)
            company = job_details[0]
            title = job_details[1].replace("/"," or ")
            text_to_copy = copy_resume_keywords()
              .then( blink_snackbar("Launching Resazine..."))
              .then(skills=>skills.replaceAll("C#","C%23"))
              .then(skills=>generate_resume(skills, company, title))
          }
          catch(error) {
            console.error(error)
            text_to_copy = "Unable to to copy: " + error
          }
      }

      /* console.log("!Message: "+ message.command)
      url = window.location.host
      console.log(url)
      switch(true) {
        default:
            console.log("No matching sites found; trying strategy...")
            try 
            {
                text_to_copy = copy_job_details()
            }
            catch(error) {
                console.error(error)
                text_to_copy = "Unable to to copy: " + error
            }
      } */
      
      
      
      

    
    //   if (message.command === "beastify") {
    //     insertBeast(message.beastURL);
    //   } else if (message.command === "reset") {
    //     removeExistingBeasts();
    //   }
    });
  })();
  