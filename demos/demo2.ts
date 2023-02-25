import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPI } from '../src'
import { messageStore } from './keyv'

dotenv.config()

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt =
    'Write a python version of bubble sort. Do not include example usage.'

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
// intialize chatgpt
const chatgpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  debug: false,
  getMessageById: async (id) => {
    return messageStore.get(id)
  },
  upsertMessage: async (message) => {
    await messageStore.set(message.id, message)
  }
})

console.log()
