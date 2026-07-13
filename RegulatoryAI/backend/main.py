from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn
from datetime import datetime
import json

app = FastAPI(
    title="Deutsche Bank AI Governance API",
    description="AI Governance Companion API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== Models ====================
class RiskMetric(BaseModel):
    category: str
    percentage: int
    color: str

class RegulationSummary(BaseModel):
    name: str
    severity: str
    date: str
    impact: str
    departments: int
    cost: str

class DepartmentMetrics(BaseModel):
    name: str
    compliance: int
    risk_score: str
    emissions: float
    cost: str
    recommendation: str

class ChatMessage(BaseModel):
    message: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    metadata: Dict
    confidence: float

# ==================== Database Mock ====================
db_regulations = [
    {
        "name": "EU AI Act",
        "severity": "high",
        "date": "Q3 2024",
        "impact": "Comprehensive AI governance framework",
        "departments": 3,
        "cost": "€2.1M"
    },
    {
        "name": "DORA",
        "severity": "medium",
        "date": "Q4 2024",
        "impact": "Digital Operational Resilience Act",
        "departments": 2,
        "cost": "€1.2M"
    },
    {
        "name": "GDPR",
        "severity": "compliant",
        "date": "Active",
        "impact": "Data protection compliance maintained",
        "departments": 4,
        "cost": "€0.5M"
    },
]

db_departments = [
    {
        "name": "Loans",
        "compliance": 89,
        "risk": "Medium",
        "emissions": 12.5,
        "cost": "€0.8M",
        "recommendation": "Enhance AI model monitoring"
    },
    {
        "name": "Core Banking",
        "compliance": 94,
        "risk": "Low",
        "emissions": 8.2,
        "cost": "€0.4M",
        "recommendation": "Maintain current controls"
    },
    {
        "name": "Deposits",
        "compliance": 85,
        "risk": "High",
        "emissions": 10.3,
        "cost": "€1.1M",
        "recommendation": "Implement governance framework"
    },
]

# ==================== Endpoints ====================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "status": "ok",
        "message": "Deutsche Bank AI Governance API",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "api_response_time": "124ms",
        "data_sync": "real-time",
        "model_accuracy": "94.2%",
        "uptime": "99.98%"
    }

# ==================== Governance Endpoints ====================

@app.get("/api/governance/score")
async def get_governance_score():
    """Get overall AI governance score"""
    return {
        "score": 97,
        "status": "Excellent",
        "trend": "↑ +2% from last month",
        "components": {
            "compliance": 95,
            "risk_management": 98,
            "sustainability": 96
        }
    }

@app.get("/api/governance/risk-metrics")
async def get_risk_metrics():
    """Get enterprise risk metrics"""
    return {
        "overall_risk": 44,
        "risk_level": "Medium",
        "categories": [
            {"category": "Compliance Risk", "percentage": 28, "color": "error"},
            {"category": "Operational Risk", "percentage": 45, "color": "warning"},
            {"category": "Cyber Risk", "percentage": 35, "color": "error"},
            {"category": "FSG Risk", "percentage": 52, "color": "warning"},
            {"category": "Model Risk", "percentage": 38, "color": "warning"},
            {"category": "AI Explanation Risk", "percentage": 22, "color": "success"},
        ]
    }

@app.get("/api/regulations")
async def get_regulations():
    """Get all regulations"""
    return {"regulations": db_regulations}

@app.get("/api/regulations/{regulation_id}")
async def get_regulation(regulation_id: str):
    """Get specific regulation details"""
    for reg in db_regulations:
        if reg["name"].lower() == regulation_id.lower():
            return {"regulation": reg, "affected_departments": 3}
    raise HTTPException(status_code=404, detail="Regulation not found")

@app.get("/api/departments")
async def get_departments():
    """Get all departments with metrics"""
    return {"departments": db_departments}

@app.get("/api/departments/{dept_id}")
async def get_department(dept_id: str):
    """Get specific department details"""
    for dept in db_departments:
        if dept["name"].lower() == dept_id.lower():
            return {"department": dept}
    raise HTTPException(status_code=404, detail="Department not found")

@app.get("/api/carbon/metrics")
async def get_carbon_metrics():
    """Get carbon and sustainability metrics"""
    return {
        "current_co2": 31,
        "unit": "Tons",
        "ai_optimized_co2": 18.6,
        "carbon_saved": 12.4,
        "reduction_percentage": 40,
        "tree_equivalent": 2054,
        "monthly_trend": [
            {"month": "Jan", "co2": 38},
            {"month": "Feb", "co2": 36},
            {"month": "Mar", "co2": 34},
            {"month": "Apr", "co2": 32},
            {"month": "May", "co2": 30},
            {"month": "Jun", "co2": 31},
        ]
    }

@app.get("/api/cost-roi")
async def get_cost_roi():
    """Get cost and ROI analysis"""
    return {
        "current_annual_cost": "€3.34 M",
        "ai_optimized_cost": "€1.70 M",
        "annual_savings": "€1.66 M",
        "savings_percentage": 49.7,
        "payback_period_months": 8,
        "breakdown": {
            "infrastructure_savings": "€480K",
            "compliance_savings": "€700K",
            "carbon_savings": "€220K",
        },
        "roi_timeline": [
            {"quarter": "Q1 2024", "roi": 0},
            {"quarter": "Q2 2024", "roi": 15},
            {"quarter": "Q3 2024", "roi": 35},
            {"quarter": "Q4 2024", "roi": 55},
            {"quarter": "Q1 2025", "roi": 80},
            {"quarter": "Q2 2025", "roi": 120},
        ]
    }

@app.post("/api/chat")
async def chat(message: ChatMessage):
    """AI Governance Assistant chatbot"""
    msg_lower = message.message.lower()
    
    # EU AI Act query
    if "eu ai act" in msg_lower or "highest impact" in msg_lower:
        return ChatResponse(
            response="The EU AI Act has the highest impact on your organization. It affects 3 departments with estimated implementation cost of €2.1M.",
            metadata={
                "regulation": "EU AI Act",
                "departments": ["Risk Management", "Compliance", "AI Ethics"],
                "cost": "€2.1M",
                "actions": ["High Priority", "Q3 2024 Deadline", "Review Risk Assessment"]
            },
            confidence=0.94
        )
    
    # Compliance query
    elif "compliance" in msg_lower:
        return ChatResponse(
            response="Current compliance score is 82% across all active regulations. The Deposits department requires immediate attention (85% compliance).",
            metadata={
                "overall_score": 82,
                "departments": {
                    "Core Banking": 94,
                    "Loans": 89,
                    "Deposits": 85
                }
            },
            confidence=0.91
        )
    
    # Carbon query
    elif "carbon" in msg_lower or "sustainability" in msg_lower or "emission" in msg_lower:
        return ChatResponse(
            response="We can reduce CO₂ emissions by 40% through AI optimization. Key recommendations: optimize data center operations (€4.2T CO₂/year), implement cloud auto-scaling (€3.8T CO₂/year).",
            metadata={
                "current_emissions": "31 Tons CO₂",
                "potential_reduction": "40%",
                "recommendations": ["Data Center Optimization", "Cloud Auto-scaling", "Vendor Sustainability"],
            },
            confidence=0.89
        )
    
    # Cost/ROI query
    elif "cost" in msg_lower or "roi" in msg_lower or "savings" in msg_lower:
        return ChatResponse(
            response="AI governance implementation will save €1.66M annually (49.7% reduction). Payback period: 8 months. Breakdown: Infrastructure €480K, Compliance €700K, Carbon €220K.",
            metadata={
                "annual_savings": "€1.66 M",
                "payback_period": "8 months",
                "breakdown": {
                    "infrastructure": "€480K",
                    "compliance": "€700K",
                    "carbon": "€220K"
                }
            },
            confidence=0.92
        )
    
    # Default response
    else:
        return ChatResponse(
            response="I can help you with questions about regulations, compliance, carbon emissions, costs, and AI governance. What would you like to know?",
            metadata={"suggestions": ["EU AI Act", "Compliance Status", "Carbon Reduction", "Cost Savings"]},
            confidence=0.85
        )

@app.get("/api/alerts")
async def get_alerts():
    """Get high priority alerts"""
    return {
        "total_alerts": 4,
        "high_priority": [
            {
                "title": "Deposits Department - Compliance Gap",
                "severity": "high",
                "description": "Compliance score 85% - below threshold",
                "action": "Review and implement governance framework",
                "deadline": "2024-Q3"
            },
            {
                "title": "EU AI Act - Implementation Required",
                "severity": "high",
                "description": "Regulation takes effect Q3 2024",
                "action": "Begin implementation planning",
                "deadline": "2024-Q3"
            },
            {
                "title": "Operational Risk - Medium Level",
                "severity": "medium",
                "description": "Risk level at 45%",
                "action": "Monitor and optimize",
                "deadline": "2024-Q4"
            },
            {
                "title": "Model Risk - Monitoring Active",
                "severity": "medium",
                "description": "AI model performance tracking",
                "action": "Continue monthly reviews",
                "deadline": "Ongoing"
            }
        ]
    }

@app.get("/api/recommendations")
async def get_recommendations():
    """Get AI-driven recommendations"""
    return {
        "recommendations": [
            {
                "title": "Optimize Data Center Operations",
                "impact": "4.2 Tons CO₂/year",
                "status": "High Impact",
                "priority": 1
            },
            {
                "title": "Implement Cloud Auto-Scaling",
                "impact": "3.8 Tons CO₂/year",
                "status": "Medium Impact",
                "priority": 2
            },
            {
                "title": "Enhance AI Model Monitoring",
                "impact": "Reduce Risk by 15%",
                "status": "Risk Reduction",
                "priority": 1
            },
            {
                "title": "Adopt Sustainable Vendors",
                "impact": "2.3 Tons CO₂/year",
                "status": "Strategic",
                "priority": 3
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
