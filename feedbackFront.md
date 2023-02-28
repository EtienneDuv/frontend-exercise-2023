**What is good**
- the candidate prepared both the backend and frontend for his application
- the candidate uses Vite tooling
- working with React hooks (useContext, useRef, useState), although the candidate does little work with the useEffect hook.
- use of industry standard libraries (React Query, React Router)
- user authentication through cookies using JWT tokens
- automatic generation of types in TypeScript from GraphQL (codegen)
- working with loading states, error handling
- attempts to create reusable components
- using GraphQL (query definitions, mutations)
- good code readability
- the candidate is able to identify possible improvements to the application by himself
- it is good that the candidate offers dark mode in the application
- working with Web APIs (session storage, cookies)
- some tests in Cypress
- good project structure


**What could be improved**
- In the useState hooks, where query results are stored, types could be defined directly instead of generic object[] `const [articles, setArticles] = useState<object[]>([]) => const [articles, setArticles] = useState<Article[]>([])`

- About.tsx, Router.tsx: Use of the useRef hook to store the initial value of `window.innerWidth` will only work if the user is no longer resizing the screen. It would be better to use an event listener to update the `windowSize` values and use useEffect

- In the About.tsx component, I would rather use CSS (flexbox, grid, media queries, library usage) to handle responsiveness and define column placement with the technologies used, rather than Javascript (for better control, performance, readability and maintainability)

- In general, storing the JWT token in cookies is not 100% secure, it is prone to cross-site attacks.

- There is no obvious mechanism for refreshing tokens after it expires, so the user may be suddenly logged out. It would be advisable to use a refresh token to generate a new JWT token, or use a session-based approach

- The `mutationKey` in `useMutation` in the ArticleEdit component, ArticleNew is named "login" - shouldn't it be something more like `updateArticle`, `createArticle`?

- The `setErrors`, `setShowAlert` functions are called everywhere inside the `useMutation` `onSuccess` callback even if there are no errors. It's better to move it to the `onError` callback

- In general, it would be nice to define a custom query client for React Query, so that the same code doesn't have to be repeated everywhere

- Comparing `article?.authorId` with `userId` taken from cookies to determine if the user is authorized to do something - not a good approach, it's better to store user info in some context

- Candidate creates a lot of states to store values from the form and sets each state separately via onChange on the input - not much maintanable, better to use one state with an object or even better - Formik or React Hook Form

- Candidate with each keystroke (onChange on input) stores article data (title, perex, content) in session storage. I understand that the candidate is trying to prevent data loss on page reload etc, but given all the security, performance, capacity reasons I wouldn't recommend that. I would rather handle it in a different way - server-side storage, Redux state management, etc.

- Protected routes: instead of checking in each component intended for an authenticated user whether he/she has jwt token `getCookie('jwt')`, I would create protected routes and redirect the user to the login if he/she is not authenticated (https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c)

- OwnProfileEdit.tsx - I'd probably omit it from the app altogether if it's not done yet

- It would require better documentation for the project - project description, functionality, libraries used, etc.

- Use strict comparison ("===")

- Good practice is to use ternary operator to avoid unnecessary if conditions, e.g. `setTheme(theme == 'light' ? 'dark' : 'light')` (see ThemeToggler.tsx)

- It would be nice to use Enums if the state can only have clearly defined values (e.g. dark or light)

- Write at least a couple of unit tests (e.g. use Jest, RTL)

- If the candidate is applying dark mode, it would be better to manipulate DOM through React directly, no vanilla JS (https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/)

**What is not good**
- It would be nice to inform reviewer which branch to use to check the tasks, if it differs from main/master (default one)

- The candidate sometimes tries to "get around" the use of proper types by type casting e.g. `as unknown as UseMutationOptions`. You need to be careful about this and use the correct and expected type for mutations (e.g. `UseMutationOptions<MutationDeleteArticleArgs, unknown, void, unknown>`)

- Using `// eslint-disable-next-line @typescript-eslint/ban-ts-comment // @ts-ignore` - it would be nice to fix the problem (see above - use the expected type for Mutation - argument and options) and if that doesn't work, comment why