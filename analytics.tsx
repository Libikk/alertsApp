import ReactGA from 'react-ga';
import { gaTrackingId } from './appConfig';

ReactGA.initialize(gaTrackingId);
if (typeof window !== 'undefined') ReactGA.pageview(window.location.pathname + window.location.search);
