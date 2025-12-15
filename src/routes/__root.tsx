import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import '../i18n/index';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import StoreDevtools from '../lib/demo-store-devtools';

import AiDevtools from '../lib/ai-devtools';

import appCss from '../styles.css?url';

import Header from '@/domains/layout/components/Header';
import type { QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { setSSRLangage } from '../i18n/index';

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({context}) => {
  
    await setSSRLangage();
    return  null;
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Deck Learning Language - Learn Languages with Decks',
        name: 'description',
        content:
          'Deck Learning Language is your ultimate platform for mastering new languages through curated decks. Explore our extensive collection of language learning decks designed to enhance your vocabulary and grammar skills. Start your language learning journey with us today!',
        
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const {i18n} = useTranslation()
  
  return (
    <html lang={i18n.language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
            StoreDevtools,
            AiDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
