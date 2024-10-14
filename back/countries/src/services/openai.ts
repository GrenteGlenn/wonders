import OpenAI from 'openai';

const openai = new OpenAI();

// const prompt = `Je souhaite visiter ${country}. Peux-tu me donner des informations intéressantes sur ce pays,
//              telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
//              Peux-tu également donner le lien officiel de l'office de tourisme du pays.
//               Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
//             guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

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
