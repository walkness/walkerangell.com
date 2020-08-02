/* eslint-disable import/prefer-default-export */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import TypekitLoadedContextProvider from '@/context/typekit_loaded_context';

export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    import('@sentry/react').then((Sentry) => {
      Sentry.init({
        dsn: 'https://e8c83e7128bc4c1fb41c15b88c5a5ed7@o428859.ingest.sentry.io/5374668',
        environment: process.env.NODE_ENV,
        release: process.env.AWS_COMMIT_ID,
        serverName: process.env.AWS_APP_ID,
      });
    });
  }
};

export const shouldUpdateScroll = ({ routerProps }) => {
  const { location } = routerProps;
  const { userScroll } = location.state || {};
  return !userScroll;
};

export const wrapRootElement = ({ element }) => (
  <TypekitLoadedContextProvider>
    { element }
  </TypekitLoadedContextProvider>
);
