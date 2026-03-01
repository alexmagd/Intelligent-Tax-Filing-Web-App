/*
  ResultCard Component

  Responsibilities:
  - Pure presentational component
  - Receives calculated values via props
  - Displays formatted results
*/

function ResultCard({ taxableIncome, estimatedTax }) {
  return (
    <div style={styles.result}>
      <h3>Results</h3>
      <p>Taxable Income: ${taxableIncome}</p>
      <p>Estimated Tax (20%): ${estimatedTax}</p>
    </div>
  );
}

// Simple styling for results container
const styles = {
  result: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#eef2f7",
    borderRadius: "8px",
  },
};

export default ResultCard;
