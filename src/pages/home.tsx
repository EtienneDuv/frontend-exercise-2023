import {useState} from 'react';
import {Alert, Row, Spinner} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {gql} from '../services';
import {Article} from '../@types/gql';
import {ErrorAlerts} from '../components';

export default () => {
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
          <Alert key={i}>
            {JSON.stringify(article)}
          </Alert>
        );
      })}
    </div>
  );
};
