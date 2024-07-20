import { ActionFunctionArgs } from "@remix-run/node";
import AddButton from "../components/form/add_button";
import Input from "../components/form/input";
import { Form, redirect } from "@remix-run/react";
import { getWriter, insertWriter } from "~/utils/db";

export default function Page(): JSX.Element {
	return (
		<Form method="post" className="layout gap-6 rounded-2xl bg-white">
			<h1 className="headline">Tambah Penulis</h1>
			<div className="row-section flex-wrap gap-6 md:gap-4">
				<Input
					defaultValue=""
					name="writer"
					label="Nama Penulis"
					type="text"
					data={null}
				/>
			</div>
			<AddButton />
		</Form>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const body: FormData = await request.formData();
	const writer: { name: string } = {
		name: String(body.get("writer")),
	};

	const search: { id: number; name: string } | null = await getWriter(writer);

	let result: { id: number; name: string };

	if (search === null) {
		result = await insertWriter(writer);
	}

	return redirect("/");
}
