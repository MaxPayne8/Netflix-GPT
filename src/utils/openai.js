import OpenAI from "openai";
const openai_key = process.env.REACT_APP_GPT_API_KEY;
const openai = new OpenAI({
  apiKey: openai_key,
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
