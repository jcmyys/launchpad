const questions = [
  { q: "사교모임에서 에너지가 충전되는 편인가요?", type: "EI" },
  { q: "친구 수다보다는 혼자 쉬는 것이 더 좋다.", type: "EI" },
  { q: "현실적인 것보단 상상하는 걸 더 좋아한다.", type: "SN" },
  { q: "새로운 아이디어를 생각하는 게 즐겁다.", type: "SN" },
  { q: "논리적 설명이 설득에 중요하다.", type: "TF" },
  { q: "상대방의 기분을 자주 신경 쓴다.", type: "TF" },
  { q: "계획적으로 움직이는 걸 선호한다.", type: "JP" },
  { q: "즉흥적인 행동이 더 편하다.", type: "JP" }
];

let answers = [];
let current = 0;

const questionBox = document.getElementById('questionBox');
const nextBtn = document.getElementById('nextBtn');
const resultBox = document.getElementById('resultBox');

function showQuestion(idx) {
  const q = questions[idx];
  questionBox.innerHTML = `
    <div>
      <p>${q.q}</p>
      <label><input type="radio" name="answer" value="yes" required> 그렇다</label>
      <label style="margin-left:20px;"><input type="radio" name="answer" value="no"> 아니다</label>
    </div>
  `;
}

function calcMBTI(ansArr) {
  let mbti = '';
  let typeCount = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

  ansArr.forEach((ans, i) => {
    const qType = questions[i].type;
    if (qType === "EI") typeCount[ans === "yes" ? 'E' : 'I']++;
    if (qType === "SN") typeCount[ans === "yes" ? 'N' : 'S']++;
    if (qType === "TF") typeCount[ans === "yes" ? 'T' : 'F']++;
    if (qType === "JP") typeCount[ans === "yes" ? 'J' : 'P']++;
  });

  mbti += typeCount.E >= typeCount.I ? 'E' : 'I';
  mbti += typeCount.S >= typeCount.N ? 'S' : 'N';
  mbti += typeCount.T >= typeCount.F ? 'T' : 'F';
  mbti += typeCount.J >= typeCount.P ? 'J' : 'P';

  return mbti;
}

// 초기 질문 표시
showQuestion(current);

nextBtn.onclick = function() {
  const radios = document.getElementsByName('answer');
  let selected = '';
  for (let radio of radios) {
    if (radio.checked) selected = radio.value;
  }
  if (!selected) return;

  answers.push(selected);
  current++;
  if (current < questions.length) {
    showQuestion(current);
  } else {
    // 결과 계산 및 표시
    document.getElementById('mbtiForm').style.display = 'none';
    const result = calcMBTI(answers);
    resultBox.style.display = 'block';
    resultBox.innerHTML = `<h2>당신의 MBTI는 <span style="color:#38498a">${result}</span> 입니다!</h2>
      <a href="index.html" style="display:block;margin-top:12px;">← 처음으로 돌아가기</a>`;
  }
};
