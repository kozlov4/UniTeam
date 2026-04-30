from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import ProjectCardResponse, SortByChoice
from core.models.db_helper import db_helper
from . import service

router = APIRouter(tags=["Projects"])


@router.get("/projects/", response_model=list[ProjectCardResponse])
async def get_projects(
    session: AsyncSession = Depends(db_helper.session_dependency),
    sort_by: SortByChoice = Query(default=SortByChoice.newest, description="Sort type"),
    category_id: Optional[int] = None,
    roles: Optional[List[str]] = Query(None),
    tech_ids: Optional[List[int]] = Query(None),
    min_members: Optional[int] = None,
    max_members: Optional[int] = None,
):
    return await service.get_projects(
        session=session,
        sort_by=sort_by,
        category_id=category_id,
        roles=roles,
        tech_ids=tech_ids,
        min_members=min_members,
        max_members=max_members,
    )
