import {useState} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import {useQuery, UseQueryOptions} from 'react-query';
import {Row, Spinner, Col, Badge} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import {gql} from '../services';
import {Article as ArticleType, Comment} from '../@types/gql';
import {ErrorAlerts, CommentCard} from '../components';
import {getDate, getDatetime} from '../services/utils';

export const Article = () => {
  const {id} = useParams();
  const [article, setArticle] = useState<ArticleType>();
  const [errors, setErrors] = useState<object[]>([]);

  const {isFetching} = useQuery({
    queryKey : 'article',
    queryFn  : () => gql.getArticle({articleId: id||''}),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.getArticle) {
        return setArticle(data.getArticle);
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
      <Row className='fs-1'>
        <Col> {article?.title} </Col>
      </Row>

      <Row className='fs-4 mb-4'>
        <Col>
          <NavLink to={`/profile/${article?.authorId}`}>
            <Badge bg='secondary'> {article?.authorUsername} </Badge>
          </NavLink>
          <span title={getDatetime(Number(article?.createdAt))} className='text-muted'>
            {' - '}
            {getDate(Number(article?.createdAt))}
          </span>
        </Col>
      </Row>

      <Row>
        <Col className='fs-5'>
          <ReactMarkdown>
            {article?.content||''}
          </ReactMarkdown>
        </Col>
      </Row>

      <Row>
        <Col className='fs-5'>
          {article?.comments.map((el, i) => {
            const comment = el as Comment;
            return (
              <div className='mt-3' key={i}>
                <CommentCard comment={comment} key={i} />
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};
