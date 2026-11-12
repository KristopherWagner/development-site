import { createFileRoute } from '@tanstack/react-router';

import Cookbook from '../../components/pages/cookbook';

export const Route = createFileRoute('/cookbook/')({
  component: Cookbook,
});
