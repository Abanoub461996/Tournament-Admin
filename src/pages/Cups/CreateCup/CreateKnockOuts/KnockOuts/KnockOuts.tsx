import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../../../../core/hooks/hooks';
import { closeLoader, showLoader } from '../../../../../core/store/slices/loaderSlice';
import { getCupKnockouts, getCups, getCupsPages } from '../../../../../core/api/axiosCalls';

// Components
import Round from './Round';
import Spinner from '../../../../../components/Spinner/Spinner';

// Assets
import { KnockOuts, PageContainer, RoundsHeader } from './KnockOuts.style';
import emptyCup from '../../../../../assets/images/empty_tournament.svg';
import Cup4Teams from './Cup4Teams';
interface KnockOutsProps {
	teamsType?: string;
	handleCreate?: any;
	randomized?: number;
	finalTeams: any;
	setFinalTeams: any;
}
const Knockouts = ({ handleCreate, finalTeams, setFinalTeams, randomized, teamsType }: KnockOutsProps) => {
	const location = useLocation();
	const state = location.state;
	const { t } = useTranslation();
	const [rounds, setRounds] = useState<Array<number>>(new Array(Math.log2(finalTeams.teams.length)).fill(8));
	const [totalTeams, setTotalTeams] = useState<number>(finalTeams.teams.length);

	const cupRounds = Math.log2(totalTeams);
	useEffect(() => {
		setRounds((prev) => {
			return prev.map((el, i) => {
				if (i && i < prev.length) {
					return totalTeams / Math.pow(2, i);
				} else {
					return totalTeams;
				}
			});
		});
	}, [cupRounds]);

	return (
		<>
			<PageContainer className="">
				{!!totalTeams ? (
					totalTeams > 5 ? (
						<>
							<RoundsHeader totalRounds={cupRounds}>
								{rounds.length &&
									rounds.map((round, i) => {
										switch (i) {
											case rounds.length - 1:
												return (
													<div className="round__header final" key="final">
														<div className="m-auto py-2">Final</div>
													</div>
												);
											case rounds.length - 2:
												return (
													<div className="round__header semi__final" key="semi__final">
														<div className="m-auto py-2">Semi-final</div>
													</div>
												);

											case rounds.length - 3:
												return (
													<div className="round__header quarter__final" key="quarter__final">
														<div className="m-auto py-2">Quarter-final</div>
													</div>
												);
											case rounds.length - 4:
												return (
													<div className="round__header round__of__16" key="round__of__16">
														<div className="m-auto py-2">Round of 16</div>
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
										return (
											<Round
											teamsType={teamsType}
												round={round}
												key={i + 16}
												games={round / 2}
												totalRounds={cupRounds}
												handleCreate={handleCreate}
												finalTeams={finalTeams}
												setFinalTeams={setFinalTeams}
												randomized={randomized}
											/>
										);
									})}
							</KnockOuts>
						</>
					) : (
						<Cup4Teams teamsType={teamsType} handleCreate={handleCreate} finalTeams={finalTeams} setFinalTeams={setFinalTeams} randomized={randomized} />
					)
				) : (
					<div className="mt-20">
						<img src={emptyCup} className="m-auto w-1/5 opacity-80" alt="" />
						<p className="mt-4 text-center font-manropeSemiBold text-lg text-[#fff]">
							{t('no-cups-pt1')}
							<br />
							{t('no-cups-pt2')}
						</p>
					</div>
				)}
			</PageContainer>
		</>
	);
};
export default Knockouts;
