import React, { useEffect } from 'react';

const PageTitle  = ({ title, children }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return <>{children}</>;
};
export default PageTitle;