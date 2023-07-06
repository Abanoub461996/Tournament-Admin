import trophy from '../../../../assets/images/Cup.svg';

const StartedRound = ({ round, games, totalRounds }) => {
	return (
		<>
			<div className={`grid-round ${round.slug}`} data-round={games}>
				{round.name === 'Final' && (
					<>
						<div className={`final__trophy__parent absolute w-full ${totalRounds === 4 ? 'bottom-[calc(55%_+_1em)]' : 'bottom-[calc(60%_+_1em)]'}`}>
							<figure className={`final__trophy my-0 mx-auto ${totalRounds === 4 ? 'w-[calc(40%_-_1em)]' : 'w-[calc(27%_-_1em)]'} `}>
								<img src={trophy} alt="cup-trophy" />
							</figure>
						</div>
					</>
				)}
				{games.length &&
					games.map((game, i) => {
						return (
							<div className="round-game" key={i}>
								<div className={`game-pointer ${round.status === 'pending' ? 'pending' : ''}`}></div>
								{game.first_team ? (
									<>
										<div
											className={`cup__team__card  flex items-center justify-between ${game.first_team?.winner ? 'winner' : ''} ${
												game.first_team?.my_team ? 'my__team' : ''
											}`}
										>
											<div className="flex items-center gap-3">
												<figure className="cup__team__img">
													<img src={`${import.meta.env.VITE_THUMBNAILS}${game.first_team?.photo}`} alt="" />
												</figure>
												<div className="cup__team__name">{game.first_team.name}</div>
											</div>
											<div className="cup__team__score">{game.first_team_score ? game.first_team_score : '-'}</div>
										</div>
										<div
											className={`cup__team__card flex items-center justify-between ${game.second_team?.winner ? 'winner' : ''} ${
												game.second_team?.my_team ? 'my__team' : ''
											}`}
										>
											<div className="flex items-center gap-3">
												<figure className="cup__team__img">
													<img src={`${import.meta.env.VITE_THUMBNAILS}${game.second_team?.photo}`} alt="" />
												</figure>
												<div className="cup__team__name">{game.second_team.name}</div>
											</div>
											<div className="cup__team__score">{game.second_team_score ? game.second_team_score : '-'}</div>
										</div>
									</>
								):
								<>
										<div
											className={`cup__team__card cup__teamempty__card h-[50%] flex items-center justify-between`}
										>
											<div className="flex items-center gap-3">
												
											</div>
											<div className="cup__team__score"></div>
										</div>
										<div
											className={`cup__team__card cup__teamempty__card h-[50%] flex items-center justify-between`}
										>
											<div className="flex items-center gap-3">
												
											</div>
											<div className="cup__team__score"></div>
										</div>
									</>
								
								}
							</div>
						);
					})}
			</div>
		</>
	);
};
export default StartedRound;
