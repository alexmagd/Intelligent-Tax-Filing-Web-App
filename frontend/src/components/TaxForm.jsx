import { useState } from "react";

/*
  TaxForm Component

  Responsibilities:
  - Manages local form state (income & expenses)
  - Validates user input
  - Sends data upward via onCalculate prop
*/

function TaxForm({ onCalculate }) {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (income <= 0 || expenses < 0) {
      alert("Please enter valid numbers.");
      return;
    }

    try {
      // Send POST request to FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: Number(income),
          expenses: Number(expenses),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Send backend results up to parent component
      onCalculate(data.taxable_income, data.estimated_tax);
    } catch (error) {
      console.error("Backend connection error:", error);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Annual Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Total Expenses"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
        required
      />

      <button type="submit">Calculate</button>
    </form>
  );
}

// Styling for layout structure
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
};

export default TaxForm;
