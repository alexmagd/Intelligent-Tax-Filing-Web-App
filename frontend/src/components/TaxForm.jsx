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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (income <= 0 || expenses < 0) {
      alert("Please enter valid numbers.");
      return;
    }

    // Pass numeric values back to parent
    onCalculate(Number(income), Number(expenses));
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
