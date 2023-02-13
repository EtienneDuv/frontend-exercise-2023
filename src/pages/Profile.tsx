import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, UseQueryOptions} from 'react-query';
import {Row, Spinner, Col} from 'react-bootstrap';
import {gql} from '../services';
import {User as UserType, Article, Comment} from '../@types/gql';
import {ErrorAlerts, ArticleCard, CommentCard} from '../components';
import {getDate, getDatetime} from '../services/utils';

export const Profile = () => {
  const {id} = useParams();
  const [user, setUser] = useState<UserType>();
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'user',
    queryFn  : () => gql.getUser({userId: id||''}),
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
        <Col xs={12} md={7}>
          <div className='my-3 fs-4 text-center'> Owned articles </div>
          {user?.articles.map((el, i) => {
            const article = el as Article;
            return <ArticleCard article={article} key={i} readable />;
          })}
        </Col>
        <Col>
          <div className='my-3 fs-4 text-center'> Owned comments </div>
          {user?.comments.map((el, i) => {
            const comment = el as Comment;
            return (
              <div className='mt-3' key={i}>
                <CommentCard comment={comment} key={i} articleButton />
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};
