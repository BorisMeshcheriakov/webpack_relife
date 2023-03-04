import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useEventEditorTime } from 'library/hooks/events';
import { mask } from 'library/helpers/events/timePicker';
import { FormHelperText, IconButton, Fade, Box, ClickAwayListener, Popper } from '@mui/material';
import { InputMask, TimePopUp } from './frames';
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';

import st from './TimePicker.module.scss';

interface Props {
	control: Control<any>;
	disabled: boolean;
	label: string;
	index: number;
	name: any;
}

const TimePicker: FC<Props> = ({ control, name, disabled, label, index }) => {
	const timeEdior = useEventEditorTime();

	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
					<>
						<InputMask
							value={timeEdior.normalizeTime(value)}
							onChange={onChange}
							onBlur={onBlur}
							mask={mask}
							disabled={disabled}
							handler={timeEdior.handleInputBtnClick}
							label={label}
							name={name}
							error={error?.message ?? ''}
							matches={timeEdior.matches}
							index={index}
							getDate={timeEdior.getDate}
						/>

						<FormHelperText sx={{ marginLeft: '14px' }} error={!!error?.message}>
							{error?.message ?? ''}
						</FormHelperText>

						{timeEdior.visible &&
							(timeEdior.matches ? (
								<Popper
									id={timeEdior.idAnchor}
									open={timeEdior.visible}
									anchorEl={timeEdior.anchorEl}
									transition
									style={{ zIndex: 20 }}
								>
									{({ TransitionProps }) => (
										<Fade {...TransitionProps} timeout={350}>
											<Box>
												<ClickAwayListener onClickAway={timeEdior.handlePopUpClose}>
													<Box>
														<TimePopUp
															getDate={timeEdior.getDate}
															index={index}
															setChecked={timeEdior.setChecked}
															value={timeEdior.normalizeValue(value)}
															onChange={onChange}
															handler={timeEdior.handlePopUpClose}
														/>
													</Box>
												</ClickAwayListener>
											</Box>
										</Fade>
									)}
								</Popper>
							) : (
								<Modal
									isOpen={timeEdior.visible}
									ariaHideApp={false}
									className={st.modal}
									overlayClassName={st.overlay}
									onRequestClose={timeEdior.handlePopUpClose}
									shouldCloseOnOverlayClick={true}
								>
									<TimePopUp
										getDate={timeEdior.getDate}
										index={index}
										setChecked={timeEdior.setChecked}
										value={timeEdior.normalizeValue(value)}
										onChange={onChange}
										handler={timeEdior.handlePopUpClose}
									/>
									<IconButton
										onClick={timeEdior.handlePopUpClose}
										sx={{ position: 'absolute', zIndex: '100002', top: '2px', right: '0' }}
									>
										<Close />
									</IconButton>
								</Modal>
							))}
					</>
				)}
			/>
		</>
	);
};

export default TimePicker;
