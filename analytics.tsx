import ReactGA from 'react-ga';
import { googleAnalyticsId } from './appConfig';

ReactGA.initialize(googleAnalyticsId);
if (typeof window !== 'undefined') ReactGA.pageview(window.location.pathname + window.location.search);
