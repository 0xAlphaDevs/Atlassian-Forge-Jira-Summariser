// generate desciption for a pull request using Open AI API
import api, { route, fetch } from "@forge/api";

const generateDescription = async (prompt) => {
  // const choiceCount = 1;
  // OpenAI API endpoint
  const url = `https://api.replicate.com/v1/predictions`;

  // Body for API call
  const payload = {
    version: "ac944f2e49c55c7e965fc3d93ad9a7d9d947866d6793fb849dd6b4747d0c061c",
    input: { prompt: prompt },
  };

  // API call options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${getReplicateToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  // API call to OpenAI
  const response = await fetch(url, options);
  let apiResponse = await response.json();
  console.log(apiResponse);
  console.log(apiResponse.status);
  let result = "";

  if (apiResponse.status == "starting") {
    let predictionUrl = `https://api.replicate.com/v1/predictions/${apiResponse.id}`;

    const options = {
      headers: {
        Authorization: `Token ${getReplicateToken()}`,
      },
    };

    // API call to OpenAI
    const output = await fetch(predictionUrl, options);
    const prediction = await output.json();
    console.log(prediction.status);

    console.log("Result - " + prediction.output);
    result = prediction.output;
  } else {
    console.log("Error in response 1");
  }
  return result;
};

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

// Get OpenAI API key
export const getReplicateToken = () => {
  return process.env.REPLICATE_API_TOKEN;
};

// Get OpenAI model
export const getOpenAPIModel = () => {
  return "gpt-3.5-turbo";
  // return 'gpt-4';
};

export { addDescription, generateDescription };
