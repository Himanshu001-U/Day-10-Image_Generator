import { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'
import "./App.css"


const API_TOKEN = "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";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loader, setLoader] = useState(false);

  const generateImage = async (data) => {
    setLoader(true);
    console.log(data);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: data }),
      }
    );
    const result = await response.blob();
    console.log(result);
    // const imageUrl = result.data;
    const image = URL.createObjectURL(result);
    console.log(image);
    setImageUrl(image);
    setLoader(false);
  };

  return (
    <div className="maain">
      <div className="container">
        <h1>AI Image Generator</h1>
        <span>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder="Create image"
              type="text"
              name=""
              id=""
            />
            <button
              onClick={() => generateImage(inputValue)}
            >
              Generate
            </button>
        </span>
      </div>
      <div id="displayContainer" className="display">
        {loader ? (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : imageUrl != "" ? (
          <img
            src={imageUrl}
            alt="Generating Image from AI"
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;

// from chat gpt

// 
// const generateImage = async (data) => {
//   setLoader(true);
//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
//       {
//         headers: { Authorization: `Bearer ${API_TOKEN}` },
//         method: "POST",
//         body: JSON.stringify({ inputs: data }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to generate image");
//     }

//     const result = await response.json();
//     // Assuming the structure of the response is { imageUrl: "<image_url>" }
//     const imageUrl = result.imageUrl;
//     setImageUrl(imageUrl);
//   } catch (error) {
//     console.error("Error generating image:", error);
//   } finally {
//     setLoader(false);
//   }
// };