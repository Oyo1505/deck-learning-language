import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/decks/$decksId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/decks/$decksId"!</div>
}
