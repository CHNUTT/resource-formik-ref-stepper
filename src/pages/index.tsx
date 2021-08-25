import { Card, CardContent } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object } from 'yup';

export default function Home() {
	return (
		<Card>
			<CardContent>
				<FormikStepper
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
				</FormikStepper>
			</CardContent>
		</Card>
	);
}

export const FormikStepper = ({
	children,
	...props
}: FormikConfig<FormikValues>) => (
	<Formik {...props}>
		<Form autoComplete='off'>{children}</Form>
	</Formik>
);
