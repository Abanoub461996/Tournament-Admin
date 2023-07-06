import React, { useState } from 'react';

// COMPONENTS
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Checkbox } from 'primereact/checkbox';

// ASSETS
import { TeamsAccordionContainer } from './TeamsAccordion.style';
import { BsImage } from 'react-icons/bs';

export default function Accordions({ teams, setMemberAnswerID, setMember ,selectedMember}) {
	const viewAnswers = (member) => {
		setMemberAnswerID(member.answer_id);
		setMember(member.name);
	};
	return (
		<TeamsAccordionContainer>
			<div className="card">
				<Accordion activeIndex={0}>
					{teams ? (
						teams?.map((team) => {
							return (
								<AccordionTab
									key={team.slug}
									header={
										<div className="flex align-items-center accordion__header justify-between w-[100%]">
											<div className="flex align-items-center gap-2">
												<figure className="accordion__header__image">
													<img src={`${import.meta.env.VITE_THUMBNAILS}${team.photo}`} alt="accordion-team-photo" />
												</figure>
												<span className="vertical-align-middle">{team.name}</span>
											</div>
											<Checkbox className="scoring__check" checked={team.members.every((el) => el.scored)}></Checkbox>
										</div>
									}
								>
									{team.members.map((member) => {
										return (
											<div
												className={`flex align-items-center accordion__content justify-between cursor-pointer ${!member.played ? 'disabled' : ''} ${(member.name == selectedMember) ? 'highlighted' : ''}`}
												key={member.slug}
												onClick={() => member.played && viewAnswers(member)}
											>
												<div className="flex align-items-center gap-2">
													<figure className="accordion__content__image">
														<img src={`${import.meta.env.VITE_THUMBNAILS}${member.photo}`} alt="accordion-team-photo" />
													</figure>
													<span className="vertical-align-middle">{member.name}</span>
												</div>
												<Checkbox className="scoring__check" checked={member.scored}></Checkbox>
											</div>
										);
									})}
								</AccordionTab>
							);
						})
					) : (
						<AccordionTab
						className='animate-pulse'
							key={1}
							header={
								<div className="flex align-items-center accordion__header justify-between w-[100%]">
									<div className="flex align-items-center gap-2">
										<figure className="accordion__header__image  rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0">
										</figure>
										<span className="vertical-align-middle h-4 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0"></span>
									</div>
									<Checkbox className="scoring__check  rounded-md bg-gray-200 dark:bg-gray-700 xl:w-60 border-0" checked={false}></Checkbox>
								</div>
							}
						>
							<div className={`flex align-items-center accordion__content justify-between w-[90%] mx-auto my-2 cursor-pointer`} key={3000}>
								<div className="flex align-items-center gap-2">
									<figure className="accordion__content__image rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0">
									</figure>
									<span className="vertical-align-middle h-4 w-40 rounded-md bg-gray-200 dark:bg-gray-700 xl:w-60"></span>
								</div>
								<Checkbox className="scoring__check rounded-full bg-gray-200 dark:bg-gray-700 xl:w-60 border-0" checked={false}></Checkbox>
							</div>
							<div className={`flex align-items-center accordion__content justify-between w-[90%] mx-auto my-2 cursor-pointer`} key={4000}>
								<div className="flex align-items-center gap-2">
									<figure className="accordion__content__image rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0">
									</figure>
									<span className="vertical-align-middle h-4 w-40 rounded-md bg-gray-200 dark:bg-gray-700 xl:w-60"></span>
								</div>
								<Checkbox className="scoring__check rounded-full bg-gray-200 dark:bg-gray-700 xl:w-60 border-0" checked={false}></Checkbox>
							</div>
							<div className={`flex align-items-center accordion__content justify-between w-[90%] mx-auto my-2 cursor-pointer`} key={5000}>
								<div className="flex align-items-center gap-2">
									<figure className="accordion__content__image rounded-lg bg-gray-200 dark:bg-gray-700 xl:w-60 border-0">
									</figure>
									<span className="vertical-align-middle h-4 w-40 rounded-md bg-gray-200 dark:bg-gray-700 xl:w-60"></span>
								</div>
								<Checkbox className="scoring__check rounded-full bg-gray-200 dark:bg-gray-700 xl:w-60 border-0" checked={false}></Checkbox>
							</div>
						</AccordionTab>
					)}
				</Accordion>
			</div>
		</TeamsAccordionContainer>
	);
}
