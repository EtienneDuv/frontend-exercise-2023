import {useState, useEffect} from 'react';
import {Alert, Button} from 'react-bootstrap';

interface Args {
  defaultShow: boolean;
  variant: 'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|string;
  message: string;
}

export const AlertPopup = ({defaultShow, variant, message}: Args) => {
  const [show, setShow] = useState(defaultShow);

  useEffect(() => {
    setShow(defaultShow);
  }, [defaultShow]);

  return (
    <div className='position-relative'>
      <Alert
        show={show}
        variant={variant}
        className='popup w-75 position-absolute'
      >
        <span className="float-start">
          {message}
        </span>
        <span className="float-end">
          <Button
            onClick={() => setShow(false)}
            variant={'outline-'+variant}
          >
            <i className='icon bi-x-lg ' />
          </Button>
        </span>
      </Alert>
    </div>
  );
};