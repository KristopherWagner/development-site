import all, { useParams } from '@tanstack/react-router';

module.exports = {
  ...all,
  createFileRoute: (to) => () => ({
    to,
    useParams: jest.fn().mockImplementation(() => ({})),
  }),
  Link: (props) => <a {...props} href={props.to} role="link" />,
};
