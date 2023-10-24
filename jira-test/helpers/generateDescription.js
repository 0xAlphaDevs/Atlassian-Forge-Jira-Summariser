import { preparePrompt } from "./preparePrompt";

const generateDescription = async (issueKey) => {
  // prepare the prompt using the issue data

  await preparePrompt(issueKey);
  //   const prompt = "";

  //   const url = `https://api.replicate.com/v1/predictions`;

  //   // Body for API call
  //   const payload = {
  //     version: "ac944f2e49c55c7e965fc3d93ad9a7d9d947866d6793fb849dd6b4747d0c061c",
  //     input: { prompt: prompt },
  //   };

  //   // API call options
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Token ${getReplicateToken()}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };

  //   // API call to OpenAI
  //   const response = await fetch(url, options);
  //   let apiResponse = await response.json();
  //   console.log(apiResponse);
  //   console.log(apiResponse.status);
  //   let result = "";

  //   if (apiResponse.status == "starting") {
  //     let predictionUrl = `https://api.replicate.com/v1/predictions/${apiResponse.id}`;

  //     const options = {
  //       headers: {
  //         Authorization: `Token ${getReplicateToken()}`,
  //       },
  //     };

  //     // API call to OpenAI
  //     let output = await fetch(predictionUrl, options);
  //     let prediction = await output.json();
  //     console.log(prediction.status);

  //     // poll the api every 2 sec until the status is succedded
  //     while (prediction.status != "succeeded") {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       output = await fetch(predictionUrl, options);
  //       prediction = await output.json();
  //       // console.log(prediction.status);
  //       if (prediction.status == "failed" || prediction.status == "canceled") {
  //         console.log("API call failed");
  //         break;
  //       }
  //     }
  //     result = prediction.output;
  //   } else {
  //     console.log("Error in response 1");
  //   }
  return "This is a test description";
};

// Get OpenAI API key
export const getReplicateToken = () => {
  return process.env.REPLICATE_API_TOKEN;
};

export { generateDescription };
