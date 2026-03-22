import {defineField, defineType} from 'sanity'

export const sportmaedels_events = defineType({
  name: 'sportmaedels_events',
  title: 'Sportmädels - Events',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
      description: 'Datum des Events, z. B. "01.02.2026"',
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Bildbeschreibung (optional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL-Verlinkung',
      type: 'slug',
      options: {
        source: 'headline',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'URL-Name für Verlinkungen, wird aus der Überschrift erzeugt.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      date: 'date',
      media: 'images.0',
    },
    prepare({headline, date, media}) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'Ohne Datum'

      return {
        title: `${headline ?? 'Ohne Überschrift'}`,
        subtitle: formattedDate,
        media,
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
