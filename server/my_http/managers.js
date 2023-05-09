import generateRoleMessage from "./personality/types";
const systemMessage = (name) => {

//i need to randomize the traits in the message

let systemMessage = generateRoleMessage(name)



    return  [{
        "role": "system", "content": `${systemMessage.message}`
}]
}
module.exports = {
    systemMessage
  };
  


