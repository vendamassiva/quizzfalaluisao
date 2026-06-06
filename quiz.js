const FORM_URL = 'https://form.respondi.app/RuLAddBp';

const questions = [
  {
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
    text: 'Você produz conteúdo nas redes sociais?',
    sub: 'Pode ser vídeo, foto, texto ou qualquer formato.',
    opts: [
      'Sim, produzo regularmente',
      'Às vezes, de forma esporádica',
      'Ainda não, mas quero começar',
      'Não produzo conteúdo',
    ],
  },
  {
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/><path d="M12 3v4"/></svg>`,
    text: 'Como você se define?',
    sub: 'Escolha a opção que melhor representa você.',
    opts: [
      'Empresária(o)',
      'Profissional liberal',
      'Creator / Influencer',
      'Curioso(a)',
      'Outro',
    ],
  },
  {
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    text: 'Você usa as redes sociais de forma profissional?',
    sub: 'Para gerar clientes, vendas ou oportunidades de negócio.',
    opts: [
      'Sim, uso profissionalmente',
      'Parcialmente, misturo pessoal e profissional',
      'Não, uso só de forma pessoal',
    ],
  },
  {
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    text: 'Você vê necessidade em crescer seguidores adaptando ao novo formato que gera clientes?',
    sub: 'Formatos estratégicos que convertem seguidores em compradores.',
    opts: ['Sim, preciso muito disso!', 'Não, estou satisfeito(a) como está'],
    twoCol: true,
  },
  {
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`,
    text: 'Você quer a minha ajuda para isso?',
    sub: 'Para crescer e monetizar sua audiência com estratégia.',
    opts: ['Preciso de ajuda!', 'Não tenho interesse.'],
    twoCol: true,
    last: true,
  },
];

let current = 0;

const stepLabel = document.getElementById('stepLabel');
const stepPct = document.getElementById('stepPct');
const progressFill = document.getElementById('progressFill');
const progressTrack = progressFill.parentElement;
const questionArea = document.getElementById('questionArea');

function setProgress(step) {
  const pct = Math.round((step / questions.length) * 100);
  progressFill.style.width = pct + '%';
  progressTrack.setAttribute('aria-valuenow', pct);
  stepPct.textContent = pct + '%';
}

function render(index) {
  const q = questions[index];
  setProgress(index);
  stepLabel.textContent = `Pergunta ${index + 1} de ${questions.length}`;

  questionArea.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'q-slide';

  const iconEl = document.createElement('div');
  iconEl.className = 'q-icon';
  iconEl.innerHTML = q.icon;
  wrap.appendChild(iconEl);

  const textEl = document.createElement('h1');
  textEl.className = 'q-text';
  textEl.textContent = q.text;
  wrap.appendChild(textEl);

  const subEl = document.createElement('p');
  subEl.className = 'q-sub';
  subEl.textContent = q.sub;
  wrap.appendChild(subEl);

  const grid = document.createElement('div');
  grid.className = q.twoCol ? 'options two-col' : 'options';
  grid.setAttribute('role', 'list');

  q.opts.forEach((label, i) => {
    const isYes = q.last && i === 0;
    const isNo = q.last && i === 1;

    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('role', 'listitem');
    btn.className = 'opt-btn' + (isYes ? ' cta-yes' : '') + (isNo ? ' cta-no' : '');

    if (!q.last) {
      const dot = document.createElement('span');
      dot.className = 'opt-dot';
      dot.setAttribute('aria-hidden', 'true');
      btn.appendChild(dot);
    }

    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    btn.appendChild(labelEl);

    btn.addEventListener('click', () => {
      if (q.last) {
        if (isYes) showFinal();
      } else {
        btn.classList.add('selected');
        setTimeout(() => {
          current++;
          render(current);
        }, 200);
      }
    });

    grid.appendChild(btn);
  });

  wrap.appendChild(grid);
  questionArea.appendChild(wrap);
}

function showFinal() {
  setProgress(questions.length);
  stepLabel.textContent = 'Concluído!';
  stepPct.textContent = '100%';

  questionArea.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'final-screen';

  wrap.innerHTML = `
    <div class="final-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <h1 class="final-title">Ótimo! Você se qualificou.</h1>
    <p class="final-sub">Agora é só dar o próximo passo. Preencha seus dados e vamos conversar sobre como posso te ajudar a crescer de verdade.</p>
    <a class="cta-link" href="${FORM_URL}" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      Quero ajuda do Luisão!
    </a>
  `;

  questionArea.appendChild(wrap);
}

render(0);
