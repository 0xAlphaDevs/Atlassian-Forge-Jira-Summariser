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
  console.log(result.fields.description.content);
};

export { preparePrompt };
