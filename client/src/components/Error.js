import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const { status, statusText } = err;

  return (
    <>
      <h1>Oops!!!</h1>
      <h3>Something Went Wrong!</h3>
      <h4>{status + " : " + statusText}</h4>
    </>
  );
};

export default Error;
