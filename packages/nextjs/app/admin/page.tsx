import { NextPage } from "next";
import { FormNewAirport } from "./_components/FormAirport";
import { FormNewCheckPoint } from "./_components/FormCheckPoint";

const AdminPage: NextPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">Admin Page</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-4">Register New Airport Partner</h2>
					<FormNewAirport />
				</div>
				<div>
					<h2 className="text-xl font-semibold mb-4">Register New Checkpoint</h2>
					<FormNewCheckPoint />
				</div>
			</div>
		</div>
	)
}

export default AdminPage;
