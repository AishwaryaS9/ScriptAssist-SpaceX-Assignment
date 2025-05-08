import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import ResourceList from './pages/resources/ResourceList';
import ResourceDetail from './pages/resources/ResourceDetail';
import EnrichDetails from './pages/resources/EnrichDetails';
import LaunchpadDetails from './pages/resources/LaunchpadDetails';
import { Toaster } from 'react-hot-toast';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/resources',
				element: <PrivateRoute element={<ResourceList />} />,
			},
			{
				path: '/resource/:id',
				element: <PrivateRoute element={<ResourceDetail />} />,
			},
			{
				path: '/enrich/:id',
				element: <PrivateRoute element={<EnrichDetails />} />,
			},
			{
				path: '/launchpadDetails/:launchpadId',
				element: <PrivateRoute element={<LaunchpadDetails />} />,
			},
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
		<Toaster toastOptions={{
			className: "",
			style: { fontSize: "13px", }
		}} />
	</StrictMode>
);
