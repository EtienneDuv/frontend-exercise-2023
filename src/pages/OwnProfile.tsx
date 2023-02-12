import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useQuery, UseQueryOptions} from 'react-query';
import {Row, Spinner, Col, Button} from 'react-bootstrap';
import {gql} from '../services';
import {User as UserType, Article} from '../@types/gql';
import {ErrorAlerts, ArticleCard} from '../components';
import {getDate, getDatetime, getCookie} from '../services/utils';

export const OwnProfile = () => {
  const [user, setUser] = useState<UserType>();
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'me',
    queryFn  : () => gql.getUser({userId: getCookie('userId')||''}),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.getUser) {
        return setUser(data.getUser);
      }
    },
  } as UseQueryOptions);

  if (isFetching) return (
    <Row>
      <Spinner className="mx-auto mt-5" />
    </Row>
  );

  if (errors.length > 0) return (
    <Row>
      <ErrorAlerts errors={errors} />
    </Row>
  );

  return (
    <div>
      <Row className='fs-1 mb-1'>
        <Col>
          {user?.username}
        </Col>
      </Row>

      <Row className='fs-6 mb-3'>
        <Col title={getDatetime(Number(user?.createdAt))}>
          Joined {getDate(Number(user?.createdAt))}
        </Col>
      </Row>

      <Row>
        <Col>
          <NavLink to={'/@me/edit'}>
            <Button size="sm" variant='secondary'>
              Edit personal information
              <i className='icon bi-pen ms-1'></i>
            </Button>
          </NavLink>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className='mt-5 mb-3 fs-4'> Owned articles </div>

          {user?.articles.map((el, i) => {
            const article = el as Article;
            return <ArticleCard article={article} key={i} editable readable />;
          })}
        </Col>
      </Row>
    </div>
  );
};
