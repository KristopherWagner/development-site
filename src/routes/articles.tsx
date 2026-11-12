import { createFileRoute } from '@tanstack/react-router';

import Articles from '../components/pages/articles';

export const Route = createFileRoute('/articles')({
  component: Articles,
});
