import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, UseQueryOptions, useMutation, UseMutationOptions} from 'react-query';
import {Row, Spinner, Button, Form} from 'react-bootstrap';
import MarkdownEditor from '@uiw/react-md-editor';

import {gql} from '../services';
import {Article as ArticleType} from '../@types/gql';
import {ErrorAlerts, AlertPopup} from '../components';
import {getCookie} from '../services/utils';

export const ArticleEdit = () => {
  const {id} = useParams();
  const [article, setArticle] = useState<ArticleType>();
  const [errors, setErrors] = useState<object[]>([]);
  const [title, setTitle] = useState<string>('');
  const [perex, setPerex] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {isFetching} = useQuery({
    queryKey : 'article',
    queryFn  : () => gql.getArticle({articleId: id||''}),
    onSuccess: ({data, errors}) => {
      if (errors) {
        setErrors(errors);
      }
      if (data?.getArticle) {
        const article = data.getArticle as ArticleType;
        setArticle(article);
        setTitle(article.title);
        setPerex(article.perex);
        setContent(article.content);
      }
    },
  } as UseQueryOptions);

  const updateArticleMutation = useMutation({
    mutationKey: 'login',
    mutationFn : () => gql.updateArticle({articleId: id||'', title, perex, content}),
    onSuccess  : ({data, errors}) => {
      if (errors) {
        return setErrors(errors);
      }
      if (data?.updateArticle?.updatedAt) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    }
  } as UseMutationOptions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateArticleMutation.mutate();
  };

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

  const loggedUserId = getCookie('userId');
  // Totally unsafe but it will do here
  if (loggedUserId !== article?.authorId) {
    setErrors([{
      extensions: {},
      message   : `You are not the owner of this article, ${article?.authorUsername} is.`
    }]);
  }

  return (
    <div>
      <AlertPopup defaultShow={showAlert} variant='success' message='Article updated' />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            value={title}
            className='mb-2'
            onChange={(event) => {setTitle(event?.target.value)}}
          />
          <Form.Control
            value={perex}
            as="textarea"
            rows={4}
            className='mb-2'
            onChange={(event) => {setPerex(event?.target.value)}}
          />
        </Form.Group>

        <MarkdownEditor
          value={content}
          onChange={(event) => {setContent(event||'')}}
          data-color-mode="light"
          height={600}
        />
        <div className='text-end mt-3'>
          <Button type="submit">
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
};
