import OpenAI from 'openai';

const openai = new OpenAI();

export default class OpenAiService {
  static async openaiCall(prompt: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      });

      if (completion.choices && completion.choices.length > 0) {
        return completion.choices[0].message.content;
      } else {
        throw new Error('No choices returned from OpenAI');
      }
    } catch (e) {
      console.error('An error occured:', e);
      throw e;
    }
  }
}
