import api, { route } from "@forge/api";

// Prepare the prompt for OpenAI API
const preparePrompt = async (issueKey) => {
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueKey}`, {
      headers: {
        Accept: "application/json",
      },
    });

  const result = await response.json();

  // console.log(`Response: ${response.status} ${response.statusText}`);

  let combinedText = "";

  result.fields.description.content.forEach((item) => {
    if (Array.isArray(item.content)) {
      item.content.forEach((textItem) => {
        if (textItem.type === "text" && typeof textItem.text === "string") {
          combinedText += textItem.text + " ";
        }
      });
    }
  });

  return combinedText;
};

export { preparePrompt };
