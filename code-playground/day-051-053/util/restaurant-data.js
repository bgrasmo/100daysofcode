const filePath = path.join(__dirname, 'data', 'restaurants.json');

const getStoredRestaurants = () => {
  const fileData = fs.readFileSync(filePath);
  // const storedRestaurants = JSON.parse(fileData);
  // return storedRestaurants;

  return JSON.parse(fileData);
}

const storeRestaurants = storableRestaurants => {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}