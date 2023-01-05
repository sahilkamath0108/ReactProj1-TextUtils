import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  
  const handleUC = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "success")
  };

  const handleCopy = () => {
    var text = document.getElementById("myBox")
    text.select()
    text.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(text.value)
    props.showAlert("Copied to clipboard", "success")
  }

  const handleLC = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase", "success")
  };

  const clearText = () => {
    setText("")
    props.showAlert("Cleared text", "success")
  }

  const handleCapitalize = () => {
    let newText = text.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
    setText(newText);
    props.showAlert("Capitalized the text", "success")
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Message has been spoken", "success")
  }

  const handleToggleCaseClick = () => {
    let words = text.split(" ");
    let newText = words
      .map((word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          let char = word.charAt(i);
          if (char >= "A" && char <= "Z") {
            char = char.toLowerCase();
          } else if (char >= "a" && char <= "z") {
            char = char.toUpperCase();
          }
          newWord += char;
        }

        return newWord;
      })
      .join(" ");

    setText(newText);
    props.showAlert("Toggled case", "success")
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  return (
    <>
      <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1>
          {props.heading}
        </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Type text here"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}}
            id="myBox"
            rows="7"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUC}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLC}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={clearText}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCapitalize}>
          Capitalize Text
        </button>
        <button className="btn btn-primary mx-2" onClick={speak}>
          Speak
        </button>
        <button className="btn btn-primary mx-2" onClick={handleToggleCaseClick}>
          Toggle Case
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopy}>
          Copy to Clipboard
        </button>
      </div>

      <div className="container my-2" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1>Your text summary</h1>
        <p>
          {text.split(" ").length - 1} words ,{text.length} characters{" "}
        </p>
        <p>
          {0.008*text.split(" ").length} minutes will be taken to read the words.
        </p>
      </div>
    </>
  );
}
