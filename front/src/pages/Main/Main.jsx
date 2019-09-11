import React from "react";
import Table from "../../components/TableAlert";

const Main = (React.FC = () => {
	return (
		<div className='App'>
		<h2 className='alert-table_title'>Create your Alerts</h2>
			<Table />
		</div>
	);
});

export default Main;
