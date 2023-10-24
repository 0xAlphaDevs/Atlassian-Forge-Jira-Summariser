//   const context = useProductContext();
//   console.log(context);

import ForgeUI, {
  IssuePanel,
  IssuePanelAction,
  render,
  Text,
  useProductContext,
  useState,
} from "@forge/ui";

const App = () => {
  // const [waveCount, setWaveCount] = useState(0);
  return (
    <IssuePanel
    // actions={[
    //   <IssuePanelAction
    //     text="Custom action"
    //     onClick={() => {
    //       setWaveCount(waveCount + 1);
    //     }}
    //   />,
    // ]}
    >
      {/* <Text>Hello, world! {"👋".repeat(waveCount)}</Text> */}
      <Text>This is a AI Generated description. </Text>
    </IssuePanel>
  );
};
export const run = render(<App />);
