import { useLocation, Link } from 'react-router-dom';
import { BreadcrumbsContainer, Crumb } from './BreadCrumb.style';
import { routesNames } from './RoutesName';
export default function BreadcrumbsComp() {
	const location = useLocation();
	let currentLink = '';
	const locationFilter = location.pathname.split('/').filter((crumb) => crumb !== '' && !crumb.includes('-'));

	const crumbs = locationFilter.map((crumb, index) => {
		currentLink += `/${crumb}`;		
		return (
			<Crumb key={index}>
				{<Link to={index + 1 !== locationFilter.length ? currentLink : location.pathname + location.search}>{routesNames[crumb]}</Link>}
			</Crumb>
		);
	});

	return (
		<BreadcrumbsContainer>
			<Crumb>
				<Link to="/">Home</Link>
			</Crumb>
			{crumbs}
		</BreadcrumbsContainer>
	);
}
