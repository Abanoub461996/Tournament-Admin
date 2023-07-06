import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getCupKnockouts, getCups } from '../../../../core/api/axiosCalls';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../../core/store/slices/loaderSlice';
// COMPONENTS
import Cup4Teams from './StartedCup4Teams';
import Spinner from '../../../../components/Spinner/Spinner';
import StartedRound from './StartedRound';

// ASSETS
import { KnockOuts, PageContainer, RoundsHeader } from './StartedKnockouts.style';

const StartedKnockouts = ({rounds,teamsCount}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [cups, setCups] = useState<Array<Record<string, any>>>([]);
	const [cupName, setCupName] = useState<string>('');
	const [loaded, setLoaded] = useState<boolean>(false);
	const [totalTeams, setTotalTeams] = useState<number>(teamsCount);
	return (
		<>
			<PageContainer className="">
				{totalTeams > 5 ? (
						<>
							<RoundsHeader totalRounds={Math.log2(totalTeams)}>
								{!!rounds.length &&
									rounds.map((round, i) => {
									
										switch (i) {
											case rounds.length - 1:
												return (
													<div className="round__header final" key="final">
														<div className="m-auto py-2">{round.name}</div>
													</div>
												);
											case rounds.length - 2:
												return (
													<div className="round__header semi__final" key="semi__final">
														<div className="m-auto py-2">{round.name}</div>
													</div>
												);

											case rounds.length - 3:
												return (
													<div className="round__header quarter__final" key="quarter__final">
														<div className="m-auto py-2">{round.name}</div>
													</div>
												);
											case rounds.length - 4:
												return (
													<div className="round__header round__of__16" key="round__of__16">
														<div className="m-auto py-2">{round.name}</div>
													</div>
												);
											default:
												break;
										}
									})}
							</RoundsHeader>
							<KnockOuts totalRounds={Math.log2(totalTeams)}>
								{!!rounds.length &&
									rounds.map((round, i) => {
										return <StartedRound round={round} key={round.slug + '' + i} games={round.matches} totalRounds={Math.log2(totalTeams)} />;
									})}
							</KnockOuts>
						</>
					) : (
						<Cup4Teams rounds={rounds} />
					)}
			</PageContainer>
		</>
	);
};
export default StartedKnockouts;
