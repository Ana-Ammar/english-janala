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

const loadWordDetail = () => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => console.log(json));
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
          <button class="btn bg-[#1A91FF17] rounded-lg hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
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
