import { useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { ImagesCollection, MemberImg, TeamMemberCount } from './TeamMembersImgs.style';
import './PopUp.css';

const TeamMembersImgs = ({ test = 'false', members, clearmembersCount = 3, width = 25, height = 25, leftRatio = 25, dir = 'ltr' }) => {
	const [show, setShow] = useState<boolean>(false);

	const [imagesLoading, setimagesLoading] = useState(true);

	const handellParentHover = () => {
		const elementParent: any = document.getElementById('parent');
		elementParent.classList.add('childHover');
	};

	const handellParentLeave = () => {
		const elementParent: any = document.getElementById('parent');
		elementParent.classList.remove('childHover');
	};
	
	return (
		<ImagesCollection
			className={`${imagesLoading ? '' : 'imageLoading'}`}
			width={width}
			clearmembersCount={clearmembersCount}
			length={members.length}
		>
			<Tooltip style={{ filter: 'none!important' }} showDelay={100} />

			{members &&
				members.slice(0, clearmembersCount).map((member: any, index: number) => (
					<MemberImg leftRatio={leftRatio} width={width} height={height} key={index} index={index} dir={dir} individual={members.length}>
						<Tooltip style={{ filter: 'none!important', boxShadow: 'none' }} target=".img" showDelay={100} />

						<img
							className="img"
							width="100%"
							height="100%"
							src={`${import.meta.env.VITE_THUMBNAILS}${member.photo}`}
							alt="Team Member"
							data-pr-tooltip={member.name}
							data-pr-position="top"
							onLoad={() => {
								setimagesLoading(true);
							}}
						/>
					</MemberImg>
				))}
			{imagesLoading && members && (
				<OverlayTrigger
					placement="bottom-start"
					show={show}
					delay={{ show: 250, hide: 400 }}
					overlay={
						<Popover
							onMouseMove={() => {
								setShow(true);
								handellParentHover();
							}}
							onMouseLeave={() => {
								setShow(false);
								handellParentLeave();
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<Popover.Body className="popUpBody">
								{members.slice(3).map((element, i) => (
									<div className="memberParent" key={i}>
										<img
											className="popImg"
											// className="img"
											width="100%"
											height="100%"
											src={`${import.meta.env.VITE_THUMBNAILS}${element.photo}`}
											alt="Team Member"
											onLoad={() => {
												setimagesLoading(true);
											}}
										/>
										<p className="memberName">{element.name}</p>
									</div>
								))}
							</Popover.Body>
						</Popover>
					}
				>
					<TeamMemberCount
						onMouseMove={() => setShow(true)}
						onMouseLeave={() => setShow(false)}
						className="other pointer "
						dir={dir}
						leftRatio={leftRatio}
						width={width}
						clearmembersCount={clearmembersCount}
						number={clearmembersCount}
						length={members.length}
					>
						+{members?.length - clearmembersCount}
					</TeamMemberCount>
				</OverlayTrigger>
			)}
		</ImagesCollection>
	);
};

export default TeamMembersImgs;
