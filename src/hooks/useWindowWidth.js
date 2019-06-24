import * as React from 'react';

/** @see https://gist.github.com/gaearon/cb5add26336003ed8c0004c4ba820eae#file-usewindowwidth-js */
export default function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
