import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

// COMPONENTS
import { TabPanel, TabView } from 'primereact/tabview';
import { CompetitionHeader, InnerDetailsContainer, MainDetailsLayout } from './CompetationDetails.style';

// ASSETS
import settingsIcon from "./../../../assets/icons/tournaments/setting.png"
const CupDetails = () => {
	const location = useLocation();
	const { t } = useTranslation();

	return (
		<MainDetailsLayout>
			<CompetitionHeader>
				<div className="header__container">
					<div className="competition__identifier">
						<figure className="header__image">
							<img src="http://foo.localhost:8000/storage/thumbnails/temp/user.png" alt="competition logo image" />
						</figure>
						<div className="header__text">
							<div className="tournament__name">The Monsters Tournament</div>
							<div className="round__number">Round 12</div>
						</div>
					</div>
					<div className="settings__btn">
                        <img src={settingsIcon} alt="settingsIcon" />
                        <div>Tournament Settings</div>
                        </div>
				</div>
			</CompetitionHeader>
			<InnerDetailsContainer>
				<TabView className=" ">
					<TabPanel className="tabParentContainer" header={`${t('tour__rounds',{key:"Champions Cup"})}`}>
						page1
					</TabPanel>
					<TabPanel className="tabParentContainer" header={`${t('knockout_stage')}`}>
						page2
					</TabPanel>
				</TabView>
				{/* <pre>{JSON.stringify(location.state)}</pre> */}
			</InnerDetailsContainer>
		</MainDetailsLayout>
	);
};

export default CupDetails;
