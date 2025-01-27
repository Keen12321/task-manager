const Error = ({ errorMessage }: { errorMessage: string | string[] | undefined | null }) => {
  if (!errorMessage) return null; 

  let errorArray: string[];

  // Check if errorMessage is a string or an array of strings
  if (Array.isArray(errorMessage)) {
    errorArray = errorMessage;
  } else {
    errorArray = errorMessage.split('\n');
  }

  return (
    <div className="text-red-500 mb-4">
      {errorArray.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export default Error;
