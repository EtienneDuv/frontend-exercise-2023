import {useState} from 'react';
import {Badge, Row, Spinner, Card, Col} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {gql} from '../services';
import {Article} from '../@types/gql';
import {ErrorAlerts} from '../components';

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
    <ErrorAlerts errors={errors} />
  );

  return (
    <div>
      {articles.map((el, i) => {
        const article = el as Article;
        return (
          <Card key={i} className="mb-4">
            <Card.Header as="h5">{article.title}</Card.Header>
            <Card.Body>
              <Row className='mb-3'>
                <Col> {article.perex} </Col>
              </Row>
              <Row>
                <Col>
                  <Badge>
                    {article.commentCount}
                    <i className='icon bi-chat-left-fill ms-1'></i>
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
