import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object } from 'yup';

export default function Home() {
	return (
		<Card>
			<CardContent>
				<Formik
					validationSchema={object({
						money: mixed().when('millionaire', {
							is: true,
							then: number().required().min(1_000_000),
							otherwise: number().required(),
						}),
					})}
					initialValues={{
						firstName: '',
						lastName: '',
						millionaire: false,
						money: 0,
						description: '',
					}}
					onSubmit={() => {}}
				>
					<Form autoComplete='off'>
						<Field name='firstName' component={TextField} label='First Name' />
						<Field name='lastName' component={TextField} label='Last Name' />
						<Field
							component={CheckboxWithLabel}
							name='millionaire'
							type='checkbox'
							label={{ label: 'I am a millionair' }}
						/>
						<Field
							name='money'
							type='number'
							component={TextField}
							label='All the money I have'
						/>
						<Field
							name='description'
							component={TextField}
							label='Description'
						/>
					</Form>
				</Formik>
			</CardContent>
		</Card>
	);
}
