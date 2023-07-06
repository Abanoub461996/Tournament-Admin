import React, { useEffect, useRef, useState } from 'react';
import plus from '../../../../../assets/icons/cup/add.png';
import { ReactComponent as Remove } from './../../../../../assets/icons/teams/remove-circle.svg';
import SearchSelect from '../../../../../components/SearchSelect/SearchSelect';
import { teamInit } from '../CreateKnockOuts';

const CupTeam = ({ teams, unAssignTeamHandler, addTeamHandler, teamIndx, team }) => {
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [currentTeam, setCurrentTeam] = useState(teamInit);

	const teamAdded = (childTeam) => {
		setCurrentTeam(childTeam);
		addTeamHandler(teamIndx, childTeam);
	};
	const teamUnassigned = () => {
		unAssignTeamHandler(teamIndx, currentTeam);
		setCurrentTeam(teamInit);
	};
	useEffect(()=>{		
		setCurrentTeam(team)
	},[team])
	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowPopUp(false);
				}
			}
			// Bind the event listener
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	return (
		<>
			<div className="cup__team">
				{showPopUp && <SearchSelect popupRef={wrapperRef} teams={teams} addTeamHandler={teamAdded} setShowPopUp={setShowPopUp} />}
				{currentTeam && currentTeam?.slug ? (
					<div className="cup__team__card  flex items-center justify-between">
						<div className="flex items-center gap-3">
							<figure className="cup__team__img">{<img src={`${import.meta.env.VITE_THUMBNAILS}${currentTeam?.photo}`} alt="" />}</figure>
							<div className="cup__team__name">{currentTeam.name}</div>
						</div>
						<Remove
							className="w-[calc(1.5em)] cursor-pointer stroke-[#AFAFAF] fill-[#AFAFAF] hover:stroke-[#c70000] hover:fill-[#c70000]"
							onClick={(e) => {
								teamUnassigned();
							}}
						/>
					</div>
				) : (
					<>
						<div
							onClick={(e) => {
								setShowPopUp(true);
							}}
							className={`cup__addteam__card flex justify-center gap-2 text-[#AFAFAF] items-center`}
						>
							<figure className="">
								<img src={plus} alt="" />
							</figure>
							<div className="cup__addteam">Set Team</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CupTeam;
