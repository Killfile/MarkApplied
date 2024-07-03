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
        g = document.createElement("input");
        g.setAttribute("type","text");
        g.setAttribute("id", "copy_clicker_input")
        g.setAttribute("value", text)
        title.parentNode.insertBefore(g,title) 
        g.select()
        if (document.execCommand("copy")) {
            console.log("Adding \"" + text + "\" to cliboard")
        }
        else {
            console.log("Couldn't copy text")
        }
        g.remove()
        //return navigator.clipboard.writeText(text)
    }

    /**
     * Listen for messages from the background script.
     * Call "insertBeast()" or "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
      
      console.log("!Message: "+ message.command)
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
      }
      
      copy_to_clipboard(text_to_copy)
      
      

    
    //   if (message.command === "beastify") {
    //     insertBeast(message.beastURL);
    //   } else if (message.command === "reset") {
    //     removeExistingBeasts();
    //   }
    });
  })();
  