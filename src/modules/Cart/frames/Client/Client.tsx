import React from 'react';
import { Controller } from 'react-hook-form';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import { CartValues } from 'library/types/cart';

import { Phone } from 'library/components/common';

import st from './Client.module.scss';
import { useClientData } from 'library/hooks/cart';

const Client: React.FC = () => {
	const client = useClientData();
	const { control } = useFormContext<CartValues>();

	return (
		<div className={st.client}>
			<Controller
				control={control}
				name="last_name"
				render={({ field, fieldState: { error } }) => (
					<div className={cn(st.wrapper, error && st.error)}>
						<label htmlFor="last_name">Фамилия</label>
						<input
							id="last_name"
							type="text"
							value={field.value}
							ref={field.ref}
							onChange={(e: any) => {
								field.onChange(e);
								client.handleChange(e.target.value, 'last_name', client.client);
							}}
						/>
						<p>{error?.message}</p>
					</div>
				)}
				defaultValue={client.last_name}
			/>

			<Controller
				control={control}
				name="first_name"
				render={({ field, fieldState: { error } }) => (
					<div className={cn(st.wrapper, error && st.error)}>
						<label htmlFor="first_name">Имя</label>
						<input
							id="first_name"
							type="text"
							value={field.value}
							ref={field.ref}
							onChange={(e: any) => {
								field.onChange(e);
								client.handleChange(e.target.value, 'first_name', client.client);
							}}
						/>
						<p>{error?.message}</p>
					</div>
				)}
				defaultValue={client.first_name}
			/>

			<Controller
				control={control}
				name="middle_name"
				render={({ field, fieldState: { error } }) => (
					<div className={cn(st.wrapper, error && st.error)}>
						<label htmlFor="middle_name">Отчество</label>
						<input
							id="middle_name"
							type="text"
							value={field.value}
							ref={field.ref}
							onChange={(e: any) => {
								field.onChange(e);
								client.handleChange(e.target.value, 'middle_name', client.client);
							}}
						/>
						<p>{error?.message}</p>
					</div>
				)}
				defaultValue={client.middle_name}
			/>

			<div className={cn(st.wrapper, st.phone)}>
				<Controller
					name="phone"
					control={control}
					render={({ field, fieldState: { error } }) => {
						return (
							<>
								<Phone
									value={field.value}
									onChange={(e: any) => {
										field.onChange(e);
										client.handleChange(e, 'phone', client.client);
									}}
									ref={field.ref}
									label="Телефон"
									name="phone"
									error={error?.message}
								/>
								<p>{error?.message}</p>
							</>
						);
					}}
					// defaultValue={client.phone}
				/>
			</div>

			<Controller
				control={control}
				name="email"
				render={({ field, fieldState: { error } }) => (
					<div className={cn(st.wrapper, error && st.error)}>
						<label htmlFor="email">Электронная почта</label>
						<input
							id="email"
							type="text"
							value={field.value}
							ref={field.ref}
							onChange={(e: any) => {
								field.onChange(e);
								client.handleChange(e.target.value, 'email', client.client);
							}}
						/>
						<p>{error?.message}</p>
					</div>
				)}
				defaultValue={client.email}
			/>
		</div>
	);
};

export default Client;
