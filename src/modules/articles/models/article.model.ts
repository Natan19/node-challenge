import { Model } from 'objection'

export default class ArticleModel extends Model {
  id!: number
  author!: number
  category!: string
  title!: string
  summary!: string
  firstParagraph!: string
  body!: string

  static tableName = 'Article'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['author', 'category', 'title', 'summary', 'firstParagraph', 'body'],
      properties: {
        id: { type: 'number' },
        author: { type: 'number' },
        category: { type: 'string' },
        title: { type: 'string' },
        summary: { type: 'string' },
        firstParagraph: { type: 'string' },
        body: { type: 'string' }
      }
    }
  }
}
