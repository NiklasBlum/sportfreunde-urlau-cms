import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {postType} from './schemaTypes/postType'

export default defineConfig({
  name: 'default',
  title: 'Sportfreunde Urlau',

  projectId: 'n07z17nt',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [postType],
  },
})
