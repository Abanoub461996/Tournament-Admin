import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './QueryDropdown.css';
import temaIcon from '../../assets/images/Group 170089.png';
import sortIcon from '../../assets/icons/sort.png';
import { ReactComponent as SortIcon } from '../../assets/icons/sort.svg';
import { ReactComponent as DropDown } from '../../assets/icons/general/dropDown.svg';


const QueryDropdown = ({sorting, options, searchQueries, disabled = false, classNames }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const selectedOptionTemplate = (option, props) => {
		return (
			<div className="align-items-center option-in-dd flex">
				{sorting&&<img src={sortIcon} alt="" className='w-[1.25em] h-[1em] rounded-[50%]' />}
				<p>{option ? option.name : props.placeholder}</p>
			</div>
		);
	
	};

	const optionTemplate = (option) => {
		return (
			<div className="align-items-center option-in-dd flex">
				{sorting&&<img src={sortIcon} alt="" className='w-[1.25em] h-[1em] rounded-[50%]' />}
				<p>{option.name}</p>
			</div>
		);
	};

	return (
		<div className="card justify-content-center flex" style={{ border: 'none', width: 'fill-available' }}>
			<Dropdown
				disabled={disabled}
				value={selectedOption}
				options={options}
				optionLabel="name"
				placeholder={selectedOption.name}
				valueTemplate={selectedOptionTemplate}
				itemTemplate={optionTemplate}
				style={{ borderRadius: '0.5em' }}
				className={`drop-down_query font-manrope md:w-14rem h-[0.06%] w-full ${classNames}`}
				dropdownIcon={<DropDown className="drop_down_arrow"/>}
				onChange={(e) => {
					setSelectedOption(e.value);
					searchQueries(e.value);
				}}
			/>
		</div>
	);
};
export default QueryDropdown;
