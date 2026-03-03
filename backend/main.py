from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

"""
FastAPI Backend for Intelligent Tax Filing Application

Responsibilities:
- Tax calculation
- AI-powered tax advice
"""

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
        "estimated_tax": estimated_tax
    }


@app.post("/advice")
def get_tax_advice(data: TaxRequest):
    """
    Uses OpenAI to generate intelligent tax advice.
    """

    prompt = f"""
    A user has:
    Income: {data.income}
    Expenses: {data.expenses}

    Provide short, practical tax advice in 3-4 bullet points.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional tax advisor."},
            {"role": "user", "content": prompt}
        ],
    )

    advice = response.choices[0].message.content

    return {
        "advice": advice
    }