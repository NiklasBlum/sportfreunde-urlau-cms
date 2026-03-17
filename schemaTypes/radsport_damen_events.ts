import {defineField, defineType} from 'sanity'

export const radsport_damen_events = defineType({
  name: 'radsport_damen_events',
  title: 'Radsport Damen - Events',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      rows: 4,
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
              title: 'Alt-Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'images.0',
    },
  },
})
