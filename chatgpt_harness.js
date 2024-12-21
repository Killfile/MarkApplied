import { GetKeywordsFromJobDescription } from "./chatgpt.js"
import { GetToken } from "./chatgpt_token.js"

const args = process.argv
GetKeywordsFromJobDescription(GetToken(), args[2])
Unable to to copy: TypeError: keywords is undefined