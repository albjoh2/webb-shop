import Categories from "./components/categories/categories.component";

const categories = [
  { id: 1, title: "Båt", imageUrl: require("./img/båt.jpg") },
  { id: 2, title: "Tillbehör", imageUrl: require(`./img/tillbehör.jpg`) },
  { id: 3, title: "Fiske", imageUrl: require("./img/fiske.jpg") },
  {
    id: 4,
    title: "Vattenskoter",
    imageUrl: require("./img/vattenskoter.jpg"),
  },
  { id: 5, title: "Övrigt", imageUrl: require("./img/övrigt.jpg") },
];

const App = () => {
  return <Categories categories={categories} />;
};

export default App;
