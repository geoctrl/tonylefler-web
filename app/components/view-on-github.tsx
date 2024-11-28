import { Button } from "root";

type ViewOnGithubProps = {
  href?: string;
};

export function ViewOnGithub(props: ViewOnGithubProps) {
  const { href } = props;
  return (
    <div className="mb-8">
      <Button
        iconLeft="github"
        intent="outline"
        formSize="sm"
        as="a"
        target="_blank"
        href={href}
      >
        View code on GitHub
      </Button>
    </div>
  );
}
