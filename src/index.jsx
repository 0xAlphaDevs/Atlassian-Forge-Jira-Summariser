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
    "Summary will be shown here. Click on Summarize button to generate summary."
  );

  const [bulletPoints, setBulletPoints] = useState([]);
  const [buttonText, setButtonText] = useState("Summarize");

  const summarise = async () => {
    const result = await generateDescription(platformContext.issueKey);

    setDescription("Here is the summary :" + "\n");
    setBulletPoints(result);
    setButtonText("Summarize again");
  };

  return (
    <Fragment>
      <Text>{description} </Text>
      <Text>{bulletPoints} </Text>

      {/* {bulletPoints.map((item) => (
        <Text>{item}</Text>
      ))} */}
      <Button
        onClick={async () => {
          await summarise();
        }}
        text={buttonText}
      />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
