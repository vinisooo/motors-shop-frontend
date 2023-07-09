type colorOptions = "purple-1" | "purple-2" | "purple-3" | "purple-4" | "purple-5" | "purple-6" | "green-1" | "green-2" | "green-3" | "pink-1" | "pink-2" | "pink-3"


const getRandomColor = () => {
  const options: colorOptions[] = ["purple-1", "purple-2", "purple-3", "purple-4", "purple-5", "purple-6", "green-1", "green-2", "green-3", "pink-1", "pink-2", "pink-3"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export default getRandomColor 