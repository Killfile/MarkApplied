

const hidePage = `body > :not(.beastify-image) {
    display: none;
  }`;


console.log("Root copy-clicker.js")

function listenForClicks() {
    console.log("listenForClicks")
    document.addEventListener("click", (e) => {
        
        
      /**
       * Insert the page-hiding CSS into the active tab,
       * then get the beast URL and
       * send a "beastify" message to the content script in the active tab.
       */
      function smartapply(tabs) {
        console.debug("smartapply fucnction sees location as: " +  window.location)
        browser.tabs.sendMessage(tabs[0].id, {
            command: "smartapply"
          });
        // browser.tabs.insertCSS({ code: hidePage }).then(() => {
        //   browser.tabs.sendMessage(tabs[0].id, {
        //     command: "smartapply"
        //   });
        // });
      }

      function copy_skills(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {command: "copy_skills"})
      }

      function generate_resume(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {command: "generate_resume"})
      }
  
      /**
       * Remove the page-hiding CSS from the active tab,
       * send a "reset" message to the content script in the active tab.
       */
      function reset(tabs) {
        browser.tabs.insertCSS({ code: hidePage }).then(() => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "reset",
          });
        });
      }
  
      /**
       * Just log the error to the console.
       */
      function reportError(error) {
        console.error(`Could not smartapply: ${error}`);
      }
  
      /**
       * Get the active tab,
       * then call "smartapply()" or "reset()" as appropriate.
       */
      if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
        console.error("Clicked on something that's not a button or isn't in the #popup-content element")
        // Ignore when click is not on a button within <div id="popup-content">.
        return;
      }

      if (e.target.type === "reset") {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(reset)
          .catch(reportError);
      }
      else if (e.target.id === "copy_skills") {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(copy_skills)
          .catch(reportError);
      }
      else if (e.target.id === "generate_resume") {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(generate_resume)
          .catch(reportError);
      }
      else {
        console.error("Non-reset path in copy-clicker.js:listenForClicks")
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(smartapply)
          .catch(reportError);
      }
    });
  }
  

//browser.tabs.insertCSS("snackbar.css")

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}


browser.tabs
    .executeScript({file: "/content_scripts/cc_content_script.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError)

    //# sourceURL=popup\copy-clicker.js