import ForgeUI, {
  useProductContext,
  Text,
  Macro,
  render,
  Fragment,
  Button,
} from "@forge/ui";
import { useState } from "@forge/ui";

const App = () => {
  const [description, setDescription] = useState("abcd");
  const [loading, setLoading] = useState(false);

  const { extensionContext } = useProductContext();

  function generateDescription() {
    setLoading(true);
    setDescription("ujvgwdik");
  }

  function addDesription() {
    // call rest API of biitbucket - POST update pull request
  }
  return (
    <Fragment>
      <Text>Pull request Id : {extensionContext.pullRequest.id}</Text>

      <Text>Repository UUID : {extensionContext.repository.uuid}</Text>
      {/* Ternary show skeleton when API call is in place */}
      <Text>{description}</Text>
      <Button text="Generate Description" onClick={generateDescription} />

      {/* Add a blue button saying add description to right after description is generated */}
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
