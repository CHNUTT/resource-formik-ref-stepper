import React, { useState } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
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
					<div>
						<Field name='firstName' component={TextField} label='First Name' />
						<Field name='lastName' component={TextField} label='Last Name' />
						<Field
							component={CheckboxWithLabel}
							name='millionaire'
							type='checkbox'
							label={{ label: 'I am a millionair' }}
						/>
					</div>
					<div>
						<Field
							name='money'
							type='number'
							component={TextField}
							label='All the money I have'
						/>
					</div>
					<div>
						<Field
							name='description'
							component={TextField}
							label='Description'
						/>
					</div>
				</FormikStepper>
			</CardContent>
		</Card>
	);
}

export const FormikStepper = ({
	children,
	...props
}: FormikConfig<FormikValues>) => {
	const childrenArray = React.Children.toArray(children);

	// Note: only show the children of each step
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step];

	// Note: check isLastStep?
	const isLastStep = () => step === childrenArray.length - 1;

	return (
		<Formik
			{...props}
			// Note: Submit or go to next step
			onSubmit={async (values, helpers) => {
				if (step === childrenArray.length - 1) {
					await props.onSubmit(values, helpers);
				} else {
					setStep((s) => s + 1);
				}
			}}
		>
			<Form autoComplete='off'>
				{/* Note: display the current step elements */}
				{currentChild}
				{/* Note: conditional rendering button */}
				{step > 0 && (
					<Button onClick={() => setStep((s) => s - 1)}>Back</Button>
				)}
				<Button type='submit'>{isLastStep() ? 'Submit' : 'Next'}</Button>
			</Form>
		</Formik>
	);
};
