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
  const summarise = async () => {
    const result = await generateDescription(platformContext.issueKey);
    setDescription(result);
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
