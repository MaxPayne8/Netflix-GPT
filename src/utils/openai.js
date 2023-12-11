import OpenAI from "openai";
import { API_GPT_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
