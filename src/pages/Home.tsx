import {useState} from 'react';
import {Badge, Row, Spinner, Card, Button} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {gql} from '../services';
import {Article} from '../@types/gql';
import {ErrorAlerts} from '../components';
import {getDate, getDatetime} from '../services/utils';
import {NavLink} from 'react-router-dom';

export const Home = () => {
  const [articles, setArticles] = useState<object[]>([]);
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'articles',
    queryFn  : () => gql.getArticles({}),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.getArticles) {
        return setArticles(data.getArticles);
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
      {articles.map((el, i) => {
        const article = el as Article;
        return (
          <Card className='mb-3' key={i}>
            <Card.Header as="h4">
              <Card.Title> {article.title} </Card.Title>
              <Card.Subtitle>
                <NavLink to={`/profile/${article.authorId}`}>
                  <Badge bg='secondary'> {article.authorUsername} </Badge>
                </NavLink>
                {' - '}
                <span title={getDatetime(Number(article.createdAt))}>
                  {getDate(Number(article.createdAt))}
                </span>
              </Card.Subtitle>
            </Card.Header>

            <Card.Body>
              <Card.Text> {article.perex} </Card.Text>
              <Badge bg='secondary'>
                {article.commentCount}
                <i className='icon bi-chat-left-fill ms-1'></i>
              </Badge>
              <NavLink to={`/article/${article.id}`}>
                <Button size="sm" className='ms-3' variant='secondary'>
                Read more
                  <i className='icon bi-chevron-double-right ms-1'></i>
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
