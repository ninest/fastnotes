const $note = document.querySelector("article");

const save = () => {
  const text = $note.innerText;
  localStorage.note = text;
  console.log("save");
};
const load = () => {
  if (localStorage.note !== undefined) $note.innerText = localStorage.note;
};

// Load previously saved note
window.onload = load;
// Save note on edit
$note.onkeyup = save;

// control s
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    save();
    console.log("saved");
    e.preventDefault();
  }
});
