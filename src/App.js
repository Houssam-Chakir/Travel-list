import { useState } from "react";

//f APP component
export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
  ]);

  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => {
      items.filter((item) => item.id !== id);
    });
  }

  function handlePackItem(id) {
    setItems((items) => {
      return items.map((item) => (item.id === id) ? {...item, packed: !item.packed} : item);
    });
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onPackItem={handlePackItem} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

//f/ form component
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

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

//f/ pakcing list component
function PackingList(props) {
  const { items, onDeleteItem, onPackItem } = props;
  console.log("items: ", items);
  return (
    <div className='list'>
      <ul>
        {items.map((item, itemIndex) => {
          return <Item item={item} index={itemIndex} onDeleteItem={onDeleteItem} onPackItem={onPackItem} />;
        })}
      </ul>
    </div>
  );
}

//f/ item component
function Item(props) {
  const { item, index, onDeleteItem, onPackItem } = props;

  return (
    <li key={index}>
      <input
        type='checkbox'
        checked={item.packed}
        onChange={() => {
          onPackItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

//f/ stats component
function Stats() {
  return (
    <footer className='stats'>
      <em> You have x items on your list, and you already packed x (x%9)</em>
    </footer>
  );
}
