import * as React from 'react';
import * as d3 from 'd3';

/**
 * @param {string} url
 *
 * @returns {[unknown, boolean, string | undefined]}
 */
export default function useFetchData(url) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState(null);

  // Fetch dimensionLevelData
  React.useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    d3.json(url, { signal: controller.signal })
      .then(data => {
        setData(data);
        setLoading(false);
        setError(undefined);
      })
      .catch(e => {
        if (e.name === 'AbortError') {
          console.log(`Aborted fetch of ${url}`);
        } else {
          setLoading(false);
          setError(e.message);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return [data, loading, error];
}
