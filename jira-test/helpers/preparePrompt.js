import api, { route } from "@forge/api";

// Prepare the prompt for OpenAI API
const preparePrompt = async () => {
  const url = `https://developer.atlassian.com/platform/forge/`;
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/{issueIdOrKey}`, {
      headers: {
        Accept: "application/json",
      },
    });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

export { preparePrompt };
