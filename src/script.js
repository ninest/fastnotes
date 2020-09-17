const $note = document.querySelector("article");

const save = () => {
  const text = $note.innerText;
  localStorage.note = text;
};
const load = () => {
  $note.innerText = localStorage.note || "";
};

// Load previously saved note
window.onload = load;
// Save note on edit
$note.onkeypress = save;
