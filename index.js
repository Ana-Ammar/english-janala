function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="bg-[#EDF7FF] text-lg px-4 py-2 border-1 border-[#D7E4EF] rounded-md">${el}</span>`
  );
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayLevelWord(json.data);
    });
};

const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWordDetail(json.data));
};

const displayWordDetail = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <div class="bg-white p-4 rounded-xl">
            <div class="border border-[#EDF7FF] p-4 rounded-xl space-y-3">
              <h2 class="font-semibold text-2xl">
                ${word.word ? word.word : "শব্দ পাওয়া যায়নি"}
                <span
                  >(<i class="fa-solid fa-microphone-lines"></i> :${
                    word.pronunciation
                      ? word.pronunciation
                      : "pronunciation পাওয়া যায়নি"
                  })</span
                >
              </h2>
              <div class="my-4 space-y-2">
                <p class="font-semibold text-xl">Meaning</p>
                <p class="font-medium text-xl bangla">${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                }</p>
              </div>
              <div class="my-4 space-y-2">
                <p class="font-semibold text-xl">Example</p>
                <p class="text-xl">${
                  word.sentence ? word.sentence : "কোনো  সেন্টেন্স পাওয়া যায়নি"
                }</p>
              </div>
              <p class="font-medium text-xl bangla">সমার্থক শব্দ গুলো</p>
              <div class="space-x-2">
                ${
                  createElement(word.synonyms)
                    ? createElement(word.synonyms)
                    : "কোনো সমার্থক শব্দ পাওয়া যায়নি"
                }
              </div>
            </div>
            <button class="btn btn-primary rounded-xl mt-6">
              Complete Learning
            </button>
          </div>
  
  `;
  document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="col-span-full text-center space-y-5 my-5">
        <img class = "mx-auto" src = "./assets/alert-error.png"/>
        <p class="text-[#79716B] bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="bangla font-medium text-4xl text-[#292524]">নেক্সট Lesson এ যান</p>
      </div>

  `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-3xl text-center p-8 space-y-5">
        <h1 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h1>
        <p class="font-medium">Meaning / Pronounciation</p>
        <h1 class="bangla font-medium text-2xl text-[#18181b]">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</h1>
        <div class="flex justify-between">
          <button onclick = "loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF17] rounded-lg hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF17] rounded-lg hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> 
                Lesson - ${lesson.level_no}
            </button>
        `;
    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWords)
    });
});
