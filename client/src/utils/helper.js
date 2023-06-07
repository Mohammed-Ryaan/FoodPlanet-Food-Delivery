//contains all the helper functions

export function searchRestaurant(searchText, allRestaurants) {
  const searchResult = allRestaurants.filter((restaurant) =>
    //Optional chaining to prevent errors
    restaurant?.data?.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  return searchResult;
}
