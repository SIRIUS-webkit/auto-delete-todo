"use client";
import React, { useRef, useState } from "react";

type TodoItem = {
  id: number;
  type: "Fruit" | "Vegetable";
  name: string;
};

const initialItems: TodoItem[] = [
  { id: 1, type: "Fruit", name: "Apple" },
  { id: 2, type: "Vegetable", name: "Broccoli" },
  { id: 3, type: "Vegetable", name: "Mushroom" },
  { id: 4, type: "Fruit", name: "Banana" },
  { id: 5, type: "Vegetable", name: "Tomato" },
  { id: 6, type: "Fruit", name: "Orange" },
  { id: 7, type: "Fruit", name: "Mango" },
  { id: 8, type: "Fruit", name: "Pineapple" },
  { id: 9, type: "Vegetable", name: "Cucumber" },
  { id: 10, type: "Fruit", name: "Watermelon" },
  { id: 11, type: "Vegetable", name: "Carrot" },
];

const Home = () => {
  const [leftItems, setLeftItems] = useState<TodoItem[]>(initialItems);
  const [fruitItems, setFruitItems] = useState<TodoItem[]>([]);
  const [vegItems, setVegItems] = useState<TodoItem[]>([]);

  // Keep track of timers for each moved item
  const timersRef = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const moveToCategory = (item: TodoItem) => {
    // Remove the item from the main list
    setLeftItems((prev) => prev.filter((it) => it.id !== item.id));

    // Add item to the appropriate category column
    if (item.type === "Fruit") {
      setFruitItems((prev) => [...prev, item]);
    } else {
      setVegItems((prev) => [...prev, item]);
    }

    // Set a 5-second timer to return the item
    const timer = setTimeout(() => {
      if (item.type === "Fruit") {
        setFruitItems((prev) => prev.filter((it) => it.id !== item.id));
      } else {
        setVegItems((prev) => prev.filter((it) => it.id !== item.id));
      }
      setLeftItems((prev) => [...prev, item]);
      delete timersRef.current[item.id];
    }, 5000);
    timersRef.current[item.id] = timer;
  };

  const handleLeftItemClick = (item: TodoItem) => {
    moveToCategory(item);
  };

  const handleRightItemClick = (item: TodoItem) => {
    // Cancel the timer if clicked before 5 seconds
    if (timersRef.current[item.id]) {
      clearTimeout(timersRef.current[item.id]);
      delete timersRef.current[item.id];
    }
    // Remove from its category column, then place it back in the main list immediately
    if (item.type === "Fruit") {
      setFruitItems((prev) => prev.filter((it) => it.id !== item.id));
    } else {
      setVegItems((prev) => prev.filter((it) => it.id !== item.id));
    }
    setLeftItems((prev) => [...prev, item]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Auto Delete Todo List</h1>
      <div className="grid grid-cols-12 gap-3 items-stretch">
        {/* Main Todo List */}
        <div className="col-span-12 lg:col-span-4 bg-gray-100 p-4 rounded shadow mb-6 md:mb-0">
          <h2 className="text-2xl mb-4">Main Todo List</h2>
          <div className="flex flex-wrap gap-2">
            {leftItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLeftItemClick(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category columns */}

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-green-100 p-4 rounded shadow">
          <h2 className="text-2xl mb-4">Fruits</h2>
          <div className="flex flex-wrap gap-2">
            {fruitItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleRightItemClick(item)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-orange-100 p-4 rounded shadow">
          <h2 className="text-2xl mb-4">Vegetables</h2>
          <div className="flex flex-wrap gap-2">
            {vegItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleRightItemClick(item)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
