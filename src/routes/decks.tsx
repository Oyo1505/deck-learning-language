import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/decks')({
  head: () => ({
    meta: [
      {
        title: 'Decks Page - Decks Learning Language',
        name: 'List of Decks',
        content:
          'Explore our extensive collection of language learning decks designed to enhance your vocabulary and grammar skills. Each deck is curated to provide engaging and effective learning experiences.',
      },
    ],
  }),
  component: Decks,
})

function Decks() {
  return (
    <div>Decks Page
      
    </div>
  )
}

export default Decks