"use strict"
// Without strict
function greet() {
    message = "hello"; // typo, forgot 'let'
    console.log(message); // works fine, but 'message' is now a GLOBAL variable 😱
}

greet();

//message = "hi!";

//   // With strict
//   function greet() {
//     message = "hello"; // ReferenceError: message is not defined
//   }