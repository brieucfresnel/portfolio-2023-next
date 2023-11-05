export const sizes = {
  xs: '576px',
  sm: '768px',
  md: '1024px',
  lg: '1366px',
  xl: '1920px',
  xxl: '2560px'
};

function isMatch(media) {
  const query = `(min-width: ${sizes[media]})`;
  return window.matchMedia(query).matches;
}

function findClosest(queries) {
  for (let i = queries.length - 1; i >= 0; i--) {
    if (isMatch(queries[i])) {
      return queries[i];
    }
  }
  return 'sm';
}

export const useClosestMedia = () => {
  const [closest, setClosest] = useState('sm');

  useEffect(() => {
    const listener = () => setClosest(findClosest(queries));
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener); //Cleanup
  }, []);

  return closest;
};

export const useMediaQuery = (screen) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${sizes[screen]})`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, screen]);

  return matches;
};