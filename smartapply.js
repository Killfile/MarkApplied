

const hidePage = `body > :not(.beastify-image) {
    display: none;
  }`;





function listenForClicks() {
    document.addEventListener("click", (e) => {
        
      /**
       * Insert the page-hiding CSS into the active tab,
       * then get the beast URL and
       * send a "beastify" message to the content script in the active tab.
       */
      function smartapply(tabs) {
        browser.tabs.insertCSS({ code: hidePage }).then(() => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "smartapply"
          });
        });
      }
  
      /**
       * Remove the page-hiding CSS from the active tab,
       * send a "reset" message to the content script in the active tab.
       */
      function reset(tabs) {
        browser.tabs.removeCSS({ code: hidePage }).then(() => {
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
        // Ignore when click is not on a button within <div id="popup-content">.
        return;
      }

      if (e.target.type === "reset") {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(reset)
          .catch(reportError);
      } else {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(smartapply)
          .catch(reportError);
      }
    });
  }
  



function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
    .executeScript({file: "/content_scripts/smartapply.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError)