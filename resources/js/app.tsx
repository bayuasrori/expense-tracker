import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

declare global {
    interface Window {
        appUrl: {}; // Declare appUrl on the Window interface
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {

        // Optionally set appUrl as a global variable
        const appUrl = props.initialPage.props?.appUrl;
        if (appUrl) {
            window.appUrl = appUrl; // Set appUrl as a global variable
            console.log('App URL set to:', window.appUrl);
        } else {
            console.warn('appUrl is undefined');
        }
        if (import.meta.env.DEV) {
            createRoot(el).render(<App {...props} />);
            return
        }

        hydrateRoot(el, <App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
