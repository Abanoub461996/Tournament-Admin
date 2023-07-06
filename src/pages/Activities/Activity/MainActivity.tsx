import React, { useEffect, useState, useRef } from 'react';
import { MyActivityContainer, PageContainer } from './MainActivity.style';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { useNavigate } from 'react-router';
import { useLocation, useParams } from 'react-router-dom';
import { TeamHeader, TeamProfiler } from '../../Teams/TeamProfile/TeamProfile.style';
import coverImg from '../../../assets/images/activity_cover.png';
import ActivityData from './ActivityOverview';
import ActivityDetails from './ActivityDetails/ActivityDetails';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

const MainActivity = () => {
	const { state } = useLocation();
	const {  description, duration, name, photo, type, roundEndDate, activityType, activityImg } = state;

	const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
	const [imagesLoading, setimagesLoading] = useState<boolean>(false);
	const [safari, setSafari] = useState<boolean>(false);

	return (
		<MyActivityContainer>
			<TeamHeader className={` ${headerLoaded && imagesLoading ? '' : 'imageLoading'}`}>
				<img
					src={coverImg}
					alt="activity-covwe"
					onLoad={() => {
						setHeaderLoaded(true);
					}}
					className={`cov-img ${safari ? 'cov-img-safari' : ''}`}
				/>
			</TeamHeader>
			<PageContainer className={`${headerLoaded ? '' : 'imageLoading'}`}>
				<TeamProfiler>
					<div className="team-identity ">
						<figure className="team-avatar">
							<img
								src={activityImg}
								alt="activity avatar"
								onLoad={() => {
									setimagesLoading(true);
								}}
							/>
						</figure>
						<div className="team-content">
							<div className="team-name">{name}</div>
							<div className="team-slogan">
								<p className="activityRole">{type}</p>
							</div>
						</div>
					</div>
				</TeamProfiler>
			</PageContainer>

			<div className="pageContent ">
				<div className="rightSec">
					<ActivityData activity={state} />
				</div>
				{type === 'game' || type === 'quiz' ? (
					<div className="leftSec">
						<p>Game/Quiz</p>
						{/* <FrameContainer>
									<FrameComp token={activityData.record.token} url={activityData.activity.url} activitySlug={slug} />
								</FrameContainer> */}
					</div>
				) : (
					<div className="leftSec relative">
						<ActivityDetails activity={useLocation().state} />
					</div>
				)}
			</div>
		</MyActivityContainer>
	);
};

export default MainActivity;
