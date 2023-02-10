import {errorObject} from '../@types/interfaces';
import {Alert} from 'react-bootstrap';

interface args {
  errors: Array<object>
}

export const ErrorAlerts = ({errors}: args) => {
  const errors2 = errors as Array<errorObject>;

  const errorMessages: string[] = Object
    .values(errors2)
    .map(error  => error.message);

  return (
    <div>
      {errorMessages.map((errorMessage, i) => {
        return (
          <Alert key={i} variant="danger">
            {errorMessage}
          </Alert>
        );
      })}
    </div>
  );
};