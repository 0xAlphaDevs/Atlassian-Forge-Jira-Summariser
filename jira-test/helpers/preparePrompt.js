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

  console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(result.fields.description.content);

  let combinedText = "";

  result.fields.description.content.forEach((item) => {
    if (item.type === "paragraph" && Array.isArray(item.content)) {
      item.content.forEach((textItem) => {
        if (textItem.type === "text" && typeof textItem.text === "string") {
          combinedText += textItem.text + " ";
        }
      });
    }
  });

  console.log(combinedText);
};

export { preparePrompt };
