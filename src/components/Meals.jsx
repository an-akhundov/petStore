import useHttp from "../hooks/useHttp";
import Meal from "./Meal";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
