import {Row, Col, Button} from 'react-bootstrap';
import {
  apollo, codegen, eslint, express, graphql, jwt, bootstrap,
  postgresql, react, reactQuery, sequelize, typescript,
} from '../assets';
import {TechnoImageTooltip} from '../components';

export const About = () => {
  const frontendTechnos = [
    {
      svg  : react,
      title: 'REACT',
      text : 'React is a front-end JavaScript library for building user interfaces based on UI components'
    },
    {
      svg  : reactQuery,
      title: 'REACT QUERY',
      text : 'React Query is a ReactJS preconfigured data management library which gives you power and control over server-side state management, fetching, and caching of data, and error handling in a simple and declarative way without affecting the global state of your application'
    },
    {
      svg  : bootstrap,
      title: 'BOOTSTRAP',
      text : 'Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components'
    },
  ];
  const commonTechnos = [
    {
      svg  : typescript,
      title: 'TYPESCRIPT',
      text : 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale'
    },
    {
      svg  : eslint,
      title: 'ESLINT',
      text : 'ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. ESLint covers both code quality and coding style issues'
    },
    {
      svg  : codegen,
      title: 'CODEGEN',
      text : 'GraphQL Code Generator is a plugin-based tool that automates the generation of typed Queries, Mutations and Subscriptions for frontend, typed GraphQL resolvers for backend'
    },
  ];
  const backendTechnos = [
    {
      svg  : express,
      title: 'EXPRESS',
      text : 'Express is a back end web application framework for building RESTful APIs with Node.js'
    },
    {
      svg  : apollo,
      title: 'APOLLO',
      text : 'Apollo Server is an open-source, spec-compliant GraphQL server that\'s compatible with any GraphQL client'
    },
    {
      svg  : graphql,
      title: 'GRAPHQL',
      text : 'GraphQL is an open-source data query and manipulation language for APIs, and a query runtime engine'
    },
    {
      svg  : postgresql,
      title: 'POSTGRESQL',
      text : 'Postgres, is a free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance'
    },
    {
      svg  : sequelize,
      title: 'SEQUELIZE',
      text : 'Sequelize is a promise-based Node.js ORM tool for many databases'
    },
    {
      svg  : jwt,
      title: 'JWT',
      text : 'JSON Web Token, is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued'
    },
  ];

  return (
    <div>
      <div className='mb-3 fs-5 text'>
        This app is a training for React using my training graphQL API.
      </div>

      <Button
        href='https://github.com/EtienneDuv/test-Applifting'
        target='_blank'
        className='mb-5 me-3'
      >
        Backend repo
        <i className='icon bi-github ms-2'></i>
      </Button>

      <Button
        href='https://github.com/EtienneDuv/test-Applifting-frontend'
        target='_blank'
        className='mb-5'
      >
        Frontend repo
        <i className='icon bi-github ms-2'></i>
      </Button>

      <Row>
        <Col className='text-center fs-4 fw-bold'>
          FRONTEND
          {frontendTechnos.map((el, i) => (
            <Row key={i}>
              <TechnoImageTooltip svg={el.svg} tooltipTitle={el.title} tooltipText={el.text}/>
            </Row>
          ))}
        </Col>

        <Col className='text-center fs-4 fw-bold'>
          COMMON
          {commonTechnos.map((el, i) => (
            <Row key={i}>
              <TechnoImageTooltip svg={el.svg} tooltipTitle={el.title} tooltipText={el.text}/>
            </Row>
          ))}
        </Col>

        <Col className='text-center fs-4 fw-bold'>
          BACKEND
          {backendTechnos.map((el, i) => (
            <Row key={i}>
              <TechnoImageTooltip
                svg={el.svg}
                tooltipTitle={el.title}
                tooltipText={el.text}
                placement='left'
              />
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};