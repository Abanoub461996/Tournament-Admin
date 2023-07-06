import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { createCup } from '../../../../core/api/axiosCalls';

// COMPONENTS
import { TabPanel, TabView } from 'primereact/tabview';
import { CompetitionHeader, InnerDetailsContainer, MainDetailsLayout } from '../../../../layouts/TournamentLayout/CompetationDetails.style';
import Spinner from '../../../../components/Spinner/Spinner';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
import { resetDialogue, setDialogue } from '../../../../core/store/slices/dialogueSlice';
import Knockouts from './KnockOuts/KnockOuts';

// ASSETS
import successIcon from '../../../../assets/icons/Group 171119.png';
import Button from '../../../../components/Button/Button';
import { routeModel } from '../../../../core/enum/routeModels';

export interface Team {
	name: string;
	slug: string;
	photo: string;
	members_count: number;
	id: number | null;
}
export const teamInit: Team = {
	name: '',
	slug: '',
	photo: '',
	members_count: 0,
	id: null,
};
export interface FinalTeamsInt {
	teams:Array<Team>
}
const CreateKnockouts = () => {
	
	const location = useLocation();
	const state = location.state;
	const [finalTeams, setFinalTeams] = useState<FinalTeamsInt>({teams : new Array(state.teams.length).fill(teamInit)});
	const { t } = useTranslation();
	const formData = new FormData();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleCreate = async () => {
		formData.append('name', state.data.name);
		formData.append('type', state.data.type);
		formData.append('photo', state.newImage);
		formData.append('teams_count', state.data.teamsNo);
		finalTeams.teams.map((el, i) => {
			formData.append(`teams[]`, JSON.stringify(el.id));
		});

		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await createCup(formData);
			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: t('createCupTitle'),
					text: res.message,
				}),
			);
			dispatch(closeLoader());
			setTimeout(() => dispatch(resetDialogue()), 2000);
			navigate(`/${routeModel.championsCup}/${res.slug}`,{state:{status:'pending',slug:res.slug}});
		} catch (error) {}
		dispatch(closeLoader());
		setTimeout(() => dispatch(resetDialogue()), 2000);
	};
	const [randomized,setRandomized] = useState<number>(0)
	const randomGenerate = () => {
		const array = state.teams;
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		setFinalTeams({teams:array});
		setRandomized(randomized+1)
	};
	return (
		<MainDetailsLayout>
			<CompetitionHeader>
				<div className="header__container">
					<div className="competition__identifier">
						<figure className="header__image">
							{state.newImage && <img src={window.URL.createObjectURL(state.newImage)} alt="competition logo image" />}
						</figure>
						<div className="header__text">
							<div className="tournament__name">{state.data.name}</div>
							<div className="round__number">{t('no_rounds')}</div>
						</div>
					</div>
				</div>
			</CompetitionHeader>
			<InnerDetailsContainer>
				<div className="cup__controllers flex">
					<button onClick={randomGenerate} className="cup__teams_randomize">
						Generate Randomly
					</button>
					<Button
						onClick={() => handleCreate()}
						type="submit"
						label={t('save_changes')}
						className="cup__create ms-auto bg-primary text-white"
					></Button>
				</div>
				<TabView activeIndex={1}>
					<TabPanel className="tabParentContainer" header={`${t('tour__rounds', { key: 'Champions Cup' })}`} disabled></TabPanel>
					<TabPanel className="tabParentContainer" header={`${t('knockout_stage')}`}>
						<Knockouts handleCreate={handleCreate} finalTeams={finalTeams} setFinalTeams={setFinalTeams} randomized={randomized}/>
					</TabPanel>
				</TabView>
			</InnerDetailsContainer>
		</MainDetailsLayout>
	);
};

export default CreateKnockouts;
