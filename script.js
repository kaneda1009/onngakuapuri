// 楽曲データ
const songs = [
  {
    title: "ブレーメン",
    artist: "ヨルシカ",
    mood: ["sad", "anxious"],
    scene: ["alone", "move"],
    type: ["emotional", "slow"],
    url: "https://www.youtube.com/watch?v=oy6MDr6I6rM&list=RDoy6MDr6I6rM&start_radio=1",
        reason:
 "感情に寄り添いながら、そっと前へ進ませてくれる曲です。"
  },
  {
    title: "ひたむき",
    artist: "SUPER BEAVER", mood: ["positive"],
    scene: ["move", "work"],
    type: ["power", "energetic"],
    url: "https://www.youtube.com/watch?v=rOheZgDIPUs&list=RDrOheZgDIPUs&start_radio=",
    reason: "勢いをつけたいときに、強く背中を押してくれます。"
  },
  {
    title: "僕の心",
    artist: "PEOPLE1",
    mood: ["sad"],
    scene: ["alone"],
    type: ["emotional"],
    url: "https://www.youtube.com/watch?v=a-xQCcNeZgw&list=RDa-xQCcNeZgw&start_radio=1",
    reason: "切ない気持ちを静かに受け止めてくれるような1曲です。"
  },
  {
    title: "クロノスタシス",
    artist: "BUMP OF CHICKEN",
    mood: ["relax", "good"],
    scene: ["work", "alone"],
    type: ["slow"],
    url: "https://www.youtube.com/watch?v=B--iJ2pNvLU&list=RDB--iJ2pNvLU&start_radio=1",
    reason: "心を落ち着かせてくれる、リラックスできる曲です。"
  },
  {
    title: "群青讚歌",
    artist: "Eve",
    mood: ["good"],
    scene: ["friends", "move"],
    type: ["energetic"],
    url: "https://www.youtube.com/watch?v=sgZjbk9eH6g&list=RDsgZjbk9eH6g&start_radio=1",
    reason: "明るい気分をさらに盛り上げてくれる前向きな曲です。"
  }
];

// YouTube動画ID抽出
function extractYouTubeId(url) {
  const reg = /(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(reg);
  return match ? match[1] : null;
}

// 診断ロジック
function pickSong(mood, scene, type) {
  let candidates = songs.filter(
    s => s.mood.includes(mood) && s.scene.includes(scene) && s.type.includes(type)
  );

  if (candidates.length === 0) {
    candidates = songs.filter(s => s.mood.includes(mood));
  }
  if (candidates.length === 0) {
    candidates = songs;
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ボタン押下
document.getElementById("submit").addEventListener("click", () => {
  const mood = document.getElementById("mood").value;
  const scene = document.getElementById("scene").value;
  const type = document.getElementById("type").value;

  const song = pickSong(mood, scene, type);

  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songArtist").textContent = song.artist;
  document.getElementById("songReason").textContent = song.reason;

  const videoId = extractYouTubeId(song.url);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const thumbArea = document.getElementById("thumbnailArea");
  const playerArea = document.getElementById("playerArea");

  thumbArea.innerHTML = "";
  playerArea.innerHTML = "";

  const img = document.createElement("img");
  img.src = thumbnailUrl;

  img.addEventListener("click", () => {
    playerArea.innerHTML = `
      <iframe height="240"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
    `;
  });

  thumbArea.appendChild(img);

  document.getElementById("result").style.display = "block";
});
