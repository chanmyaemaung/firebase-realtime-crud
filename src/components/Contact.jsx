import ContactForm from './ContactForm';
import firebaseDB from '../firebase';
import { useEffect, useState } from 'react';

const Contact = () => {
	const [contactObj, setContactObj] = useState({});
	const [currentId, setCurrentId] = useState('');

	// TODO: Insert and Update into FireBase as an object either ADD or EDIT
	const dbName = 'contacts';
	const addOrEdit = (obj) => {
		if (currentId === '') {
			firebaseDB.child(dbName).push(obj, (err) => {
				if (err) {
					console.log(err);
				}
			});
		} else {
			firebaseDB.child(`${dbName}/${currentId}`).set(obj, (err) => {
				if (err) {
					console.log(err);
				}
			});
		}
	};

	// TODO: Retrieve data from the Database
	useEffect(() => {
		firebaseDB.child(dbName).on('value', (snapshot) => {
			if (snapshot.val() != null) {
				setContactObj({
					...snapshot.val(),
				});
			} else {
				setContactObj({});
			}
		});
	}, []);

	// TODO: DELETE
	const onDelete = (key) => {
		if (window.confirm('Are you sure to delete this?')) {
			firebaseDB.child(`${dbName}/${key}`).remove((err) => {
				if (err) {
					console.log(err);
				} else {
					setCurrentId('');
				}
			});
		}
	};

	return (
		<>
			<div className='bg-light p-5 text-center shadow-sm'>
				<h1 className='display-5'>Firebase Realtime CRUD</h1>
			</div>
			<div className='row'>
				<div className='col-md-5'>
					<ContactForm {...{ addOrEdit, currentId, contactObj }} />
				</div>
				<div className='col-md-7'>
					<div className='mt-3 text-center'>All the list of contacts</div>
					<table className='table table-hover'>
						<thead className='thead-light'>
							<tr>
								<th>Full Name</th>
								<th>Mobile</th>
								<th>Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* Loop through data from the database */}
							{Object.keys(contactObj).map((id) => {
								return (
									<tr key={id}>
										<td>{contactObj[id].fullName}</td>
										<td>{contactObj[id].mobile}</td>
										<td>{contactObj[id].email}</td>
										<td>
											<a className='btn me-1' onClick={() => setCurrentId(id)}>
												<i className='fas fa-pencil-alt text-info'></i>
											</a>
											<a className='btn' onClick={() => onDelete(id)}>
												<i className='fas fa-trash-alt text-danger'></i>
											</a>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Contact;
