import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

const $note = document.querySelector("textarea");

const save = () => {
  const text = $note.value;
  // localStorage.note = text;
  const compressed = compressToEncodedURIComponent(text);
  history.replaceState(undefined, undefined, `#${compressed}`);
};
const load = () => {
  const text = decompressFromEncodedURIComponent(location.hash.substring(1));
  console.log(text)
  $note.value = text;
};

// Load previously saved note
window.onload = () => {
  load();
};
// Save note on edit
// $note.onkeyup = () => {
//   save();
//   links();
// };

// Control S to save
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    save();
    e.preventDefault();
  }
});
