import ForgeUI, {
  useProductContext,
  Text,
  Macro,
  render,
  Fragment,
  Button,
  ButtonSet,
} from "@forge/ui";
import { useState } from "@forge/ui";
import {
  addDescription,
  generateDescription,
} from "../helpers/generateDescription";

const App = () => {
  // const [description, setDescription] = useState("abcd");
  const [loading, setLoading] = useState(false);

  const { extensionContext } = useProductContext();

  // ChatGPT prompt to get the summary
  const prompt = `Write a description for a pull request with these commits in points:
- feat: add navbar
- fix: fix links in navbar`;

  // OpenAI API call to get the summary.
  const [description] = useState(async () => {
    return await generateDescription(prompt);
  });

  console.log("Summary - " + description);

  // async function generateDescription() {
  //   setLoading(true);

  //   await generateDescription().then((data) => {
  //     console.log(data);
  //     setDescription(data);
  //   });

  //   setLoading(false);
  // }

  async function handleAddDescription() {
    setLoading(true);
    try {
      const pullRequestId = extensionContext.pullRequest.id;
      const workspaceId =
        extensionContext.pullRequest.repository.workspace.uuid;
      const repositoryId = extensionContext.pullRequest.repository.uuid;
      const data = await addDescription(
        pullRequestId,
        description,
        workspaceId,
        repositoryId
      );
      console.log(data);
    } catch (error) {
      console.error("Failed to update description:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <Text>Pull request Id : {extensionContext.pullRequest.id}</Text>
      <Text>Repository UUID : {extensionContext.repository.uuid}</Text>
      {/* Ternary show skeleton when API call is in place */}
      <Text>{description}</Text>
      <ButtonSet>
        <Button text="Generate Description" onClick={generateDescription} />
        <Button
          text="Add Description"
          onClick={handleAddDescription}
          appearance="warning"
        />
      </ButtonSet>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
