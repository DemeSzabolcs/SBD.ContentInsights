import { entryPointManifests as entrypoints } from './entrypoints/manifests.js';
import { sectionManifest as section } from './section/manifests.js';
import { dashboardsManifest as dashboards } from './dashboards/manifests.js';

const manifests = [
    ...section,
    ...entrypoints,
    ...dashboards,
];

export default manifests;
