import {Badge, Card, Button} from 'react-bootstrap';
import {Article} from '../@types/gql';
import {getDate, getDatetime} from '../services/utils';
import {NavLink} from 'react-router-dom';

interface Args {
  article: Article;
  editable?: boolean;
  readable?: boolean;
}

export const ArticleCard = ({article, editable, readable}: Args) => {
  const AuthorSubtitle = ():JSX.Element => {
    if (article?.authorId) return (
      <>
        <NavLink to={`/profile/${article.authorId}`}>
          <Badge bg='secondary'> {article.authorUsername} </Badge>
        </NavLink>
        {' - '}
      </>
    );
    else return <></>;
  };

  const ReadMoreButton = ():JSX.Element => {
    if (readable) return (
      <NavLink to={`/article/${article.id}`}>
        <Button size="sm" className='ms-3' variant='secondary'>
            Read more
          <i className='icon bi-chevron-double-right ms-1'></i>
        </Button>
      </NavLink>
    );
    else return <></>;
  };

  const EditButton = ():JSX.Element => {
    if (editable) return (
      <NavLink to={`/article/${article.id}/edit`}>
        <Button size="sm" className='ms-3' variant='secondary'>
            Edit
          <i className='icon bi-pen ms-1'></i>
        </Button>
      </NavLink>
    );
    else return <></>;
  };

  return (
    <Card className='mb-3'>
      <Card.Header as="h4">
        <Card.Title> {article.title} </Card.Title>
        <Card.Subtitle className='mt-2'>
          <AuthorSubtitle />
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

        <EditButton/>
        <ReadMoreButton/>
      </Card.Body>
    </Card>
  );
};