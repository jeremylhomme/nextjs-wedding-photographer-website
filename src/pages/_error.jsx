import Error from 'next/error';

const CustomErrorComponent = props => {
  return <Error statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async contextData => {
  // Log the error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error in _error.jsx:', contextData.err);
  }

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
