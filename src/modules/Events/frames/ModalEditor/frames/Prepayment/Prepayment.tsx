import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormHelperText } from '@mui/material';
import { CustomEditorInputControlled } from 'library/components/authentication/InputsControlled';
import { Card } from 'library/components/ui';
import { numberMask } from 'library/helpers/events/timePicker';

import st from './Prepayment.module.scss';

const Prepayment: FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<fieldset>
			<h3>Предоплата</h3>
			<Card className={st.prepay}>
				<div className={st.wrapper}>
					<Box sx={{ width: 231 }}>
						<CustomEditorInputControlled
							control={control}
							name="prepayment_cost"
							error={!!errors.prepayment_cost}
							label="Предоплата"
							sufix={'₽'}
							mask={numberMask}
							// disabled={!!id} // заглушка
						/>
						{/* Во время заполнения полей будет отображаться вспомогательный текст, а 
            во вермя ошибок валидации поля он будет сменяться на сообщение от сервера */}
						{/* заменить поле на errors.prepayment_cost */}
						{!!errors.prepayment_cost ? (
							<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.prepayment_cost}>
								{`${errors.prepayment_cost?.message}`}
							</FormHelperText>
						) : (
							<FormHelperText
								sx={{ marginLeft: '14px', whiteSpace: 'normal !important', padding: '5px 0' }}
							>
								{'При заполнении данного поля, сумма оплаты будет равна данной сумме '}
							</FormHelperText>
						)}
					</Box>
				</div>
			</Card>
		</fieldset>
	);
};

export default Prepayment;
