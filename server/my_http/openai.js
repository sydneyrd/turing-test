require('node-fetch');
const { systemMessage } = require("./managers");

async function fetchGPTData  (name, messages){
    const key = process.env.OPENAI_KEY;
    try {
        // i need to take the messages array and change the key 'message' to 'content' before sending the new array
        const message = messages.map(message => {
            return {content: message.message, role: 'user'}
        })
        new_array = systemMessage(name).concat(message) //double check this
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: new_array,
            temperature: 1.2,
            top_p: 1,
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
  