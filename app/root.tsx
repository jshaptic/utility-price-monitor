import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigate } from '@remix-run/react';
import stylesheet from '~/tailwind.css?url';
import { Card } from '~/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export default function Root() {
  const navigate = useNavigate();
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='flex justify-center w-full h-full mt-8'>
        <div className='relative grid grid-cols-8 gap-8 w-full max-w-screen-xl'>
          <div className='col-span-6'>
            <div className='flex justify-between'>
              <h2 className='text-xl font-bold'>Electricity</h2>
              <Tabs defaultValue='electricity'>
                <TabsList>
                  <TabsTrigger value='electricity' onClick={() => navigate('/electricity')}>Electricity</TabsTrigger>
                  <TabsTrigger value='gas' onClick={() => navigate('/gas')}>Natural Gas</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Outlet />
          </div>
          <Card className='fixed h-[calc(100%-64px)] w-72 justify-self-end' />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
