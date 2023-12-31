import { Configuration, OpenAIApi } from "openai";



export interface IChatGPTPayload {
  prompt: string;
}


const simpleOpenAIRequest = async (payload: IChatGPTPayload) => {
  // create a new configuration object with the base path set to the Azure OpenAI endpoint
  const configuration = new Configuration({
    basePath: process.env.AZURE_OPEN_AI_BASE, //https://YOUR_AZURE_OPENAI_NAME.openai.azure.com/openai/deployments/YOUR_AZURE_OPENAI_DEPLOYMENT_NAME
  });

  const openai = new OpenAIApi(configuration);

  const apiKey = process.env.AZURE_OPEN_AI_KEY;

if (typeof apiKey !== 'string') {
  throw new Error('AZURE_OPEN_AI_KEY is not defined or is not a string');
}


  const completion = await openai.createChatCompletion(
    {
      model: "gpt-35-turbo", // gpt-35-turbo is the model name which is set as part of the deployment on Azure Open AI
      temperature: 1, // set the temperature to 1 to avoid the AI from repeating itself
      messages: [
        {
          role: "system",
          content: "você é um avaliador de faculdade lendo opiniões dos alunos sobre os cursos que frequentaram durante o último período e lendo você irá identificar os principais tópicos do texto enviado pelo aluno" // set the personality of the AI
        },
        {
          role: "user",
          content: payload.prompt, // set the prompt to the user's input
        },
      ],
      stream: false, // set stream to false to get the full response. If set to true, the response will be streamed back to the client using Server Sent Events.
      // This demo does not use Server Sent Events, so we set stream to false.
    },
    {
      headers: {
        "api-key": apiKey, // set the api-key header to the Azure Open AI key
      },
      params: {
        "api-version": "2023-03-15-preview", // set the api-version to the latest version
      },
    }
  );

  return completion.data.choices[0].message?.content; // return the response from the AI, make sure to handle error cases
};

/**
 * Main entry point for the API.
 **/

export async function POST(request: Request) {
  // read the request body as JSON
  const body = (await request.json()) as IChatGPTPayload;

  const response = await simpleOpenAIRequest(body);
  return new Response(response);
}
