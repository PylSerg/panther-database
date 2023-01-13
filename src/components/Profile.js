import { useState } from "react";

import CreateReportBlock from "./CreateReportBlock";

export default function Profile() {
	const [profileNavigationBlock, setProfileNavigationBlock] = useState({ show: true });
	const [profileNavigation, setProfileNavigation] = useState({
		create: true,
		reports: false,
	});

	return (
		<div>
			{profileNavigationBlock.show && (
				<div>
					<button name="create" type="button">
						Створити звіт
					</button>

					<button name="reports" type="button">
						Звіти
					</button>
				</div>
			)}

			{profileNavigation.create && <CreateReportBlock setProfileNavigationBlock={setProfileNavigationBlock} />}
		</div>
	);
}
