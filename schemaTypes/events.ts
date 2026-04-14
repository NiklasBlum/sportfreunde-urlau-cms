import {defineField, defineType} from 'sanity'

export const events = defineType({
  name: 'events',
  title: 'Veranstaltungen & Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'info',
      title: 'Info',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 10,
      description: 'Ausführliche Beschreibung, wird auf der Detailseite angezeigt',
    }),
    defineField({
      name: 'tag',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Turnier', value: 'Turnier'},
          {title: 'Verein', value: 'Verein'},
          {title: 'Veranstaltung', value: 'Veranstaltung'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'slug',
      title: 'URL-Verlinkung',
      type: 'slug',
      options: {
        source: (doc) => `${doc.title ?? ''}-${doc.date ?? ''}`,
        maxLength: 96,
      },
      description: 'URL-Name für Verlinkungen, wird aus der Überschrift erzeugt.',
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
      description: 'Datum des Events',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({title, date}) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'Ohne Datum'

      return {
        title: title ?? 'Ohne Titel',
        subtitle: formattedDate,
      }
    },
  },
  orderings: [
    {
      title: 'Datum (neu nach alt)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Datum (alt nach neu)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
