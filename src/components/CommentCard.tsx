import {Badge, Row, Col, Image, Button} from 'react-bootstrap';
import {Comment} from '../@types/gql';
import {getDate, getDatetime} from '../services/utils';
import {NavLink} from 'react-router-dom';
import {defaultUserImage} from '../assets';

interface Args {
  comment: Comment
}

export const CommentCard = ({comment}: Args) => (
  <div>
    <Image
      src={defaultUserImage.toString()}
      width={50}
      className="p-1"
    />
    {comment.authorId}  {/* TODO authorUsername*/}
    <span title={getDatetime(Number(comment.createdAt))} className='text-muted'>
      {' - '}
      {getDate(Number(comment.createdAt))}
    </span>
    <div className='comment'>
      <Row className='mb-1'>
        <Col> {comment.content} </Col>
      </Row>
      <Row>
        <Col>
          <Badge bg='secondary'>
            {comment.score}
            <i className='icon bi-hand-thumbs-up-fill ms-1'></i>
          </Badge>
          <NavLink to={`/article/${comment.articleId}`}>
            <Button size="sm" className='ms-3' variant='secondary'>
                Article
              <i className='icon bi-chevron-double-right ms-1'></i>
            </Button>
          </NavLink>
        </Col>
      </Row>
    </div>
  </div>
);