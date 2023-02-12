import {useState} from 'react';
import {Row, Spinner} from 'react-bootstrap';
import {useQuery, UseQueryOptions} from 'react-query';
import {gql} from '../services';
import {Article} from '../@types/gql';
import {ErrorAlerts, ArticleCard} from '../components';

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
        return <ArticleCard article={article} key={i} readable />;
      })}
    </div>
  );
};
