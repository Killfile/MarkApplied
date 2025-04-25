function GetKeywordsFromJobDescription(token, job_description) {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + token
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "developer",
                    "content": "You identify the ten most important keywords that hiring managers are likely to search for when identifying high quality candidates for a given job description. You pay close attention to programing languages, frameworks, software products, processes, and areas of experience."
                },
                {
                    "role": "user",
                    "content": job_description
                }
            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "keyword_schema",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "keywords": {
                                "type": "array",
                                "description": "The keywords extracted from the input",
                                "items": {
                                    "type": "string"
                                }
                            }
                        },
                        "required": ["keywords"],
                        "additionalProperties": false
                    },
                    "strict": true
                }
            }
        })


    }).then(response => {
        console.log("Response follows:")
        return response.json()
       
    }).then(data=>{
        console.log("Data follows:")
        console.log(data)
        console.log("typeof data: " + typeof data)
        console.log("data keys: " + Object.keys(data))
        var result_str = data['choices'][0].message.content
        console.log(result_str)
        var parsed = JSON.parse(result_str)
        return parsed.keywords
        
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

