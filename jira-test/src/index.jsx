import ForgeUI, {
  Fragment,
  Button,
  IssuePanel,
  render,
  Text,
  useProductContext,
  useState,
} from "@forge/ui";
import { generateDescription } from "../helpers/generateDescription";

const App = () => {
  const { platformContext } = useProductContext();

  const [description, setDescription] = useState(
    "Description will be shown here."
  );

  // Function to convert plain text to Markdown
  function textToMarkdown(text) {
    // convert text to string
    text = text.toString();
    const lines = text.split("•");
    const items = lines
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());

    return `## Here is a summary of the issue under 100 words\n\n${items
      .map((item) => `- ${item}`)
      .join("\n")}`;
  }

  const summarise = async () => {
    const result = await generateDescription(platformContext.issueKey);
    let formattedResult = textToMarkdown(result);
    setDescription(formattedResult);
  };
  console.log("Summary - " + description);

  return (
    <Fragment>
      <Text>{description} </Text>
      <Button
        onClick={async () => {
          await summarise();
        }}
        text="Summarise"
      />
    </Fragment>
  );
};
export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
