require('node-fetch');


async function fetchQuestions  (){
    const key = process.env.OPENAI_KEY;
    try {
        // i need to take the messages array and change the key 'message' to 'content' before sending the new array
       questionPrompt = `You create fun and unique questions for a game.   the questions will be opinion, personal questions, or any questions related to the human experience.   You should be as creative as possible.      You should return all of the questions in JSON as objects in an array.   like so: [{"question": "here is a question"}, ...]    you should return 30 questions.   The questions should be designed to have relatively short answers that are quick for people to come up with and not require any research.`


      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: questionPrompt,
            temperature: 1,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }),
        });
        console.log(response)
        results = await response.json()
        console.log(results.choices[0].text)
      return results.choices[0].text;
    } catch (error) {
      console.error('Error fetching external data:', error);
    }
  }

  module.exports = {
    fetchQuestions,
  };
  