import {defineField, defineType} from 'sanity'

export const news_reports = defineType({
  name: 'news_reports',
  title: 'News & Berichte',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name der News/Berichts',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'info',
      title: 'Info',
      description: 'Ort, Uhrzeit (von-bis) etc.',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'richText',
      title: 'Beschreibung (Rich Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [{name: 'href', title: 'URL', type: 'string'}],
              },
            ],
          },
        },
      ],
      description:
        'Ausführliche Beschreibung im Rich-Text-Format, wird auf der Detailseite angezeigt',
    }),
    defineField({
      name: 'tag',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'News'},
          {title: 'Bericht', value: 'Bericht'},
        ],
        layout: 'radio',
      },
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
