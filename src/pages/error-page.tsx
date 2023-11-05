import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>متاسفیم!</h1>
      <p>صفحه ای که به دنبال آن هستید وجود ندارد.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
