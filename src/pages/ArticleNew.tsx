import {useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import {useMutation, UseMutationOptions} from 'react-query';
import {Row, Button, Form, Col} from 'react-bootstrap';
import MarkdownEditor from '@uiw/react-md-editor';

import {gql} from '../services';
import {ErrorAlerts, AlertPopup} from '../components';
import {getCookie} from '../services/utils';

const defaultContent = `
# You can use markdown

To write your article. Find full example [here](https://markdown-it.github.io/)

![ExampleImage](https://picsum.photos/80)

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:
  * this one
  * that one
  * the other one

> Block quotes are
> written like so.
`;


export const ArticleNew = () => {
  const sessionTitle = sessionStorage.getItem('newArticleTitle');
  const sessionPerex = sessionStorage.getItem('newArticlePerex');
  const sessionContent = sessionStorage.getItem('newArticleContent');

  const [errors, setErrors] = useState<object[]>([]);
  const [title, setTitle] = useState<string>(sessionTitle||'');
  const [perex, setPerex] = useState<string>(sessionPerex||'');
  const [content, setContent] = useState<string>(sessionContent||defaultContent);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const createArticleMutation = useMutation({
    mutationKey: 'login',
    mutationFn : () => gql.createArticle({title, perex, content}),
    onSuccess  : ({data, errors}) => {
      if (errors) {
        return setErrors(errors);
      }
      if (data?.createArticle?.id) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return navigate(`/article/${data.createArticle.id}/edit`);
      }
    }
  } as UseMutationOptions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    sessionStorage.setItem('newArticleTitle', title);
    sessionStorage.setItem('newArticlePerex', perex);
    sessionStorage.setItem('newArticleContent', content);

    event.preventDefault();
    createArticleMutation.mutate();
  };

  if (errors.length > 0) return (
    <>
      <Row>
        <ErrorAlerts errors={errors} />
      </Row>
      <Row>
        <Col className='text-center'>
          <Button onClick={() => {setErrors([])}}>
            <i className='bi-arrow-clockwise' />
          </Button>
        </Col>
      </Row>
    </>
  );

  if (!getCookie('jwt')) return <Navigate to="/" />;

  return (
    <div>
      <AlertPopup defaultShow={showAlert} variant='success' message='Article created' />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder='Article title'
            value={title}
            className='mb-2'
            onChange={(event) => {setTitle(event?.target.value)}}
          />
          <Form.Control
            placeholder='Here is the short text people will see in the article list'
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
            Save article
          </Button>
        </div>
      </Form>
    </div>
  );
};
