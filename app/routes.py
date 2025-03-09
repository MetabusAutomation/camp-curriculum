from fastapi import APIRouter, Request, Response
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from typing import List, Dict

from app.models import Item, ItemList

router: APIRouter = APIRouter()
templates: Jinja2Templates = Jinja2Templates(directory="app/templates")

# Sample data
items: List[Item] = [
    Item(id=1, name="Item 1", description="This is item 1"),
    Item(id=2, name="Item 2", description="This is item 2"),
    Item(id=3, name="Item 3", description="This is item 3"),
]

@router.get("/", response_class=HTMLResponse)
async def index(request: Request) -> Response:
    """Render the index page with items"""
    return templates.TemplateResponse(
        "index.html", 
        {"request": request, "items": items}
    )

@router.get("/find", response_class=HTMLResponse)
async def find(request: Request) -> Response:
    """Render the find page
    
    TODO: Add Firebase authentication before allowing access
    """
    return templates.TemplateResponse(
        "find.html",
        {"request": request}
    )

@router.get("/activities", response_class=HTMLResponse)
async def activities(request: Request) -> Response:
    """Render the activities page
    
    TODO: Add Firebase authentication before allowing access
    """
    return templates.TemplateResponse(
        "activities.html",
        {"request": request}
    )


@router.get("/generate", response_class=HTMLResponse)
async def generate(request: Request) -> Response:
    """Render the generate page
    
    TODO: Add Firebase authentication before allowing access
    """
    return templates.TemplateResponse(
        "generate.html",
        {"request": request}
    )

@router.get("/collate", response_class=HTMLResponse)
async def collate(request: Request) -> Response:
    """Render the collate page
    
    TODO: Add Firebase authentication before allowing access
    """
    return templates.TemplateResponse(
        "collate.html",
        {"request": request}
    )

@router.get("/api/items", response_model=ItemList)
async def get_items() -> Dict[str, List[Item]]:
    """Get all items via API"""
    return {"items": items} 