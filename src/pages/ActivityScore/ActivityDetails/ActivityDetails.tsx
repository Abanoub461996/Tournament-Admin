import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import mime from 'mime'; 
import { giveUserScore, userActivityAnswer } from '../../../core/api/axiosCalls';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../../core/hooks/hooks';

// COMPONENTS
import { InputTextarea } from 'primereact/inputtextarea';
import UploadLink from './UploadLink';
import Slider from './Slider';
import { InputNumber } from 'primereact/inputnumber';
import { closeLoader, showLoader } from '../../../core/store/slices/loaderSlice';
import Spinner from '../../../components/Spinner/Spinner';
import Button from '../../../components/Button/Button';

// ASSETS
import { ActivityDetailsConatiner } from './ActivityDetails.style';
import noanswer from './../../../assets/images/activity-answers/noAnswers.svg';
import { resetDialogue } from '../../../core/store/slices/dialogueSlice';

const ActivityDetails = ({ memberAnswerId, scoreSent }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [answer, setAnswer] = useState<boolean>(false);
	const [score, setScore] = useState<number | null>();
	const [scored, setScored] = useState<boolean>(false);

	const [activityAns, setActivityAns] = useState<{
		answer: any;
		files: any;
		links: any;
	}>({
		answer: '',
		files: [],
		links: [{ src: '', type: '' }],
	});
	const activityMemberAnswers = useQuery({
		queryKey: [`Activity-members-answers-${memberAnswerId}`],
		queryFn: async () => {
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			if (memberAnswerId) {
				return await userActivityAnswer(memberAnswerId);
			} else {
				return;
			}
		},
		onSuccess: (data: any) => {
			if (memberAnswerId) {
				setAnswer(true);
				setScore(data.record.score);
				if (data.record.score !== null) {
					setScored(true);
				} else {
					setScored(false);
				}
				setActivityAns((prev) => {
					return {
						...prev,
						answer: data.record.answer,
						files: data.record.files?.map((file, i) => {
							return { src: file, type: mime.getType(file) };
						}),
						links: data.record.links,
					};
				});
			} else {
				setAnswer(false);
				setActivityAns({
					answer: '',
					files: [],
					links: [{ src: '', type: '' }],
				});
			}
		},
		onSettled: () => {
			dispatch(closeLoader());
		},
	});

	const setMemberScore = async () => {
		if (score) {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			try {
				const res = await giveUserScore(memberAnswerId, score);
				scoreSent(memberAnswerId);
				setScored(true);
			} catch (error) {}
			dispatch(closeLoader());
		}
	};
	return (
		<ActivityDetailsConatiner>
			{answer ? (
				<>
					{activityAns.answer && (
						<div className="form__field flex flex-col w-[10%]">
							<label className={`input__label`} htmlFor="answer">
								{t('field_label', { field: 'Activity Answer' })}
							</label>
							<InputTextarea rows={3} id="answer" className={`input__field`} style={{ maxHeight: 'none' }} value={activityAns.answer} readOnly />
						</div>
					)}
					{activityAns.links && <UploadLink name={`${t('Activity Links')}`} value={activityAns.links} />}
					{activityAns.files && (
						<div className="form__field flex flex-col w-[10%]">
							<label className={`input__label mb-4`}>{t('field_label', { field: 'Activity Files/Media' })}</label>
							<Slider imagesArr={activityAns.files} />
						</div>
					)}

					<div className="scoring__container ms-auto me-0 flex gap-2 items-center">
						<div className="score__text">Member Score</div>
						<div className="score__input__parent">
							<InputNumber className="score__input" value={score} onChange={(e) => setScore(e.value)} useGrouping={false} disabled={scored} />
						</div>
						<div className="submit__score">
							<Button
								type="button"
								label={`${t(`Save Changes`)}`}
								disabled={!score || scored}
								className="submit__score_btn ms-auto bg-primary text-white"
								onClick={setMemberScore}
							></Button>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="no__answer flex flex-col gap-4 items-center justify-center">
						<img src={noanswer} alt="no-answer" className="w-[40%] " />
						<div className="noanswer__text text-[#AFAFAF] font-[600]">Select a team member to view answers and submit score</div>
					</div>
				</>
			)}
		</ActivityDetailsConatiner>
	);
};

export default ActivityDetails;
