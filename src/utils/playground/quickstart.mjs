import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SerpAPI } from 'langchain/tools'
import { Calculator } from 'langchain/tools/calculator'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import { PlanAndExecuteAgentExecutor } from 'langchain/experimental/plan_and_execute'

// in your terminal, run the commands below:
// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// 1. Prompt template:

// const template =
//   'You are a director of social media with 30 years of experience. Please give me some idea for content I should write about regarding {topic}. The content is for {socialplatform}. Translate to {language}.'

// const prompt = new PromptTemplate({
//   template,
//   inputVariables: ['topic', 'socialplatform', 'language'],
// })

// const formattedPromptTemplate = await prompt.format({
//   topic: 'content writing with artificial intelligence',
//   socialplatform: 'twitter',
//   language: 'french',
// })

// console.log('formattedPromptTemplate: ', formattedPromptTemplate)

// LLM Chain - does 2 things in our case:
// 1. Creates a prompt template
// 2. Makes a call to OPEN AI
// in general, on more complex scale, it makes chaining LLM tasks together

// const model = new OpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
//   temperature: 0.9, // 0=not creative, 1=very creative
// })

// const chain = new LLMChain({
//   prompt,
//   llm: model,
// })

// const resChain = await chain.call({
//   topic: 'content writing with artificial intelligence',
//   socialplatform: 'twitter',
//   language: 'english',
// })

// console.log('resChain: ', resChain)

// Agent.
// Difference Chain Vs Agent: Chain is more pre-defined.
// While Agent = task+tools+template => it will figure out what to do

// const agentModel = new OpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
//   temperature: 0,
//   modelName: 'gpt-3.5-turbo',
// })

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: 'London, United Kingdom',
    hl: 'en',
    gl: 'uk',
  }),
  new Calculator(),
]

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//   agentType: 'zero-shot-react-description',
//   verbose: true,
//   maxIterations: 5,
// })

// const input = 'What is the langchain?'

// const result = await executor.call({
//   input,
// })

// console.log('result: ', result)

/**
 * Plan and Action agent,
 * it makes the Agent to plan which tools to use in which case: eg. search tool for one question and calculator tool for anotehr question.
 */

// const chatModel = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
//   temperature: 0,
//   modelName: 'gpt-3.5-turbo',
//   verbose: true,
// })

// const executor = await PlanAndExecuteAgentExecutor.fromLLMAndTools({
//   llm: chatModel,
//   tools,
// })

// const result = await executor.call({
//   input:
//     'Who is the current president of France ? What is his current age raised to the power of two?',
// })

// console.log('\n=================\nresult: ', result, '\n=================\n')

// in MEMORY tool
// allows to make calls to the model and remember data between the calls

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})
const memory = new BufferMemory()

// this chain is useful for making subsequent calls
const conversationChain = new ConversationChain({
  llm: model,
  memory,
})

const input_1 = 'Hey, my name is Johnny Pony.'
const res_1 = await conversationChain.call({
  input: input_1,
})

console.log(
  '\n=================\n res_1: ',
  { input_1, res_1 },
  '\n=================\n',
)

const input_2 = 'Hi, what is my name? '
const res_2 = await conversationChain.call({
  input: input_2,
})

console.log(
  '\n=================\n res_1: ',
  { input_2, res_2 },
  '\n=================\n',
)

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
