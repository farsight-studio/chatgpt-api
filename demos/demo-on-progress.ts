import dotenv from 'dotenv-safe'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing the `onProgress` streaming support.
 *
 * ```
 * npx tsx demos/demo-on-progress.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt = 'draw an ascii art that says "forge". \n\n'

  console.log(prompt)
  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log(partialResponse.text)
    }
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
