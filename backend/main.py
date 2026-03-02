from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

"""
FastAPI Backend for Intelligent Tax Filing Application

Responsibilities:
- Accept user tax data
- Perform basic tax calculation
- Return structured JSON response
"""

app = FastAPI()

# Enable CORS so React frontend can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # If it was production it should have the URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class TaxRequest(BaseModel):
    income: float
    expenses: float


@app.get("/")
def root():
    """
    Health check endpoint.
    Used to verify backend is running.
    """
    return {"message": "Tax Filing API is running"}


@app.post("/calculate")
def calculate_tax(data: TaxRequest):
    """
    Calculate taxable income and estimated tax.

    This endpoint:
    - Receives income and expenses
    - Calculates taxable income
    - Applies simple flat 20% tax logic
    """

    taxable_income = data.income - data.expenses
    estimated_tax = taxable_income * 0.2
    #print("Calculation done") #For testing only. Test that the connection works and the claculation is being done with FastAPI 

    return {
        "taxable_income": taxable_income,
        "estimated_tax": estimated_tax,
        "message": "Calculation successful"
    }