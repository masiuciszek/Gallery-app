import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";

import type {Metadata} from "next/types";
import {FoodItem} from "./_components/food-item";
import {getFoodItemData} from "./dao";

type Props = {
	params: Promise<{
		fooditem: string;
	}>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	return {
		title: params.fooditem,
		description: `Nutritional values of ${params.fooditem}`,
	};
}

export default async function FoodItemPage(props: Props) {
	let slug = await props.params;
	let foodItem = await getFoodItemData(slug.fooditem);

	if (!foodItem) {
		return <div>Food item not found {slug.fooditem}</div>;
	}

	return (
		<PageWrapper>
			<H1>{foodItem.name}</H1>
			<div className="my-5 flex w-[30rem] ">
				<FoodItem foodItem={foodItem} />
			</div>
		</PageWrapper>
	);
}
