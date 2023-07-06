import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { QueryInputContainer } from './QuerySearch.style';

interface QuerySearchProps {
	searchQueries?: any;
	placeholder?: any;
	handleSearch?: any;
}

const QuerySearch = ({ searchQueries, placeholder, handleSearch }: QuerySearchProps) => {
	const [searchValue, setSearchValue] = useState<string>('');

	return (
		<>
			<QueryInputContainer className="ui-inputgroup">
				<span className="p-input-icon-left">
					<i className="pi pi-search" onClick={() => handleSearch(searchValue)} />
					<InputText
						className="query-search"
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e?.target?.value);
							searchQueries(e?.target?.value);
						}}
						placeholder={placeholder}
						onKeyDown={(e) => {							
							e.key === 'Enter' && handleSearch(searchValue);
						}}
					/>
				</span>
			</QueryInputContainer>
		</>
	);
};
export default QuerySearch;
