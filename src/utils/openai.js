import OpenAI from "openai";
import { API_GPT_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: API_GPT_KEY,
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
