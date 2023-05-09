require('node-fetch');
// const { systemMessage } = require("./managers");

async function fetchGPTData  (personality, messages){
    const key = process.env.OPENAI_KEY;
    try {
        // i need to take the messages array and change the key 'message' to 'content' before sending the new array
        const message = messages.map(message => {
            return {content: message.message, role: 'user'}
        })


        new_array = personality.message.concat(message) //double check this
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: new_array,
            temperature: personality.temperature,
            top_p: personality.top_p,
        }),
        });
        console.log(response)
        results = await response.json()
        console.log(results.choices[0].message.content)
      return results.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching external data:', error);
    }
  }

  module.exports = {
    fetchGPTData,
  };
  