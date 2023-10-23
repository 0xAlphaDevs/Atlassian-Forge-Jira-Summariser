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

const App = () => {
  const [description, setDescription] = useState("abcd");
  const [loading, setLoading] = useState(false);

  const { extensionContext } = useProductContext();

  async function generateDescription() {
    setLoading(true);
    setTimeout(() => {
      setDescription("ujvgwdik");
      setLoading(false);
    }, 2000);
  }

  function addDesription() {
    // call rest API of biitbucket - POST update pull request
  }
  return (
    <Fragment>
      <Text>Pull request Id : {extensionContext.pullRequest.id}</Text>

      <Text>Repository UUID : {extensionContext.repository.uuid}</Text>
      {/* Ternary show skeleton when API call is in place */}
      <Text>{loading ? "Loading..." : description}</Text>
      <ButtonSet>
        <Button text="Generate Description" onClick={generateDescription} />
        <Button text="Add Description" onClick={addDesription} />
      </ButtonSet>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
