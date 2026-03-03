import { useState } from "react";
import TaxForm from "./components/TaxForm";
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
  const [advice, setAdvice] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Intelligent Tax Filing Assistant</h1>
        <p>
          Enter your income and expenses to receive an estimated tax
          calculation.
        </p>

        {/* Passing calculation handler as a prop */}
        <TaxForm
          onCalculate={handleCalculation}
          setAdvice={setAdvice}
          setLoadingAdvice={setLoadingAdvice}
        />

        {/* Conditional rendering:
            ResultCard only shows if result exists */}
        {result && (
          <ResultCard
            taxableIncome={result.taxableIncome}
            estimatedTax={result.estimatedTax}
          />
        )}
        {loadingAdvice && <p>Generating AI advice...</p>}

        {advice && (
          <div
            style={{
              marginTop: "20px",
              background: "#f0f4ff",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>AI Tax Advice</h3>
            <p style={{ whiteSpace: "pre-line" }}>{advice}</p>
          </div>
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
