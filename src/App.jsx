import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import jrealme from './assets/jrealme.png';

//open ai config
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  console.log(prompt);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const completions = await apiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Make a shoutout about: ${prompt} and add emojis to bring more fun and add multilanguage hashtags as well`,
        max_tokens: 880,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(completions);
      setResponse(completions.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:p-0 bg-black">
      <img src={jrealme} alt="JRealMe Logo" className="h-20 mb-16 mt-40" style={{width: '400px', height: '200px'}}/>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b-2 border-cyan-900 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter a topic you want to shoutout about.💬"
            value={prompt}
            onChange={handlePromptChange}
          />
          <button
            className="flex-shrink-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-sm border-3 text-white py-1 px-2 rounded"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
      {response && (
        <div className="w-full max-w-lg mt-4">
          <div className="bg-cyan-200 border-4 border-cyan-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-900 text-base">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
