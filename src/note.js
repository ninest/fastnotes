import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { AES, enc } from "crypto-js";

import { formatCreatedAt, setTitle } from "./utils";
import { $createdAt, $title, $note, $passwordButton } from "./ui";

let createdAt;

// Default password
let password = "password";
let hint = "";

const $suggestions = document.querySelector("#suggestions");

let prevNoteState;
export const save = () => {
  const title = $title.innerText;
  const content = $note.innerText;

  // Only save note if title is not empty
  if (title) {
    // Set createdAt if not set
    if (!createdAt) {
      createdAt = new Date();
      $createdAt.innerText = formatCreatedAt(createdAt);
    }

    // Create note object
    const note = {
      createdAt: createdAt.toISOString(),
      title,
      content: AES.encrypt(JSON.stringify(content), password.trim()).toString(),
      hint,
    };

    const compressed = compress(JSON.stringify(note));

    // Create note state to check if anything has changed
    const noteState = { createdAt, title, content, hint, password };
    if (JSON.stringify(noteState) === JSON.stringify(prevNoteState)) return;

    history.replaceState(undefined, undefined, `#${compressed}`);
    setTitle(title);

    prevNoteState = noteState;
  }
};

export const load = () => {
  if (!location.hash) return;

  const note = JSON.parse(decompress(location.hash.substring(1)));

  $title.innerText = note.title;
  createdAt = new Date(note.createdAt);
  $createdAt.innerText = formatCreatedAt(createdAt);
  hint = note.hint || "No hint has been provided";

  const contentBytes = AES.decrypt(note.content, password);
  let content;
  try {
    content = JSON.parse(contentBytes.toString(enc.Utf8));
  } catch (e) {
    // Passworrd required
    password = prompt(`${hint}\n\nEnter the password:`);
    return load();
  }

  $note.innerText = content;
};


$passwordButton.addEventListener("click", function () {
  password = prompt("Enter a password:", password);
  hint = prompt("Enter a hint (leave blank for no hint):", hint);
});
