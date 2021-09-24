import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
    //setting up state for updating spicy food
    //food= initial // setFood= set function //spicyFoods = initial value
      const [foods, setFoods] = useState(spicyFoods);

    //function to add food
      function handleAddFood() {
        const newFood = getNewSpicyFood(); //setting newSpicyFood function = to variable
        const newFoodArray = [...foods, newFood]; // making new array by using spread operator to add NEWFOOD to FOOD
        setFoods(newFoodArray); //using setter function and passing in the new array to be rendered
      }
      //^^^ this whole function is triggered with the click event on the ADD FOOD button in the JSX below

      //renders the foods into a list - saved as foodList
      const foodList = foods.map((food) => ( //mapping over foods to put each food in its own li
        <li key={food.id} onClick={() => handleLiClick(food.id)}>
          {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        </li>
      ));
      //^^^^each li for each food is saved in the variable foodList and that is rendered in the ul in teh JSX below
      
      /////******* when we are setting state above, we are updating teh value of foods - this updates it in the foodlist and adds the new food to be mapped over and added to the li/ul in teh JSX



      //removing the li when it is clicked
      function handleLiClick(id) { //handdleClick is triggered when you click on the li element per the event listener in the JSX
        const newFoodArray = foods.filter((food) => food.id !== id); // filters over the foods array and looks for the id clicked and removes that element from the array then saves to new variable NewFoodArray
        setFoods(newFoodArray); //this array is passed through the update state function setFoods
      }



      const newfoodList = foods.map((food) => (
        <li key={food.id} onClick={() => handleLiClick(food.id)}>
          {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        </li>
      ));
      //updates heat when clicked
      function handleLiClick(id) { //triggered when you click on li element per the event listener int he JSX
        const newFoodArray = foods.map((food) => { //maps over foods, selecting the element clicked by comparing the id
          if (food.id === id) {
            return { //returning a new array of food with the heat level updated by one
              ...food,
              heatLevel: food.heatLevel + 1,
            };
          } else {
            return food; //if id is not equal then dont do anyhing
          }
        });
        setFoods(newFoodArray); ///then rendering this in the array
      }


      //another state to filter by cuisine in the dropdown menu within JSX below
      const [filterBy, setFilterBy] = useState("All");
      //filterBy= initial state / setfilterby = setter function / initial state is set to "All"

      function handleFilterChange(event) { //this handles the change event listener on the dropdown menu that is called in the JSX below
        setFilterBy(event.target.value);//sets new value to the value selected in teh dropdown
      }

      const foodsToDisplay = foods.filter((food) => { //filters out food by checking to see if it is === to the value selected in teh dropdown menu aka (the setfilter)
        if (filterBy === "All") {
          return true;
        } else {
          return food.cuisine === filterBy;
        }
      });

      const updatedFoodList = foodsToDisplay.map((food) => (
        <li key={food.id} onClick={() => handleLiClick(food.id)}>
          {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        </li>
      ));
      

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}{updatedFoodList}</ul>
      <select name="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
      </select>
      
    </div>
  );
}

export default SpicyFoodList;
