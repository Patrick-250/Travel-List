import React, { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, packed: false },
  { id: 4, description: "T-Shirts", quantity: 5, packed: false },
  { id: 5, description: "Shorts", quantity: 3, packed: false },
  { id: 6, description: "Shoes", quantity: 2, packed: false },
  { id: 7, description: "Laptop", quantity: 1, packed: false },
  { id: 8, description: "Charger", quantity: 1, packed: false },
  { id: 9, description: "Headphones", quantity: 1, packed: false },
  { id: 10, description: "Camera", quantity: 1, packed: false },
  { id: 11, description: "Jacket", quantity: 1, packed: false },
  { id: 12, description: "Swimwear", quantity: 2, packed: false },
  { id: 13, description: "Socks", quantity: 7, packed: false },
  { id: 14, description: "Underwear", quantity: 7, packed: false },
  { id: 15, description: "Hat", quantity: 1, packed: false },
  { id: 16, description: "Book", quantity: 1, packed: false },
  { id: 17, description: "Snacks", quantity: 5, packed: false },
  { id: 18, description: "Water Bottle", quantity: 1, packed: false },
  { id: 19, description: "Notebook", quantity: 1, packed: false },
  { id: 20, description: "Pen", quantity: 2, packed: false },
  { id: 21, description: "Sunglasses", quantity: 1, packed: false },
  { id: 22, description: "Map", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [numberOfItems, setNumberOfItems] = useState(1);

  const handleCheckboxChange = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setNumberOfItems((prevNumber) => Math.max(prevNumber - 1, 1)); // Ensure the number of items does not go below 1
  };

  const handleEditItem = (id, newDescription, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, description: newDescription, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onNumberChange={setNumberOfItems} />
      <PackingList
        items={items}
        onCheckboxChange={handleCheckboxChange}
        onRemoveItem={handleRemoveItem}
        onEditItem={handleEditItem}
        numberOfItems={numberOfItems}
      />
      <Stats items={items} numberOfItems={numberOfItems} />
    </div>
  );
}

function Logo() {
  return <h1>🧳Ready Away✈️</h1>;
}

function Form({ onNumberChange }) {
  return (
    <div className="add-form">
      <h3>How many items on your next trip?</h3>
      <select onChange={(e) => onNumberChange(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

function PackingList({
  items,
  onCheckboxChange,
  onRemoveItem,
  onEditItem,
  numberOfItems,
}) {
  return (
    <div className="list">
      <ul>
        {items.slice(0, numberOfItems).map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onCheckboxChange(item.id)}
            />
            <EditableItem
              item={item}
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditableItem({ item, onEditItem, onRemoveItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    onEditItem(item.id, description, quantity);
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  ) : (
    <div>
      {item.description}, {item.quantity}
      <button className="edit-button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button className="remove-button" onClick={() => onRemoveItem(item.id)}>
        X
      </button>
    </div>
  );
}

function Stats({ items, numberOfItems }) {
  const displayedItems = items.slice(0, numberOfItems);
  const packedItems = displayedItems.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      <em>
        💼 You have {numberOfItems} items on your list, and you already packed{" "}
        {packedItems}.
      </em>
    </footer>
  );
}
