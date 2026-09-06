import type { DragEvent } from 'react'

export const TODO_DND_TYPE = 'text/plain'

/** 드래그한 할 일 아이디를 데이터에 담는다. */
export function setDraggedTodoId(event: DragEvent, id: string) {
  event.dataTransfer.setData(TODO_DND_TYPE, id)
  event.dataTransfer.effectAllowed = 'move'
}

export function getDraggedTodoId(event: DragEvent) {
  return event.dataTransfer.getData(TODO_DND_TYPE)
}

export function allowTodoDrop(event: DragEvent) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

export function dropPlaceFromPoint(
  event: DragEvent,
  axis: 'y' | 'x' = 'y',
): 'before' | 'after' {
  const rect = event.currentTarget.getBoundingClientRect()
  if (axis === 'x') {
    return event.clientX < rect.left + rect.width / 2 ? 'before' : 'after'
  }
  return event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}
