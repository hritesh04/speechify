let synth = window.speechSynthesis;
let isPlaying = false;
let i = 0;

const getVoices = () => {
  if (window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    return voices;
  } else {
    return [];
  }
};

(async function () {
  speechSynthesis.onvoiceschanged = getVoices;
  const pause = document.getElementById("pause");
  const resume = document.getElementById("resume");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const content = document.getElementById("content");
  const scrapBtn = document.getElementById("scrap");

  const voices = speechSynthesis.getVoices();

  content.addEventListener("change", () => {
    i = 0;
    isPlaying = false;
    synth = window.speechSynthesis;
  });

  resume.addEventListener("click", async () => {
    const voice = document.getElementById("selection").value;
    let choosenVoice = getChosenVoice(voices, voice);
    if (!isPlaying) {
      isPlaying = true;
      resume.classList.add("hidden");
      pause.classList.remove("hidden");
      i = 0;
      await speak(content.childNodes, choosenVoice, speedInput.value);
      resume.classList.remove("hidden");
      pause.classList.add("hidden");
      isPlaying = false;
    } else {
      resume.classList.add("hidden");
      pause.classList.remove("hidden");
      synth.resume();
      isPlaying = true;
    }
  });

  pause.addEventListener("click", () => {
    if (isPlaying) {
      synth.pause();
      pause.classList.add("hidden");
      resume.classList.remove("hidden");
    }
  });
  next.addEventListener("click", () => {
    if (i < content.childNodes.length - 1) {
      ++i;
    } else {
      synth.pause();
      resume.classList.remove("hidden");
      pause.classList.add("hidden");
    }
  });
  prev.addEventListener("click", () => {
    if (i > 0) {
      i--;
    }
  });

  scrapBtn.addEventListener("click", async () => {
    let url = document.getElementById("url").value;
    let body = JSON.stringify({ url: url });
    const response = await fetch(`/scrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const responseData = await response.json();

    populateContent(responseData);
  });

  const speedInput = document.getElementById("pbrate");
  speedInput.addEventListener("change", (e) => {
    displaySpeed();
  });

  for (let voice of voices) {
    console.log(voice);
    let option = document.createElement("option");
    option.textContent = `${voice.name}`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    document.getElementById("selection").appendChild(option);
  }
})();

function getChosenVoice(voices, voice) {
  const filteredVoices = voices.filter((v) => v.name === voice);
  return filteredVoices.find((voice) => voice);
}

function displaySpeed() {
  const speed = document.getElementById("pbrate").value;
  console.log(speed);
  document.getElementById("speed").innerText = speed;
}

async function speak(textNodes, voice, speed) {
  for (i; i < textNodes.length; i++) {
    let content = textNodes[i];
    if (!content.classList.contains("highlight")) {
      content.classList.add("highlight");
    }
    let utterance = new SpeechSynthesisUtterance(content.textContent);
    utterance.rate = speed;
    utterance.lang = "en-US";
    utterance.voice = voice;
    console.log("index : ", i);
    console.log(utterance);
    synth.speak(utterance);
    await new Promise((resolve) => {
      utterance.onend = () => {
        textNodes[i].classList.remove("highlight");
        resolve();
      };
    });
  }
}

function populateContent(data) {
  let contentContainer = document.getElementById("content");
  data.map((d, i) => {
    let node = document.createElement("p");
    node.setAttribute("index", i);
    node.textContent = d;
    contentContainer.appendChild(node);
  });
}

const content = document.getElementById("content");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      const childNodes = Array.from(content.childNodes);
      childNodes.forEach((childNode) => {
        if (childNode.nodeType === Node.TEXT_NODE) {
          const newDiv = document.createElement("div");
          newDiv.textContent = childNode.textContent;
          content.replaceChild(newDiv, childNode);
        }
      });
    }
  });
});

observer.observe(content, { childList: true });
