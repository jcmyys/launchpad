// MBTI 데이터
const mbtiQuestions = [
  { q: "사교모임에서 에너지가 충전되는 편인가요?", type: "EI" },
  { q: "친구 수다보다는 혼자 쉬는 것이 더 좋다.", type: "EI" },
  { q: "현실적인 것보단 상상하는 걸 더 좋아한다.", type: "SN" },
  { q: "새로운 아이디어를 생각하는 게 즐겁다.", type: "SN" },
  { q: "논리적 설명이 설득에 중요하다.", type: "TF" },
  { q: "상대방의 기분을 자주 신경 쓴다.", type: "TF" },
  { q: "계획적으로 움직이는 걸 선호한다.", type: "JP" },
  { q: "즉흥적인 행동이 더 편하다.", type: "JP" }
];

// 상식 문제 데이터
const quizQuestions = [
  { q: "대한민국의 수도는 어디인가요?", options: ["서울","부산","인천","대전"], answer: "서울" },
  { q: "지구에서 가장 큰 바다는?", options: ["대서양","인도양","태평양","북극해"], answer: "태평양" },
  { q: "세종대왕이 창제한 문자는?", options: ["한자","영문","한글","가나"], answer: "한글" },
  { q: "인류 최초로 달에 착륙한 국가는?", options: ["러시아","중국","미국","일본"], answer: "미국" },
  { q: "물의 화학식은?", options: ["CO₂","O₂","H₂O","H₂SO₄"], answer: "H₂O" }
];

// 상태 변수
let mbtiCurrent = 0, mbtiAnswers = [];
let quizCurrent = 0, quizCorrect = 0;

// 요소 선택
const serviceSelect = document.getElementById('serviceSelect');
const toMbtiBtn = document.getElementById('toMbtiBtn');
const toQuizBtn = document.getElementById('toQuizBtn');
const mbtiForm = document.getElementById('mbtiForm');
const mbtiQuestionBox = document.getElementById('mbtiQuestionBox');
const mbtiNextBtn = document.getElementById('mbtiNextBtn');
const mbtiBackBtn = document.getElementById('mbtiBackBtn');
const mbtiResultBox = document.getElementById('mbtiResultBox');

const quizForm = document.getElementById('quizForm');
const quizQuestionBox = document.getElementById('quizQuestionBox');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizBackBtn = document.getElementById('quizBackBtn');
const quizResultBox = document.getElementById('quizResultBox');

// 화면 전환 함수
function showMain() {
  serviceSelect.style.display = 'block';
  mbtiForm.style.display = 'none';
  mbtiResultBox.style.display = 'none';
  quizForm.style.display = 'none';
  quizResultBox.style.display = 'none';
}

// MBTI 테스트 관련
function showMbtiQ(idx) {
  const q = mbtiQuestions[idx];
  mbtiQuestionBox.innerHTML = `
    <div>
      <p>${q.q}</p>
      <label><input type="radio" name="mbtiAnswer" value="yes" required> 그렇다</label>
      <label style="margin-left:20px;"><input type="radio" name="mbtiAnswer" value="no"> 아니다</label>
    </div>
  `;
}

function calcMbti(ansArr) {
  let mbti = '';
  let cnt = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
  ansArr.forEach((ans, i) => {
    const t = mbtiQuestions[i].type;
    if(t === "EI") cnt[ans === "yes" ? "E" : "I"]++;
    if(t === "SN") cnt[ans === "yes" ? "N" : "S"]++;
    if(t === "TF") cnt[ans === "yes" ? "T" : "F"]++;
    if(t === "JP") cnt[ans === "yes" ? "J" : "P"]++;
  });
  mbti += cnt.E >= cnt.I ? 'E' : 'I';
  mbti += cnt.S >= cnt.N ? 'S' : 'N';
  mbti += cnt.T >= cnt.F ? 'T' : 'F';
  mbti += cnt.J >= cnt.P ? 'J' : 'P';
  return mbti;
}

// 상식 문제 관련
function showQuizQ(idx) {
  const q = quizQuestions[idx];
  let opts = '';
  q.options.forEach(opt =>
    opts += `<label><input type="radio" name="quizAnswer" value="${opt}" required> ${opt}</label>`
  );
  quizQuestionBox.innerHTML = `<div><p>${q.q}</p>${opts}</div>`;
}

// 메인 선택에서 각 서비스로 이동
toMbtiBtn.onclick = function() {
  serviceSelect.style.display = 'none';
  mbtiForm.style.display = 'block';
  mbtiResultBox.style.display = 'none';
  mbtiCurrent = 0; mbtiAnswers = [];
  showMbtiQ(mbtiCurrent);
};
toQuizBtn.onclick = function() {
  serviceSelect.style.display = 'none';
  quizForm.style.display = 'block';
  quizResultBox.style.display = 'none';
  quizCurrent = 0; quizCorrect = 0;
  showQuizQ(quizCurrent);
};

// MBTI 테스트 진행/되돌리기
mbtiNextBtn.onclick = function() {
  const radios = document.getElementsByName('mbtiAnswer');
  let sel = '';
  for (let radio of radios) if(radio.checked) sel = radio.value;
  if (!sel) return;
  mbtiAnswers.push(sel);
  mbtiCurrent++;
  if (mbtiCurrent < mbtiQuestions.length) {
    showMbtiQ(mbtiCurrent);
  } else {
    mbtiForm.style.display = 'none';
    mbtiResultBox.style.display = 'block';
    const r = calcMbti(mbtiAnswers);
    mbtiResultBox.innerHTML = `<h2>당신의 MBTI는 <span style="color:#304096">${r}</span> 입니다!</h2>
      <button onclick="showMain()">테스트 다시 선택하기</button>`;
  }
};
mbtiBackBtn.onclick = showMain;

// 상식테스트 진행/되돌리기
quizNextBtn.onclick = function() {
  const radios = document.getElementsByName('quizAnswer');
  let sel = '';
  for (let radio of radios) if(radio.checked) sel = radio.value;
  if (!sel) return;
  if (sel === quizQuestions[quizCurrent].answer) quizCorrect++;
  quizCurrent++;
  if (quizCurrent < quizQuestions.length) {
    showQuizQ(quizCurrent);
  } else {
    quizForm.style.display = 'none';
    quizResultBox.style.display = 'block';
    let msg = quizCorrect === quizQuestions.length ? '만점! 훌륭한 상식력입니다.' :
              quizCorrect >= quizQuestions.length * 0.7 ? '수고하셨습니다. 상식이 탄탄합니다.' :
              '노력하면 더 좋은 결과를 얻을 수 있어요!';
    quizResultBox.innerHTML = `<h2>총점: <span style="color:#304096">${quizCorrect} / ${quizQuestions.length}</span></h2>
      <p>${msg}</p>
      <button onclick="showMain()">테스트 다시 선택하기</button>`;
  }
};
quizBackBtn.onclick = showMain;

// 최초 메인 선택화면 표시
showMain();
