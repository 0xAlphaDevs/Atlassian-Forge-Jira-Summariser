// generate desciption for a pull request using Open AI API

const generateDescription = async (pullRequestId) => {
  const response = await api
    .asApp()
    .requestJira(`/rest/api/3/issue/${pullRequestId}/transitions`, {
      method: "POST",
      body: JSON.stringify({
        transition: {
          id: "31",
        },
      }),
    });
  const data = await response.json();
  return data;
};
