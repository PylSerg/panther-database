import xc from "../@x-console/x-console";

import { useState } from "react";

import CreateReportBlock from "./CreateReportBlock";
import ViewReportsBlock from "./ViewReportsBlock";

export default function Profile() {
	const [profileNavigationBlock, setProfileNavigationBlock] = useState({ show: true });

	const [profileNavigation, setProfileNavigation] = useState([
		{ name: "create", title: "Створити звіт", component: CreateReportBlock, active: true },
		{ name: "view", title: "Звіти", component: ViewReportsBlock, active: false },
	]);

	function buttonStyle(blockName) {
		const style = "profile__button";
		const activeStyle = "profile__button--active";

		for (const block of profileNavigation) {
			if (block.name === blockName && block.active) {
				return [style, activeStyle].join(" ");
			}
		}

		return style;
	}

	function showBlock(blockName) {
		const newProfileNavigation = [];

		for (const block of profileNavigation) {
			if (block.name === blockName) {
				newProfileNavigation.push({ ...block, active: true });
			} else {
				newProfileNavigation.push({ ...block, active: false });
			}
		}

		setProfileNavigation(newProfileNavigation);
	}

	return (
		<div>
			{profileNavigationBlock.show && (
				<div>
					{/*
						Navigation
					*/}

					{profileNavigation.map(block => (
						<button className={buttonStyle(block.name)} type="button" key={block.name} onClick={() => showBlock(block.name)}>
							{block.title}
						</button>
					))}
				</div>
			)}

			{/*
				BLOCKS
			*/}

			{profileNavigation.map(block => (
				<div key={block.name}>{block.active && <block.component setProfileNavigationBlock={setProfileNavigationBlock} />}</div>
			))}
		</div>
	);
}
