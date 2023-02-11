import {ListGroup} from 'react-bootstrap';

export const About = () => (
  <div>
    <div className='mb-3'>
    This app is a training for React using my training graphQL API.
    </div>

    <ListGroup horizontal>
      <ListGroup.Item>
        <a href="https://github.com/EtienneDuv/test-Applifting">
          Backend repo
        </a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="https://github.com/EtienneDuv/test-Applifting-frontend">
          Frontend repo
        </a>
      </ListGroup.Item>
    </ListGroup>
  </div>
);