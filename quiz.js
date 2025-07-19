const questions = [
  {
    q: "대한민국의 수도는 어디인가요?",
    options: ["서울", "부산", "인천", "대전"],
    answer: "서울"
  },
  {
    q: "지구에서 가장 큰 바다는?",
    options: ["대서양", "인도양", "태평양", "북극해"],
    answer: "태평양"
  },
  {
    q: "세종대왕이 창제한 문자는?",
    options: ["한자", "영문", "한글", "가나"],
    answer: "한글"
  },
  {
    q: "인류 최초로 달에 착륙한 국가는?",
    options: ["러시아", "중국", "미국", "일본"],
    answer: "미국"
  },
  {
    q: "물의 화학식은?",
    options: ["CO₂", "O₂", "H₂O", "H₂SO₄"],
    answer: "H₂O"
  }
];

let current = 0;
let correct = 0;

const questionBox = document.getElementById('questionBox');
const nextBtn = document.getElementById('nextBtn');
const resultBox = document.getElementById('resultBox');

function showQuestion(idx) {
  const q = questions[idx];
  let optHtml = '';
  q.options.forEach(opt => {
    optHtml += `<label><input type="radio" name="answer" value="${opt}" required> ${opt}</label>`;
  });

  questionBox.innerHTML = `
    <div>
      <p>${q.q}</p>
      ${optHtml}
    </div>
  `;
}

function showResult() {
  document.getElementById('quizForm').style.display = 'none';
  resultBox.style.display = 'block';
  let comment = correct === questions.length
    ? '만점! 훌륭한 상식력입니다.'
    : correct >= questions.length * 0.7
    ? '수고하셨습니다. 상식이 탄탄합니다.'
    : '노력하면 더 좋은 결과를 얻을 수 있어요!';
  resultBox.innerHTML = `<h2>총점: <span style="color:#2452a2">${correct} / ${questions.length}</span></h2><p>${comment}</p>
    <a href="index.html" style="display:block;margin-top:12px;">← 처음으로 돌아가기</a>`;
}

// 첫 문제 표시
showQuestion(current);

nextBtn.onclick = function() {
  const radios = document.getElementsByName('answer');
  let selected = '';
  for (let radio of radios) if (radio.checked) selected = radio.value;
  if (!selected) return;

  if (selected === questions[current].answer) correct++;
  current++;
  if (current < questions.length) {
    showQuestion(current);
  } else {
    showResult();
  }
};
