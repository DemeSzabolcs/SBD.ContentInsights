import { entryPointManifests as entrypoints } from './entrypoints/manifests.js';
import { sectionManifest as section } from './section/manifests.js';

const manifests = [
    ...section,
    ...entrypoints
];

export default manifests;
