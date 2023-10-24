// generate desciption for a pull request using Open AI API
import api, { route, fetch } from "@forge/api";

const generateDescription = async (
  pull_request_id,
  repository_uuid,
  workspace_uuid
) => {
  // const choiceCount = 1;
  // OpenAI API endpoint
  // prepare the prompt using the pull request data

  await preparePrompt(pull_request_id, repository_uuid, workspace_uuid);
  const prompt = "";

  // const url = `https://api.replicate.com/v1/predictions`;

  // // Body for API call
  // const payload = {
  //   version: "ac944f2e49c55c7e965fc3d93ad9a7d9d947866d6793fb849dd6b4747d0c061c",
  //   input: { prompt: prompt },
  // };

  // // API call options
  // const options = {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Token ${getReplicateToken()}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(payload),
  // };

  // // API call to OpenAI
  // const response = await fetch(url, options);
  // let apiResponse = await response.json();
  // console.log(apiResponse);
  // console.log(apiResponse.status);
  // let result = "";

  // if (apiResponse.status == "starting") {
  //   let predictionUrl = `https://api.replicate.com/v1/predictions/${apiResponse.id}`;

  //   const options = {
  //     headers: {
  //       Authorization: `Token ${getReplicateToken()}`,
  //     },
  //   };

  //   // API call to OpenAI
  //   let output = await fetch(predictionUrl, options);
  //   let prediction = await output.json();
  //   console.log(prediction.status);

  //   // poll the api every 2 sec until the status is succedded
  //   while (prediction.status != "succeeded") {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     output = await fetch(predictionUrl, options);
  //     prediction = await output.json();
  //     // console.log(prediction.status);
  //     if (prediction.status == "failed" || prediction.status == "canceled") {
  //       console.log("API call failed");
  //       break;
  //     }
  //   }

  //   result = prediction.output;
  // } else {
  //   console.log("Error in response 1");
  // }
  return "This is a test description";
};

// Prepare the prompt for OpenAI API
const preparePrompt = async (
  pull_request_id,
  repository_uuid,
  workspace_uuid
) => {
  // Get the pull request data
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace_uuid}/${repository_uuid}/pullrequests/${pull_request_id}`;
  // API call options
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getReplicateToken()}`,
      Accept: "application/json",
    },
  };

  // API call to OpenAI
  const response = await fetch(url, options);
  let pullRequestData = await response.json();

  console.log("Pull Request Data - ", pullRequestData);
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
