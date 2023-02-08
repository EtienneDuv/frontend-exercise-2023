import {useState} from 'react';
import {Button, Form, Row, Col, Container} from 'react-bootstrap';
import {useMutation, UseMutationOptions} from 'react-query';
import {useNavigate, Navigate} from 'react-router-dom';
import {gql} from '../services';
import {getJwt} from '../services/utils';
import {SetJwtStateProps} from '../@types/interfaces';
import {ErrorAlerts} from '../components';

export default ({setJwtState}: SetJwtStateProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<object[]>([]);
  const navigate = useNavigate();

  if (getJwt()) return <Navigate to="/" />;

  const loginMutation = useMutation({
    mutationKey: 'login',
    mutationFn : () => gql.login({username, password}),
    onSuccess  : ({data, errors}) => {
      if (errors) {
        return setErrors(errors);
      }
      if (data?.login?.token) {
        const jwt = data.login.token;
        if (jwt) {
          document.cookie = `jwt=${jwt};max-age=3600;SameSite=None;secure`;
          setJwtState(jwt);
          return navigate('/');
        }
      }
    }
  } as UseMutationOptions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  const ErrorAlertsLocal = ():JSX.Element => {
    if (errors.length > 0) return (
      <ErrorAlerts errors={errors}/>
    );
    return (
      <></>
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column xs={1}> Username </Form.Label>
          <Col xs={5}>
            <Form.Control
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column xs={1}> Password </Form.Label>
          <Col xs={5}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{offset: 5}}>
            <Button
              type="submit"
              disabled={username=='' || password==''}
            >
            Sign in
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <ErrorAlertsLocal />
    </Container>
  );
};
