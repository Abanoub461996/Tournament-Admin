import { useState, useEffect } from 'react';
import { Paginator } from 'primereact/paginator';
import './Pagination.css';

const Pagination = ({ paginator, setQueryPage }) => {
	const [first, setFirst] = useState<number>(paginator.current_page);
	useEffect(() => {
		if (paginator.current_page === 1 && first !== 1) {
			setFirst(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginator.current_page]);
	const template2 = {
		layout: 'PrevPageLink PageLinks NextPageLink',
	};
	const onPageChange = (e) => {
		setQueryPage(e.page);
		setFirst(e.first);
	};
	return (
		<>
			<div className="card mb-4">
				<Paginator
					template={template2}
					first={first}
					rows={paginator.per_page}
					totalRecords={paginator.total}
					onPageChange={(e) => onPageChange(e)}
				/>
			</div>
		</>
	);
};

export default Pagination;
