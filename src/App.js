import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
  ]);

  return (
    <div className='app'>
      <Logo />
      <Form setItems={setItems} items={items} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form(props) {
  const {items, setItems} = props
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    setItems([...items, newItem])

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😁</h3>
      <select name='' id='' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      <input type='text' placeholder='Items...' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
function PackingList(props) {
  const { items } = props;
  return (
    <div className='list'>
      <ul>
        {items.map((item, itemIndex) => {
          return <Item item={item} index={itemIndex} />;
        })}
      </ul>
    </div>
  );
}

function Item(props) {
  const { item, index } = props;
  return (
    <li key={index}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className='stats'>
      <em> You have x items on your list, and you already packed x (x%9)</em>
    </footer>
  );
}
