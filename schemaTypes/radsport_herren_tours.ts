import {defineField, defineType} from 'sanity'

export const radsport_herren_tours = defineType({
  name: 'radsport_herren_tours',
  title: 'Radsport Herren - Touren',
  type: 'document',
  fields: [
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
      description: 'Streckenbeschreibung, z. B. "Isny – Eggental – Urlau"',
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
      description: 'Datum der Tour, z. B. "01.01.2026"',
    }),
    defineField({
      name: 'departureTime',
      title: 'Abfahrt',
      type: 'string',
      description: 'Abfahrtszeit, z. B. "18:00 Uhr"',
      initialValue: '18:00 Uhr',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Tour findet statt', value: 'tour'},
          {title: 'Abgesagt', value: 'cancelled'},
          {title: 'Pause / kein Training', value: 'pause'},
        ],
        layout: 'radio',
      },
      initialValue: 'tour',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      date: 'date',
      route: 'route',
    },
    prepare({date, route}) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : ''
      return {
        title: `${route ?? 'Tour'}`,
        subtitle: formattedDate ?? '—',
      }
    },
  },
  orderings: [
    {
      title: 'Datum (aufsteigend)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Datum (absteigend)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
})
