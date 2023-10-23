import ForgeUI, {
  render,
  useEffect,
  useProductContext,
  IssueGlance,
  Text,
  Link,
} from "@forge/ui";

const App = () => {
  const context = useProductContext();
  console.log(context.platformContext.issueKey);

  return (
    <Text>
      <Link
        href={`https://bitbucket.org/branch/create?issueKey=${context.platformContext.issueKey}&issueType=${context.platformContext.issueType}`}
      >
        {" "}
        Hello from the Issue glance!
      </Link>
    </Text>
  );
};

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);
