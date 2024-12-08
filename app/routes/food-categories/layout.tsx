import {Outlet} from "react-router";
import {getFoodCategory} from "~/.server/db/dao/food-categories";
import {H1, P} from "~/components/ui/typography";
import type {Route} from "./+types/layout";

export async function loader({params}: Route.LoaderArgs) {
  if (params.category) {
    return {
      foodCategory: await getFoodCategory(params.category),
      param: params.category,
    };
  }
  return {
    foodCategory: null,
    param: params.category,
  };
}

export default function FoodCategoriesLayout({
  loaderData,
}: Route.ComponentProps) {
  let {foodCategory} = loaderData;

  if (foodCategory === null) {
    return <H1>Category not found</H1>;
  }

  return (
    <div>
      <div>
        <H1>Food category - {foodCategory.name}</H1>
        {foodCategory.description !== null && <P>{foodCategory.description}</P>}
      </div>
      <Outlet context={{foodCategory}} />
    </div>
  );
}
