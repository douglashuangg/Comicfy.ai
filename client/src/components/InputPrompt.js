import React, { useState } from "react";
import "../style.css";
import axios from "axios";

export default function InputPrompt() {
  const [prompt, setPrompt] = useState();
  //   let saveData = async (e) => {
  //     e.preventDefault();
  //     let url = "http://127.0.0.1:8000/";
  //     let method = "POST";
  //     await fetch(url, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ body: prompt.body }),
  //     });
  //   };

  const saveData = async () => {
    axios
      .post("http://127.0.0.1:8000/sheesh", { paragraph: prompt })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    // await axios({
    //   method: "post",
    //   url: "http://127.0.0.1:8000/sheesh",
    //   params: {
    //      "hi"
    //   },
    // });
    // axios.post("http://127.0.0.1:8000/sheesh", userData).then((res) => {
    //   responseData = res.data;
    //   if (responseData.status == "success") {
    //     const user = responseData.user;
    //   } else {
    //     alert("Something went wrong while creating account");
    //   }
    // });
  };

  return (
    <>
      <div className="center">
        <h1>COMICFY.AI</h1>
      </div>
      <div className="center">
        <textarea
          placeholder="Enter your story here:"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          rows="30"
          cols="100"
        ></textarea>
      </div>
      <button onClick={saveData}>Generate!</button>
    </>
  );
}
