import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useQuery, UseQueryOptions, useMutation, UseMutationOptions} from 'react-query';
import {Row, Spinner, Col, Button, Table} from 'react-bootstrap';
import {gql} from '../services';
import {User as UserType, Article, MutationDeleteArticleArgs} from '../@types/gql';
import {ErrorAlerts, AlertPopup} from '../components';
import {getDate, getDatetime, getCookie} from '../services/utils';

export const OwnProfile = () => {
  const [user, setUser] = useState<UserType>();
  const [errors, setErrors] = useState<object[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {isFetching, refetch: refetchData} = useQuery({
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

  const deleteArticleMutation = useMutation({
    mutationKey: 'deleteArticle',
    mutationFn : (data: MutationDeleteArticleArgs) => gql.deleteArticle({articleId: data.articleId}),
    onSuccess  : () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      refetchData();
    }
  } as unknown as UseMutationOptions);

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
      <AlertPopup defaultShow={showAlert} variant='success' message='Article removed' />

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
          <NavLink to={'/article/new'} className='ms-1'>
            <Button size="sm" variant='secondary'>
              New article
              <i className='icon bi-plus-lg ms-1'></i>
            </Button>
          </NavLink>
        </Col>
      </Row>

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Comment count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user?.articles.map((el, i) => {
            const article = el as Article;
            return (
              <tr key={i}>
                <td> {article.title} </td>
                <td> {article.commentCount} </td>
                <td>
                  <NavLink to={`/article/${article.id}/edit`}>
                    <Button size="sm" variant='secondary'>
                      <i className='icon bi-pen'></i>
                    </Button>
                  </NavLink>
                  <Button
                    size="sm"
                    variant='secondary'
                    className='ms-1'
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onClick={() => deleteArticleMutation.mutate({articleId: article.id})}
                  >
                    <i className='icon bi-trash'></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
