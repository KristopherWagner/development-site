import { createFileRoute } from '@tanstack/react-router';

import WeddingPage from '../components/wedding';

export const Route = createFileRoute('/wedding')({
  component: WeddingPage,
});
