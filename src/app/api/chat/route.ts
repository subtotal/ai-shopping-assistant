import {SubtotalAIToolkit, Tools} from '@subtotal-inc/ai-toolkit/ai-sdk';
import {openai} from '@ai-sdk/openai';
import {streamText} from 'ai';

const subtotalAIToolkit = new SubtotalAIToolkit({
  secretKey: process.env.SUBTOTAL_API_KEY!,
  configuration: {
    tools: [
      Tools.createConnection,
      Tools.createMerchantLinkUrl,
      Tools.getPurchases,
      Tools.getPurchaseDetails,
      Tools.getMerchants,
    ]
  },
});

const model = openai('gpt-4o');

const prompt = {
  role: 'system',
  content: 'Greet the user by responding to their message. ' +
  'Then create a new connection and generate a url for the user to link their Target account.' +
  'Indicate that user should click the url and link their account to get started. ' +
  'Wait for a response from the user indicating they have linked their account. '
}

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: model,
    tools: {...subtotalAIToolkit.getTools()},
    maxSteps: 4,
    messages: [
      prompt,
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}