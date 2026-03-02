import { useState } from "react";
import TaxForm from "./components/TaxForm"; // It should have been "./components/TaxForm" but for some reason it only works this way
import ResultCard from "./components/ResultCard";

/*
  Main Application Component

  Responsibilities:
  - Holds the global state (calculated tax result)
  - Passes a handler function to TaxForm
  - Conditionally renders ResultCard
*/

function App() {
  // State to store calculated tax results
  const [result, setResult] = useState(null);

  /*
    Function that gets passed down to TaxForm.
  */
  const handleCalculation = (taxableIncome, estimatedTax) => {
    setResult({
      taxableIncome,
      estimatedTax,
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Intelligent Tax Filing Assistant</h1>
        <p>
          Enter your income and expenses to receive an estimated tax
          calculation.
        </p>

        {/* Passing calculation handler as a prop */}
        <TaxForm onCalculate={handleCalculation} />

        {/* Conditional rendering:
            ResultCard only shows if result exists */}
        {result && (
          <ResultCard
            taxableIncome={result.taxableIncome}
            estimatedTax={result.estimatedTax}
          />
        )}
      </div>
    </div>
  );
}

/*
  Inline styles used for layout structure.
  In larger applications, this would likely be replaced
  by CSS modules or a styling framework.
*/
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "420px",
  },
};

export default App;
