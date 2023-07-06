import { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { useTranslation } from 'react-i18next';

import QuerySearch from '../../components/QuerySearch/QuerySearch';
import BreadcrumbsComp from '../../components/BreadCrumb/BreadCrumb';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { PageContainer } from './FAQ.style';
import { closeLoader, showLoader } from '../../core/store/slices/loaderSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch } from '../../core/hooks/hooks';
import { deleteFAQ, getFAQs } from '../../core/api/axiosCalls';
import { ActionsButtonWarper } from '../../components/Table/Table.style';
import menu from '../../assets/icons/teams/menu.png';
import edit from '../../assets/icons/teams/edit.png';
import deleteIcon from '../../assets/icons/teams/delete.png';
import { resetDialogue, setDialogue } from '../../core/store/slices/dialogueSlice';
import deleteUserIcon from '../../assets/icons/Group172565.png';
import successIcon from '../../assets/icons/Group 171119.png';
import Popup from '../../components/Popup/Popup';
import FAQPopUp from './FAQPopUp';
import CreateBtn from '../../components/CreateBtn/CreateBtn';

type faqDataType = {
	question: string;
	answer: string;
	id: number;
	slug: string;
};

const FAQs = () => {
	// const faqs: any = useLoaderData();
	const { t } = useTranslation();
	const [faqs, setFaqs] = useState();
	const FAQs: any = faqs || [];
	const [filteredQu, setFilteredQu] = useState<faqDataType[]>(FAQs);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [action, setAction] = useState<string>('');
	const [editedFaq, setEditedFaq] = useState<any>({});

	const dispatch = useAppDispatch();

	const getData = async () => {
		dispatch(showLoader({ show: true, animation: <Spinner /> }));
		try {
			const res = await getFAQs();
			setFaqs(res.records);
			setFilteredQu(res.records);
			dispatch(closeLoader());
		} catch (error) {
			dispatch(closeLoader());
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const searchQueries = (value: string) => {
		if (!value) {
			setFilteredQu(FAQs);
		} else {
			const query = new RegExp(value, 'gi');
			const x = FAQs.filter((qu: any) => {
				return qu.question.match(query);
			});
			setFilteredQu(() => x);
		}
	};

	const renderPopUp = () =>
		showPopUp === true && (
			<Popup
				title={`${action} FAQ`}
				content={
					<FAQPopUp
						show={showPopUp}
						setShow={setShowPopUp}
						getData={getData}
						action={action}
						data={action === 'create' ? null : editedFaq}
						slug={action === 'create' ? null : editedFaq.slug}
					/>
				}
				show={showPopUp}
				setShow={setShowPopUp}
			/>
		);

	const editAction = (slug: string) => {
		const editedFaqData = FAQs.find((item) => item.slug === slug);
		setEditedFaq(editedFaqData);
		setShowPopUp(true);
		setAction('edit');
	};

	const deleteAction = (slug: string) => {
		dispatch(
			setDialogue({
				show: true,
				type: 'Confirmation',
				acceptLabel: `${t('Remove')}`,
				acceptColor: '#FF4A4A',
				textColor: '#FF4A4A',
				image: deleteUserIcon,
				hasAction: true,
				onAccept: () => handleDelete(slug),
				onReject: () => dispatch(resetDialogue()),
				rejectLabel: `${t('Cancel')}`,
				title: `${t('DeleteFaqTitle')}`,
				text: `${t('DeleteFaqText')}`,
			}),
		);
	};

	const handleDelete = async (slug: string) => {
		try {
			dispatch(resetDialogue());
			dispatch(showLoader({ show: true, animation: <Spinner /> }));
			const res = await deleteFAQ(slug);

			dispatch(
				setDialogue({
					show: true,
					type: 'Confirmation',
					acceptColor: '#65A743',
					textColor: '#65A743',
					image: successIcon,
					hasAction: false,
					title: `${t('removeUserTitle')}`,
					text: res.message,
				}),
			);
			setTimeout(() => dispatch(resetDialogue()), 2500);
			getData();
		} catch (error) {}
	};

	const actionsButtons = (data: any) => {
		const [showPopUp, setShowPopup] = useState(false);
		const handleClick = (event) => {
			event.stopPropagation();
			setShowPopup(!showPopUp);
		};
		useEffect(() => {
			// FAHMY WAS HERE
			document.addEventListener('click', handleClickOutside, true);
			return () => {
				document.removeEventListener('click', handleClickOutside, true);
			};
		}, []);
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowPopup(false);
			}
		};
		const ref: any = useRef(null);

		return (
			<OverlayTrigger
				placement="bottom"
				show={showPopUp}
				// show={true}
				delay={{ show: 250, hide: 400 }}
				trigger="click"
				rootClose
				overlay={
					<Popover className="">
						<Popover.Body className="p-0 ">
							<div className="m-0 flex flex-col gap-0 items-start font-semibold">
								<div
									onClick={(event) => {
										event.stopPropagation();
										editAction(data.slug);
									}}
									className=" w-full edit__btn flex gap-2 cursor-pointer p-2 lg:text-xs text-sm hover:bg-[#0000001A]"
								>
									<img src={edit} alt="edit icon" />
									<div>Edit</div>
								</div>

								<div
									onClick={(event) => {
										event.stopPropagation();
										deleteAction(data.slug);
									}}
									className="delete__btn flex gap-2 cursor-pointer p-2 hover:bg-[#0000001A]"
								>
									<img src={deleteIcon} alt="edit icon" />
									<div>Delete</div>
								</div>
							</div>
						</Popover.Body>
					</Popover>
				}
			>
				<ActionsButtonWarper>
					<div className="menu_icon__btn p-2 " onClick={handleClick} ref={ref}>
						<img alt="menuIcons" src={menu} />
					</div>
				</ActionsButtonWarper>
			</OverlayTrigger>
		);
	};

	return (
		<>
			<PageContainer className="gapedContainer">
				<div className="faqs-header ">
					<div>
						<BreadcrumbsComp />
						<p className="page-title">{`${t('How Can We Help?')}`}</p>
					</div>
					<CreateBtn
						label="Add New Question"
						handleAction={() => {
							setShowPopUp(true);
							setAction('create');
						}}
					/>
				</div>

				<div className="faq-container">
					<div className="queContainer">
						{filteredQu.map((item: faqDataType, index: number) => {
							if (!(index % 2))
								return (
									<Panel
										key={index}
										headerTemplate={(options: any) => {
											return (
												<div
													onClick={options.onTogglerClick}
													className="p-panel-header cursor-pointer "
													style={{
														color: options.togglerElement.props[`aria-expanded`] === true ? '#01ABC1' : '#58595B',
														backgroundColor: options.togglerElement.props[`aria-expanded`] === true ? '#01ABC11A' : '#AFAFAF1A',
														padding: '1.5em',
													}}
												>
													<div>{`${index + 1}. ${item.question}`}</div>

													{actionsButtons(item)}
												</div>
											);
										}}
										className="quItem"
										header={`${index + 1}. ${item.question}`}
										toggleable
										collapsed={index === 0 ? false : true}
									>
										<p className="m-0">{item.answer}</p>
									</Panel>
								);
						})}
					</div>
					<div className="queContainer">
						{filteredQu.map((item: faqDataType, index: number) => {
							if (index % 2)
								return (
									<Panel
										key={index}
										headerTemplate={(options: any) => (
											<div
												onClick={options.onTogglerClick}
												className="p-panel-header cursor-pointer"
												style={{
													color: options.togglerElement.props[`aria-expanded`] === true ? '#01ABC1' : '#58595B',
													backgroundColor: options.togglerElement.props[`aria-expanded`] === true ? '#01ABC11A' : '#AFAFAF1A',
													padding: '1.5em',
												}}
											>
												<div>{`${index + 1}. ${item.question}`}</div>
												{actionsButtons(item)}
											</div>
										)}
										className="quItem"
										header={`${index + 1}. ${item.question}`}
										toggleable
										collapsed={index === 0 ? false : true}
									>
										<p className="m-0">{item.answer}</p>
									</Panel>
								);
						})}
					</div>
				</div>
			</PageContainer>
			{renderPopUp()}
		</>
	);
};
export default FAQs;
