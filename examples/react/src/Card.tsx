// Start of Selection
import React, { useState, useEffect } from "react";

const Card: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [cardClass, setCardClass] = useState<string>("card conditional-card");

  // Placeholder for conditionallyFormatted logic
  // You should replace this with the actual implementation or pass it as a prop
  useEffect(() => {
    // Example:
    // conditionallyFormatted.addListener(setCardBg);
    return () => {
      // conditionallyFormatted.removeListener(setCardBg);
    };
  }, []);

  const setCardBg = (value: number) => {
    // Reset the class names
    let newClass = "card conditional-card";

    // Apply conditional classes based on comparison
    if (value > inputValue) {
      newClass += " error";
    } else if (value === inputValue) {
      newClass += " warning";
    } else {
      newClass += " good";
    }

    setCardClass(newClass);
  };

  const handleClose = () => {
    // Cleanup listener if necessary
    // conditionallyFormatted.removeListener(setCardBg);
    // Handle card removal logic, possibly via a parent component
    // For example, you might have a state in the parent to remove this card
  };

  const decrement = () => {
    setInputValue((prev) => prev - 1);
    // setCardBg(conditionallyFormatted.value);
  };

  const increment = () => {
    setInputValue((prev) => prev + 1);
    // setCardBg(conditionallyFormatted.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setInputValue(value);
    setCardBg(/* conditionallyFormatted.value */ 0); // Replace 0 with the actual value from conditionallyFormatted
  };

  return (
    <div className={cardClass}>
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onMouseDown={decrement}>-</button>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onMouseDown={increment}>+</button>
      </div>
    </div>
  );
};

export default Card;
