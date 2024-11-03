import { useState } from "react";

//f APP component
export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
  ]);
  const itemsNum = items.length;
  const packedItemsNum = items.filter((item) => item.packed).length;

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
      return items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item));
    });
  }

  function handleClearItems() {
    const confirm = window.confirm('Are you sure you want to delete all items?')
    if(confirm) setItems([])
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onClearItems={handleClearItems} onDeleteItem={handleDeleteItem} onPackItem={handlePackItem} />
      <Stats itemsNum={itemsNum} packedItemsNum={packedItemsNum} />
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
  const { items, onClearItems , onDeleteItem, onPackItem } = props;
  const [sortBy, setSortBy] = useState("packed");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  console.log("items: ", items);
  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item, itemIndex) => {
          return <Item item={item} index={itemIndex} onDeleteItem={onDeleteItem} onPackItem={onPackItem} />;
        })}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={() => onClearItems()}>Clear list</button>
      </div>
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
function Stats({ itemsNum, packedItemsNum }) {
  return (
    <footer className='stats'>
      <em>
        {" "}
        You have {itemsNum} items on your list, and you already packed {packedItemsNum} ({(packedItemsNum / itemsNum) * 100}%)
      </em>
    </footer>
  );
}
