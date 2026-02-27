import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/Welcome.jsx';
import ChallengesPage from './pages/Challenges.jsx';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/challenges', element: <ChallengesPage /> },
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;