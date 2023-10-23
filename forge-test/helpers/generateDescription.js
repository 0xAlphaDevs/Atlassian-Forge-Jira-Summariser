// generate desciption for a pull request using Open AI API
import api, { route, fetch } from "@forge/api";

const generateDescription = async () => {};

const addDescription = async (pullRequestId, description) => {
  const workspaceId = extensionContext.pullRequest.repository.workspace.uuid;
  const repositoryId = extensionContext.pullRequest.repository.uuid;

  const bodyData = JSON.stringify({
    description: description,
  });
  const res = await api
    .asApp()
    .requestBitbucket(
      route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer <access_token>",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: bodyData,
      }
    );

  const data = await res.json();
  return data;
};

const callOpenAI = async (prompt) => {
  const choiceCount = 1;
  // OpenAI API endpoint
  const url = `https://api.openai.com/v1/chat/completions`;

  // Body for API call
  const payload = {
    model: getOpenAPIModel(),
    n: choiceCount,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  // API call options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getOpenAPIKey()}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(payload),
  };

  // API call to OpenAI
  const response = await fetch(url, options);
  let result = "";

  if (response.status === 200) {
    const chatCompletion = await response.json();
    const firstChoice = chatCompletion.choices[0];

    if (firstChoice) {
      result = firstChoice.message.content;
    } else {
      console.warn(
        `Chat completion response did not include any assistance choices.`
      );
      result = `AI response did not include any choices.`;
    }
  } else {
    const text = await response.text();
    result = text;
  }
  return result;
};

// Get OpenAI API key
export const getOpenAPIKey = () => {
  return process.env.OPEN_API_KEY;
};

// Get OpenAI model
export const getOpenAPIModel = () => {
  return "gpt-3.5-turbo";
  // return 'gpt-4';
};

export { addDescription };
