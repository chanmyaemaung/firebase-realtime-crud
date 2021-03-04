import { useState, useEffect } from 'react';
const ContactForm = (props) => {
	const { addOrEdit, currentId, contactObj } = props;
	// Define Object
	const initializeValues = {
		fullName: '',
		mobile: '',
		email: '',
		address: '',
	};

	// Hook
	const [values, setValues] = useState(initializeValues);

	// onChange
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	// onSubmit
	const handleOnSubmit = (e) => {
		e.preventDefault();
		// Passing as props from parent components
		addOrEdit(values);
	};

	useEffect(() => {
		if (currentId === '') {
			setValues({ ...initializeValues });
		} else {
			setValues({ ...contactObj[currentId] });
		}
	}, [currentId, contactObj]); // just only use for if some functions are need in case.

	return (
		<>
			<form autoComplete='off' className='mt-3' onSubmit={handleOnSubmit}>
				<div className='input-group'>
					<div className='input-group-text'>
						<i className='fas fa-user text-success'></i>
					</div>
					<input
						required
						type='text'
						placeholder='Full Name'
						className='form-control'
						name='fullName'
						value={values.fullName}
						onChange={inputChangeHandler}
					/>
				</div>
				{/* Main Row */}
				<div className='row mt-2'>
					{/* Mobile */}
					<div className='col-md-6 mb-2'>
						<div className='form input-group'>
							<div className='input-group-text'>
								<i className='fas fa-mobile text-success'></i>
							</div>
							<input
								required
								type='text'
								placeholder='Mobile'
								className='form-control'
								name='mobile'
								value={values.mobile}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>
					{/* Email */}
					<div className='col-md-6 mb-2'>
						<div className='input-group'>
							<div className='input-group-text'>
								<i className='fas fa-envelope-open-text text-success'></i>
							</div>
							<input
								required
								type='email'
								placeholder='Email'
								className='form-control'
								name='email'
								value={values.email}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>
					{/* Address */}
					<div className='col-md-12 mb-2'>
						<div className='input-group'>
							<div className='input-group-text'>
								<i className='fas fa-map-marked text-success'></i>
							</div>
							<textarea
								type='text'
								placeholder='Address'
								className='form-control'
								name='address'
								value={values.address}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>
					<div className='input-group'>
						<input
							type='submit'
							className='form-control btn btn-block btn-secondary'
							value={currentId === '' ? 'Save' : 'Update'}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default ContactForm;
