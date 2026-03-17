import {defineField, defineType} from 'sanity'

export const radsport_damen_tours = defineType({
  name: 'radsport_damen_tours',
  title: 'Radsport Damen - Touren',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
      description: 'Streckenbeschreibung, z. B. "Isny – Eggental – Urlau"',
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
    defineField({
      name: 'season',
      title: 'Saison (Jahr)',
      type: 'number',
      description: 'Bitte das aktuelle Jahr eingeben, z. B. 2026',
      initialValue: () => new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
  ],
  preview: {
    select: {
      date: 'date',
      route: 'route',
      status: 'status',
    },
    prepare({date, route, status}) {
      const statusIcon = status === 'tour' ? '✅' : status === 'cancelled' ? '❌' : '⏸️'
      return {
        title: `${statusIcon} ${date ?? ''}`,
        subtitle: route ?? '—',
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
