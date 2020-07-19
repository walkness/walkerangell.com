/* eslint-disable import/prefer-default-export */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import TypekitLoadedContextProvider from '@/context/typekit_loaded_context';

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
