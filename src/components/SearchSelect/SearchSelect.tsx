import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ListBox } from 'primereact/listbox';
import { useTranslation } from 'react-i18next';
import { ListBoxChangeEvent } from 'primereact/listbox';



export default function SearchSelect({ teams, addTeamHandler ,popupRef ,setShowPopUp}) {
	const { t } = useTranslation();
	

	const teamTemplate = (team: any) => {
		return (
		<>
			 <div className="member__container flex gap-2 text-xs items-center">
				<img className="w-[2em] h-[2em] rounded-[50%]" src={import.meta.env.VITE_THUMBNAILS + team.photo} alt="leaderIcon" />
				<span className="member__name">{team.name}</span>
			</div>
		</>
		);
	};

	return (
		<div className="add__overlay__parent flex flex-col mb-2 absolute z-30" ref={popupRef}>
			<div className="mb-2">
				<label className={`input__label`} htmlFor="email">
					{t('field_label', { field: 'Set Team' })}
				</label>
			</div>
			<div className="datalist__parent">
				<ListBox
					filter
					value={teams}
					filterPlaceholder={`${t('users_search')}`}
					options={teams}
					optionLabel="model"
					itemTemplate={teamTemplate}
					onSelect={function(e) {
						e.stopPropagation();
					}}
					onChange={(e)=>{
						e.stopPropagation();
						addTeamHandler(e.value)
						setShowPopUp(false)
					}}
					filterBy="name,email"
					className={`w-full md:w-14rem datalist__container`}
					listStyle={{ maxHeight: '160px' }}
				/>
			</div>
		</div>
	);
}
