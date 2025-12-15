import i18n from '@/i18n'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/decks')({
  head: () => ({
    meta: [
      {
        title: i18n.t('decks:metadata.title'),
        name: i18n.t('decks:metadata.name'),
        content: i18n.t('decks:metadata.content'),
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('decks')
  
  return (
    <div>
      {t('title')}
    </div>
  )
}

export default RouteComponent