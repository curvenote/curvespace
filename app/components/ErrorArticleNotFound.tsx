import { Link } from '@remix-run/react';

export function ErrorArticleNotFound() {
  return (
    <>
      <h1>404 - Not Found</h1>
      <h3>What's next?</h3>
      <p></p>
      <p>
        Go back to the <Link to="/">homepage</Link>.
      </p>
    </>
  );
}
