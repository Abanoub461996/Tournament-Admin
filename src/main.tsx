import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Redux
import { Provider } from 'react-redux';
import { store } from './core/store/store';
// React Query
import { QueryClient, QueryClientProvider } from 'react-query';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './assets/fonts/fonts.css';
import './index.css';
import './core/GlobalDigitalStyle/global.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
);
