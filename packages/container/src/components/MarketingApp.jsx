// This approach is reusable with any other frameworks that is used inside of
// the Child Application as long as that framework can render itself or render
// its app into some arbitrary HTML element.
// That is, this pattern can be used with Angular App or Vue along with React
// and many other frameworks.
// So even if we start to change MarketingApp Microfrontend, and have it used
// some totally different framework, this approach inside of our Container
// should not need to change in any serious way!

import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
