import { useTranslation } from 'react-i18next';

// ASSETS
import { A4TeamsCup, SmallCup } from './StartedCup4Teams.style';
import trophy from '../../../../assets/images/Cup.svg';

const StartedCup4Teams = ({ rounds }) => {
	const { t } = useTranslation();

	return (
		<>
			<A4TeamsCup>
				<div className="round__header semi__final w-25">
					<div className="m-auto py-2">{t('semi-final')}</div>
				</div>
				<div className="round__header final w-50">
					<div className="m-auto py-2">{t('final')}</div>
				</div>
				<div className="round__header semi__final w-25">
					<div className="m-auto py-2">{t('semi-final')}</div>
				</div>
			</A4TeamsCup>

			<SmallCup>
				<div className="trophy__container">
					<figure className="trophy__image w-[calc(10em)]">
						<img src={trophy} alt="" />
					</figure>
				</div>
				<A4TeamsCup>
					<div className="small__cup__round w-25 ">
						<div className="round__game">
							<div className={`game-pointer ${rounds[0].status === 'pending' ? 'pending' : ''}`}></div>
							{rounds[0].matches[0].first_team && (
								<>
									<div
										className={`cup__team__card  flex items-center justify-between ${rounds[0].matches[0].first_team?.winner ? 'winner' : ''} ${
											rounds[0].matches[0].first_team?.my_team ? 'my__team' : ''
										}`}
									>
										<div className="flex items-center gap-3">
											<figure className="cup__team__img">
												<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[0].matches[0].first_team?.photo}`} alt="" />
											</figure>
											<div className="cup__team__name">{rounds[0].matches[0].first_team.name}</div>
										</div>
										<div className="cup__team__score">{rounds[0].matches[0].first_team_score ? rounds[0].matches[0].first_team_score : '-'}</div>
									</div>
									<div
										className={`cup__team__card flex items-center justify-between ${rounds[0].matches[0].second_team?.winner ? 'winner' : ''} ${
											rounds[0].matches[0].second_team?.my_team ? 'my__team' : ''
										}`}
									>
										<div className="flex items-center gap-3">
											<figure className="cup__team__img">
												<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[0].matches[0].second_team?.photo}`} alt="" />
											</figure>
											<div className="cup__team__name">{rounds[0].matches[0].second_team.name}</div>
										</div>
										<div className="cup__team__score">{rounds[0].matches[0].second_team_score ? rounds[0].matches[0].second_team_score : '-'}</div>
									</div>
								</>
							)}
						</div>
					</div>
					<div className="small__cup__round cup__final w-50 ">
						<div className="round__game w-50">
							{rounds[1].matches[0].first_team ? (
								<div
									className={`cup__team__card flex items-center justify-between ${rounds[1].matches[0].first_team?.winner ? 'winner' : ''} ${
										rounds[1].matches[0].first_team?.my_team ? 'my__team' : ''
									}`}
								>
									<div className="flex items-center gap-3">
										<figure className="cup__team__img">
											<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[1].matches[0].first_team?.photo}`} alt="" />
										</figure>
										<div className="cup__team__name">{rounds[1].matches[0].first_team.name}</div>
									</div>
									<div className="cup__team__score">{rounds[1].matches[0].first_team_score ? rounds[1].matches[0].first_team_score : '-'}</div>
								</div>
							) : (
								<div className={`cup__team__card cup__teamempty__card h-[50%] flex items-center justify-between`}>
									<div className="flex items-center gap-3"></div>
									<div className="cup__team__score"></div>
								</div>
							)}
						</div>
						<div>x</div>
						<div className="round__game cup__final w-50">
							{rounds[1].matches[0].first_team ? (
								<div
									className={`cup__team__card flex items-center justify-between ${rounds[1].matches[0].second_team?.winner ? 'winner' : ''} ${
										rounds[1].matches[0].second_team?.my_team ? 'my__team' : ''
									}`}
								>
									<div className="flex items-center gap-3">
										<figure className="cup__team__img">
											<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[1].matches[0].second_team?.photo}`} alt="" />
										</figure>
										<div className="cup__team__name">{rounds[1].matches[0].second_team.name}</div>
									</div>
									<div className="cup__team__score">{rounds[1].matches[0].second_team_score ? rounds[1].matches[0].second_team_score : '-'}</div>
								</div>
							) : (
								<div className={`cup__team__card cup__teamempty__card h-[50%] flex items-center justify-between`}>
									<div className="flex items-center gap-3"></div>
									<div className="cup__team__score"></div>
								</div>
							)}
						</div>
					</div>
					<div className="small__cup__round w-25 ">
						<div className="round__game">
							<div className={`game-pointer ${rounds[0].status === 'pending' ? 'pending' : ''}`}></div>
							{rounds[0].matches[1].first_team && (
								<>
									<div
										className={`cup__team__card  flex items-center justify-between ${rounds[0].matches[1].first_team?.winner ? 'winner' : ''} ${
											rounds[0].matches[1].first_team?.my_team ? 'my__team' : ''
										}`}
									>
										<div className="flex items-center gap-3">
											<figure className="cup__team__img">
												<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[0].matches[1].first_team?.photo}`} alt="" />
											</figure>
											<div className="cup__team__name">{rounds[0].matches[1].first_team.name}</div>
										</div>
										<div className="cup__team__score">{rounds[0].matches[1].first_team_score ? rounds[0].matches[1].first_team_score : '-'}</div>
									</div>
									<div
										className={`cup__team__card flex items-center justify-between ${rounds[0].matches[1].second_team?.winner ? 'winner' : ''} ${
											rounds[0].matches[1].second_team?.my_team ? 'my__team' : ''
										}`}
									>
										<div className="flex items-center gap-3">
											<figure className="cup__team__img">
												<img src={`${import.meta.env.VITE_THUMBNAILS}${rounds[0].matches[1].second_team?.photo}`} alt="" />
											</figure>
											<div className="cup__team__name">{rounds[0].matches[1].second_team.name}</div>
										</div>
										<div className="cup__team__score">{rounds[0].matches[1].second_team_score ? rounds[0].matches[1].second_team_score : '-'}</div>
									</div>
								</>
							)}
						</div>
					</div>
				</A4TeamsCup>
			</SmallCup>
		</>
	);
};

export default StartedCup4Teams;
