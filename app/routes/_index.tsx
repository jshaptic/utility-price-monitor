import { type MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
  return redirect('/electricity');
}

export default function IndexRoute() {
  return 'Welcome to the home page!';
}
