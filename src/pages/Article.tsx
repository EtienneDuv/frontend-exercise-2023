import {useParams} from 'react-router-dom';

export const Article = () => {
  const {id} = useParams();

  return (
    <h1>Article {id}</h1>
  );
};