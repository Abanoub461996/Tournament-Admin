import { PageContainer, TeamHeader, TeamMember, TeamMembers, TeamProfiler } from './TeamProfile.style';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import MemberInTeam from './MemberInTeam';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import teamCover from './../../../assets/images/user_cover.png';
import axiosInstance from '../../../core/api/axiosInstance';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import { Spinner } from 'react-bootstrap';
import QuerySearch from '../../../components/QuerySearch/QuerySearch';
import Button from '../../../components/Button/Button';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { useQuery } from 'react-query';
import { TabPanel, TabView } from 'primereact/tabview';
import addMember from './../../../assets/icons/teams/add-member.svg';
import AddTeamMember from './AddMember/AddMember';



const TeamProfile = () => {
	const [team, setTeam] = useState<any>(useLocation().state);
	const [safari, setSafari] = useState<boolean>(false);
	const { t } = useTranslation();
	const [totalMembers, setTotalMembers] = useState<number>();
	const [more, setMore] = useState<number>(0);
	const dispatch = useAppDispatch();
	// !the team sent as state to the child
	const { slug } = useParams();
	// !REACT QUERY
	const teamsPage = useQuery({
		queryKey: [`Team_members_profile-${slug}`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			return await axiosInstance.get(`teams/${slug}`);
		},
		onSuccess: (data: any) => {
			setTeam(data.data.record);
			data.data.record.members?.length > 9 ? setMore(9) : setMore(data.data.record.members.length);
			setTotalMembers(data.data.record.members?.length);
			setFilteredMembers(data.data.record.members);
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});
	const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
	const searchQueries = (value: string) => {
		if (!value) {
			setFilteredMembers(team.members);
		} else {
			const query = new RegExp(value, 'gi');
			const x = team.members.filter((team: any) => {
				return team.name.match(query);
			});
			setFilteredMembers(() => x);
		}
	};
	const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
	const [imagesLoading, setimagesLoading] = useState<boolean>(false);

	const showMore = async () => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		setMore(more + 5);
		dispatch(closeLoader());
	};
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const handleMembersAssigned = () => {
		teamsPage.refetch();
	};
	const renderPopUp = () =>
		showPopUp && <AddTeamMember assignedMembers={handleMembersAssigned} show={showPopUp} setShow={setShowPopUp} slug={slug} members={team.members} />;
	return (
		<>
			{renderPopUp()}

			{team && (
				<>
					<TeamHeader className={`${headerLoaded && imagesLoading ? '' : 'imageLoading'}`}>
						<img
							src={teamCover}
							alt="team header"
							onLoad={() => {
								setHeaderLoaded(true);
							}}
						/>
					</TeamHeader>
					<PageContainer className={`${headerLoaded ? '' : 'imageLoading'}`}>
						<TeamProfiler>
							<div className="team-identity">
								<figure className={`team-avatar ${safari ? 'team-avatar-safari' : ''}`}>
									<img
										src={`${import.meta.env.VITE_THUMBNAILS}${team.photo}`}
										alt="team avatar"
										onLoad={() => {
											setimagesLoading(true);
										}}
									/>
								</figure>
								<div className="team-content">
									<div className="team-name">{team.name}</div>
									<div className="team-slogan">{team.slogan}</div>
								</div>
							</div>
							<div className="search-input">
								<QuerySearch
									searchQueries={(x) => {
										searchQueries(x);
									}}
									placeholder={`${t('Search by name')}`}
								/>
							</div>
						</TeamProfiler>
					</PageContainer>
					<PageContainer style={{ marginTop: '-1.5em' }}>
						<TabView activeIndex={1} className="font-manrope">
							<TabPanel className="tabParentContainer disabled pointer-events-none" header={`${t('team_overview')}`}>
								<>overview</>
							</TabPanel>
							<TabPanel className="tabParentContainer" header={`${t('team_members')}`}>
								{team.members && (
									<TeamMembers>
										<TeamMember className="">
											<div className="add_member_container">
												<figure className={`member-add ${safari ? 'member-avatar-safari' : ''}`} onClick={() => setShowPopUp(true)}>
													<img src={addMember} alt="add new user" />
												</figure>
												<p className="member-name" data-pr-position="top">
												Add New Member
												</p>
											</div>
										</TeamMember>
										{filteredMembers.slice(0, more ? more : filteredMembers.length).map((member: any) => (
											<MemberInTeam member={member} key={member.slug} teamSlug={team.slug} memberRemoved={handleMembersAssigned}/>
										))}
									</TeamMembers>
								)}
								{more < filteredMembers.length && (
									<div className="showmore mb-4">
										<Button onClick={showMore} label={`${t('showmore')}`} rounded disabled={false ? true : false} />
									</div>
								)}
							</TabPanel>
						</TabView>
					</PageContainer>
				</>
			)}
		</>
	);
};
export default TeamProfile;
