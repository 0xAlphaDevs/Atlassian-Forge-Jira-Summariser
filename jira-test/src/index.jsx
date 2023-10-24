import ForgeUI, {
  IssuePanel,
  render,
  Text,
  useProductContext,
  useState,
} from "@forge/ui";
import { generateDescription } from "../helpers/generateDescription";

const App = () => {
  const context = useProductContext();

  const [description] = useState(async () => {
    return await generateDescription();
  });

  console.log("Summary - " + description);

  console.log(context);
  return (
    <IssuePanel>
      <Text>{description} </Text>
    </IssuePanel>
  );
};
export const run = render(<App />);
