import { useState, useEffect, useRef } from 'react';
import { TeamMember } from './TeamProfile.style';
import { Tooltip } from 'primereact/tooltip';
import menu from '../../../assets/icons/teams/menu.png';
import { OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { ActionsButtonWarper, PopoverInnerWrapper } from '../../../components/Table/PopOver.style';
import deleteIcon from '../../../assets/icons/teams/delete.png';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { unassignTeamMember } from '../../../core/api/axiosCalls';
import { resetDialogue, setDialogue } from '../../../core/store/slices/dialogueSlice';
import deleteUserIcon from '../../../assets/icons/Group172565.png';
import { useTranslation } from 'react-i18next';
import successIcon from '../../../assets/icons/Group 171119.png';
import { toastifySuccess, toastifyWarn } from '../../../core/toaster/toastify';

const MemberInTeam = ({ member, teamSlug, memberRemoved }) => {
	const [avatarLoaded, setAvatarLoaded] = useState<boolean>(false);
	const [safari, setSafari] = useState<boolean>(false);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (navigator.userAgent.match(/OS X.*Safari/) && !navigator.userAgent.match(/Chrome/)) {
			setSafari(true);
		}
	}, []);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);

	useEffect(() => {
		// FAHMY WAS HERE
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);
	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setShowPopUp(false);
		}
	};
	const ref: any = useRef(null);
	const handleClick = (event) => {
		setShowPopUp(!showPopUp);
	};
	const confirmDeleteCup = () => {
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptLabel: `${t('Remove')}`,
				acceptColor: '#FF4A4A',
				textColor: '#FF4A4A',
				image: deleteUserIcon,
				hasAction: true,
				onAccept: () => deleteAction(),
				onReject: () => dispatch(resetDialogue()),
				rejectLabel: `${t('Cancel')}`,
				title: `${t('DeleteUserTitle')}`,
				text: `${t('DeleteUserText')}`,
			}),
		);
	};

	const deleteAction = async () => {
		if (member.position === 'leader') {
			toastifyWarn("You Can't Delete The Team Leader, Assign Different Team Lead To be Able To Delete This Member.");
			dispatch(resetDialogue());
		} else {
			try {
				dispatch(resetDialogue());
				dispatch(showLoader({ show: true, animation: <Spinner /> }));
				const res = await unassignTeamMember(teamSlug, { member: member.id });
				toastifySuccess(res.message.replace('"', ''));
				memberRemoved();
			} catch (error) {}
		}
		dispatch(closeLoader());
	};

	return (
		<>
			<TeamMember className={`${avatarLoaded ? '' : 'imageLoading'}`}>
				<div className="options_container">
					<OverlayTrigger
						placement="left"
						show={showPopUp}
						delay={{ show: 250, hide: 400 }}
						trigger="click"
						rootClose
						overlay={
							<Popover className="popover">
								<Popover.Body className="p-0 ">
									<PopoverInnerWrapper className="m-0 flex flex-col gap-0 items-start font-semibold">
										{/* <div onClick={(e) => editAction(e)} className=" edit__btn hover:bg-[#0000001A]">
											<img src={edit} alt="edit icon" />
											<div>Edit User</div>
										</div> */}
										<div onClick={(e) => confirmDeleteCup()} className="delete__btn hover:bg-[#0000001A] p-2">
											<img src={deleteIcon} alt="delete icon" />
											<div>Remove User</div>
										</div>
									</PopoverInnerWrapper>
								</Popover.Body>
							</Popover>
						}
					>
						<ActionsButtonWarper>
							<div className="menu_icon__btn" onClick={handleClick} ref={ref}>
								<img alt="menuIcons" src={menu} />
							</div>
						</ActionsButtonWarper>
					</OverlayTrigger>
				</div>
				<>
					<figure className={`member-avatar ${safari ? 'member-avatar-safari' : ''}`}>
						<img
							src={`${import.meta.env.VITE_THUMBNAILS}${member.photo}`}
							alt="team avatar"
							onLoad={() => {
								setAvatarLoaded(true);
							}}
						/>
					</figure>
					<Tooltip target=".member-name" showDelay={500} />
					<h3 className="member-name" data-pr-tooltip={member.name} data-pr-position="top">
						{member.name.split(' ').slice(0, 3).join(' ')}
					</h3>
					<Tooltip target=".member-email" showDelay={500} />
					<p className="member-email" data-pr-tooltip={member.email} data-pr-position="top">
						{member.email.indexOf('@') > 6 ? `${member.email.slice(0, 4)}...${member.email.slice(member.email.indexOf('@'))}` : member.email}
					</p>
					<h5 className={`member-role ${member.position === 'leader' ? 'lead' : 'member'}`}>{member.position}</h5>
				</>
			</TeamMember>
		</>
	);
};
export default MemberInTeam;
