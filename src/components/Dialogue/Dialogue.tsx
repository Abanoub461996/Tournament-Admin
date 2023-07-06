import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { getDialogue, resetDialogue } from '../../core/store/slices/dialogueSlice';

import Button from '../Button/Button';
import { ConfirmationContainer, MainPopUpContainer, SuccessContainer } from './Dialogue.style';

const DialogComponent = () => {
	const dialogue = useAppSelector(getDialogue);
	const dispatch = useAppDispatch();

	switch (dialogue.type) {
		case 'Confirmation':
			return (
				<MainPopUpContainer>
					<Dialog
						draggable={false}
						closable={false}
						visible={dialogue.show}
						style={{ width: '35%', minWidth: '500px' }}
						onHide={() => dispatch(resetDialogue())}
					>
						<ConfirmationContainer color={dialogue.textColor}>
							<img className="dialogImg" src={dialogue.image} alt="success" />
							<div className="leftSide " >
								<h3 className="dialogTitle">{dialogue.title}</h3>
								<p className="dialogText">{dialogue.text}</p>
								{dialogue.hasAction && (
									<div className="dialogBtns">
										<Button
											onClick={dialogue.onReject}
											label={dialogue.rejectLabel}
											width="45%"
											backgroundColor="#FFFFFF"
											borderColor="#AFAFAF"
											color="#AFAFAF"
											rounded
											className='btn'
										/>
										<Button
											onClick={dialogue.onAccept}
											label={dialogue.acceptLabel}
											width="45%"
											backgroundColor={dialogue.acceptColor}
											borderColor={dialogue.acceptColor}
											rounded
											className='btn'
										/>
									</div>
								)}
							</div>
						</ConfirmationContainer>
					</Dialog>
				</MainPopUpContainer>
			);

		case 'Success':
			return (
				<MainPopUpContainer>
					<Dialog
						draggable={false}
						closable={dialogue.closable}
						visible={dialogue.show}
						style={{ width: '30vw' }}
						onHide={() => dispatch(resetDialogue())}
					>
						<SuccessContainer color={dialogue.textColor}>
							<img src={dialogue.image} alt="success" />
							<h3 className="dialogTitle">{dialogue.title}</h3>
							<p className="successText">{dialogue.text}</p>
							<Button
								onClick={dialogue.onAccept}
								label={dialogue.acceptLabel}
								width="50%"
								backgroundColor={dialogue.acceptColor}
								borderColor={dialogue.acceptColor}
								rounded
							/>
						</SuccessContainer>
					</Dialog>
				</MainPopUpContainer>
			);
		default:
			return <div>def</div>;
	}
};

export default DialogComponent;
