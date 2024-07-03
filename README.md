# MarkApplied
MarkApplied is a simple Firefox extension which marks up some common job boards with information drawn from a centralized spreadsheet.  This helps an applicant keep track of the jobs they have applied to across multiple job boards.

This code is in a pre-alpha state. It is provided entirely "as is" and without any support.

## How To Use This Code
Remember, this isn't a for-real published extension. You're going to have to clone the repository, make some changes, and then tell your browser to use it as a custom, temporary extension.

### Getting Set Up

MarkApplied depends on the user tracking applications in Google Sheets.  So, the first thing you'll need to do is set up a Google Sheet do to that.  You can find a template file here.

https://docs.google.com/spreadsheets/d/1L7wz_2Chv8lncm-fgL-SuGgmIf7oUWPWYLQLKypJn3w/edit?gid=0#gid=0

* Make your own copy of that sheet and then go to: File->Share->Publish To Web
* Select the "Published Values" sheet and set the export to "CSV".  
* Once you do, Google will give you a link where you can find your CSV exported values. Here's the export link for the above template. Yours should look pretty similar.

https://docs.google.com/spreadsheets/d/e/2PACX-1vTOkB9LGLVjQdo3Sb37JD-1A0aZdhg8TUOhuWpoDzErirTIiwWpdFeiZ8PAUa4Q2fjtndfKRewoFpAQ/pub?gid=1302876786&single=true&output=csv

### Making The Changes

Open up the `markapplied.js` file and se the `csv_url` at the top to point to your csv export link. Save your changes and you're good to go.

### Runing A Temporary Add-On

The following instructions are for Firefox because that's what was used to develop MarkApplied.  Does it work in Google Chrome? Maybe. Have I tested it? No. 

* Open up the `about:debugging#/runtime/this-firefox`.  
* Click "Load Temporary Add-On..."
* Choose literally any file from the directory containing the `markapplied.js` file.

That's it; you should be running the add-on now. 

## Worthwhile Improvements
If you find yourself with some time on your hands and want to make this project better, here are some of the features which I never got around to developing.  Open a PR and I'll be glad to merge it.

1. Better UX -- the "copy" button really should be injected into the site rather than housed in a menu off of the plugin icon.
2. More sophisticated styling -- we're literally just changing the background color of divs here.  A good designer could do so much more with this.
3. More reliable scraping -- in several sites the copy operation only works on certain pages.  It would be great if it worked everywhere.
4. Eliminating the "paste" step -- adding a row to the job tracking sheet automagically would be great. Google Forms might be a good way to go about this; alternatively there's probably an API that can manage it.
5. Cloud data -- persisting this stuff in a Google Sheets is great but a real backend with accounts and such would be even better.  
6. More boards!  Right now MarkApplied only supports BuiltIn, EngMgrJobs, Indeed, Jobright, LinkedIn, and Wellfound.
