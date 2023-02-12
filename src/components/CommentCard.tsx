import {Badge, Row, Col, Image, Button} from 'react-bootstrap';
import {Comment} from '../@types/gql';
import {getDate, getDatetime} from '../services/utils';
import {NavLink} from 'react-router-dom';
import {defaultUserImage} from '../assets';

interface Args {
  comment: Comment;
  articleButton?: boolean;
}

export const CommentCard = ({comment, articleButton}: Args) => {
  const ChildComments = ():JSX.Element => {
    if (comment?.children) return (
      <>
        {comment?.children.map((el, i) => {
          const childComment = el as Comment;
          return (
            <Row className='mt-3' key={i}>
              <CommentCard
                comment={childComment}
                key={i}
                articleButton={articleButton}
              />
            </Row>
          );
        })}
      </>
    );
    else return <></>;
  };

  const GoToArticleButton = ():JSX.Element => {
    if (articleButton) return (
      <NavLink to={`/article/${comment.articleId}`}>
        <Button size="sm" className='ms-3' variant='secondary'>
          Article
          <i className='icon bi-chevron-double-right ms-1'></i>
        </Button>
      </NavLink>
    );
    else return <></>;
  };

  return (
    <div className='comment'>
      <span className='fw-semibold'>
        {comment.authorId}  {/* TODO authorUsername*/}
      </span>
      <span title={getDatetime(Number(comment.createdAt))} className='text-muted fw-light'>
        {' - '}
        {getDate(Number(comment.createdAt))}
      </span>
      <div>
        <Row className='mb-1'>
          <Col> {comment.content} </Col>
        </Row>

        <Badge bg='secondary'>
          {comment.score}
          <i className='icon bi-hand-thumbs-up-fill ms-1'></i>
        </Badge>

        <GoToArticleButton />
        <ChildComments/>
      </div>
    </div>
  );
};