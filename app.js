(() => {
  const app = document.querySelector('#app');
  const all = window.STATS_QUESTIONS || [];
  const examConfig = window.STATS_EXAM_CONFIG || {};
  const letters = ['A', 'B', 'C', 'D'];
  const key = 'orbg8028-progress-v2';
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  const state = {
    screen: 'home', mode: 'study', selectedTopics: new Set(), queue: [], index: 0,
    correct: 0, answered: 0, currentChoice: null, responses: [], examName: '',
    remainingSeconds: 0, timerId: null,
    missed: new Set(saved.missed || []), mastered: new Set(saved.mastered || [])
  };
  const topics = [...new Set(all.map(q => q.topic))];
  const esc = s => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const shuffle = arr => [...arr].sort(() => Math.random() - .5);
  const persist = () => localStorage.setItem(key, JSON.stringify({missed:[...state.missed], mastered:[...state.mastered]}));
  const topicCount = t => all.filter(q => q.topic === t).length;
  const kindLabel = kind => ({theory:'Theory',application:'Application',calculation:'Calculation'}[kind] || kind);

  function layout(content) {
    app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand"><div class="brand-mark">Σ</div><div><h1>ORBG 8028</h1><p>Exam 1 · Updated September 21 Review</p></div></div><div class="pill">Study mode + timed exam mode</div></header>${content}</div>`;
  }

  function stopTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
  }

  function home() {
    stopTimer();
    state.screen = 'home'; state.mode = 'study'; state.selectedTopics.clear();
    const byKind = Object.fromEntries(['theory','application','calculation'].map(k => [k, all.filter(q=>q.kind===k).length]));
    layout(`<section class="hero"><p class="eyebrow">Temple · Fall 2026 · Updated review</p><h2>Learn it in practice. Prove it under exam conditions.</h2><p class="hero-copy">The question bank now follows the updated September 21 review and includes dedicated theory, application, and calculation practice.</p><div class="stat-row"><div class="stat"><strong>${all.length}</strong><span>multiple-choice questions</span></div><div class="stat"><strong>${topics.length}</strong><span>exam topic groups</span></div><div class="stat"><strong>${state.missed.size}</strong><span>questions to revisit</span></div></div></section>
    <section class="panel exam-panel"><div class="panel-head"><div><p class="eyebrow dark">Exam section</p><h3>Choose an exam</h3><p class="panel-sub">Answers and explanations are hidden until submission. Formulas remain available, matching the professor’s review.</p></div><span class="review-chip">80-minute full exam</span></div><div class="exam-grid">
      <button class="exam-option featured" data-exam="full"><span class="exam-icon">★</span><strong>Full Mock Exam</strong><span>50 questions · 80 minutes</span><small>26 theory · 16 application · 8 calculation</small></button>
      <button class="exam-option" data-exam="theory"><span class="type-dot theory"></span><strong>Theory Exam</strong><span>30 questions · 45 minutes</span><small>${byKind.theory} questions available</small></button>
      <button class="exam-option" data-exam="application"><span class="type-dot application"></span><strong>Application Exam</strong><span>25 questions · 40 minutes</span><small>${byKind.application} questions available</small></button>
      <button class="exam-option" data-exam="calculation"><span class="type-dot calculation"></span><strong>Calculation Exam</strong><span>20 questions · 35 minutes</span><small>${byKind.calculation} questions available</small></button>
    </div></section>
    <section class="panel"><div class="panel-head"><div><p class="eyebrow dark">Study section</p><h3>Practice with immediate explanations</h3><p class="panel-sub">Select one or more topics, or start the complete question bank.</p></div><button class="ghost" id="toggle-all">Select all</button></div><div class="topic-grid">${topics.map(t=>`<button class="topic" data-topic="${esc(t)}"><strong>${esc(t)}</strong><span>${topicCount(t)} questions</span></button>`).join('')}</div><div class="controls"><button class="primary" id="full-study">Study all questions</button><button class="secondary" id="selected" disabled>Study selected topics</button><button class="ghost" id="missed" ${state.missed.size?'':'disabled'}>Retry missed (${state.missed.size})</button><button class="ghost" id="reset">Reset saved progress</button></div></section>`);
    document.querySelectorAll('.exam-option').forEach(btn => btn.onclick = () => startExam(btn.dataset.exam));
    document.querySelectorAll('.topic').forEach(btn => btn.onclick = () => {
      const t = btn.dataset.topic; state.selectedTopics.has(t) ? state.selectedTopics.delete(t) : state.selectedTopics.add(t);
      btn.classList.toggle('selected'); document.querySelector('#selected').disabled = !state.selectedTopics.size;
    });
    document.querySelector('#toggle-all').onclick = () => {
      const select = state.selectedTopics.size !== topics.length; state.selectedTopics = new Set(select ? topics : []);
      document.querySelectorAll('.topic').forEach(b => b.classList.toggle('selected', select));
      document.querySelector('#selected').disabled = !select; document.querySelector('#toggle-all').textContent = select ? 'Clear all' : 'Select all';
    };
    document.querySelector('#full-study').onclick = () => startStudy(all);
    document.querySelector('#selected').onclick = () => startStudy(all.filter(q=>state.selectedTopics.has(q.topic)));
    document.querySelector('#missed').onclick = () => startStudy(all.filter(q=>state.missed.has(q.id)));
    document.querySelector('#reset').onclick = () => { if(confirm('Clear missed and mastered progress?')) { state.missed.clear(); state.mastered.clear(); persist(); home(); } };
  }

  function startStudy(source) {
    stopTimer(); state.mode='study'; state.queue=shuffle(source); state.index=0; state.correct=0; state.answered=0; state.currentChoice=null; state.responses=[]; state.screen='quiz'; renderStudyQuestion();
  }

  function renderStudyQuestion() {
    if (state.index >= state.queue.length) return studyResults();
    const q=state.queue[state.index], pct=(state.index/state.queue.length)*100;
    layout(`<div class="quiz-layout"><section class="panel question-card"><div class="question-meta"><span>${esc(q.topic)}</span><span class="type-badge ${q.kind}">${kindLabel(q.kind)}</span><span>Question ${state.index+1} of ${state.queue.length}</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><h2>${esc(q.question)}</h2><div class="answers">${answerButtons(q)}</div><div id="feedback"></div><div class="next-row"><button class="primary" id="next" hidden>Next question</button></div></section>${studySidebar()}</div>`);
    document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answerStudy(Number(b.dataset.i)));
    document.querySelector('#next').onclick=nextStudy; document.querySelector('#home').onclick=home;
  }

  function answerButtons(q, selected = null, disabled = false) {
    return q.options.map((o,i)=>`<button class="answer ${selected===i?'selected':''}" data-i="${i}" ${disabled?'disabled':''}><span class="answer-letter">${letters[i]}</span><span>${esc(o)}</span></button>`).join('');
  }

  function studySidebar() {
    return `<aside class="sidebar"><div class="side-card"><h4>Study session</h4><div class="metric"><span>Correct</span><strong>${state.correct}</strong></div><div class="metric"><span>Answered</span><strong>${state.answered}</strong></div><div class="metric"><span>Accuracy</span><strong>${state.answered?Math.round(state.correct/state.answered*100):0}%</strong></div></div><div class="side-card"><h4>Keyboard</h4><div class="metric"><span>Choose</span><strong><i class="kbd">A</i>–<i class="kbd">D</i></strong></div><div class="metric"><span>Continue</span><strong><i class="kbd">Enter</i></strong></div><button class="ghost" id="home" style="width:100%;margin-top:10px">End session</button></div></aside>`;
  }

  function answerStudy(choice) {
    if (state.currentChoice !== null) return;
    const q=state.queue[state.index], ok=choice===q.answer; state.currentChoice=choice; state.answered++;
    if(ok){state.correct++;state.mastered.add(q.id);state.missed.delete(q.id);}else{state.missed.add(q.id);state.mastered.delete(q.id);} persist();
    document.querySelectorAll('.answer').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');if(i===choice&&!ok)b.classList.add('wrong');});
    document.querySelector('#feedback').innerHTML=`<div class="feedback ${ok?'':'wrong'}"><strong>${ok?'Correct':'Not quite — the best answer is '+letters[q.answer]+'.'}</strong>${esc(q.explanation)}</div>`;
    document.querySelector('#next').hidden=false;
  }
  function nextStudy(){if(state.currentChoice===null)return;state.index++;state.currentChoice=null;renderStudyQuestion();}

  function pick(source, count) { return shuffle(source).slice(0, Math.min(count, source.length)); }
  function startExam(type) {
    stopTimer(); state.mode='exam'; state.index=0; state.currentChoice=null; state.responses=[]; state.screen='exam';
    if(type==='full') {
      const mix=examConfig.fullExam || {theory:26,application:16,calculation:8};
      state.queue=shuffle([...pick(all.filter(q=>q.kind==='theory'),mix.theory),...pick(all.filter(q=>q.kind==='application'),mix.application),...pick(all.filter(q=>q.kind==='calculation'),mix.calculation)]);
      state.examName='Full Mock Exam'; state.remainingSeconds=(examConfig.durationMinutes||80)*60;
    } else {
      const setup={theory:{count:30,min:45,name:'Theory Exam'},application:{count:25,min:40,name:'Application Exam'},calculation:{count:20,min:35,name:'Calculation Exam'}}[type];
      state.queue=pick(all.filter(q=>q.kind===type),setup.count); state.examName=setup.name; state.remainingSeconds=setup.min*60;
    }
    startTimer(); renderExamQuestion();
  }

  function startTimer() {
    state.timerId=setInterval(()=>{state.remainingSeconds--;updateTimer();if(state.remainingSeconds<=0)submitExam(true);},1000);
  }
  function formatTime(sec){const m=Math.max(0,Math.floor(sec/60)),s=Math.max(0,sec%60);return `${m}:${String(s).padStart(2,'0')}`;}
  function updateTimer(){const el=document.querySelector('#timer');if(el){el.textContent=formatTime(state.remainingSeconds);el.classList.toggle('urgent',state.remainingSeconds<300);}}

  function renderExamQuestion() {
    const q=state.queue[state.index], selected=state.responses[state.index]?.choice ?? null, pct=(state.index/state.queue.length)*100;
    layout(`<div class="quiz-layout"><section class="panel question-card exam-question"><div class="question-meta"><span>${esc(state.examName)}</span><span class="type-badge ${q.kind}">${kindLabel(q.kind)}</span><span>Question ${state.index+1} of ${state.queue.length}</span></div><div class="progress-track"><div class="progress-fill exam" style="width:${pct}%"></div></div><h2>${esc(q.question)}</h2><div class="answers">${answerButtons(q,selected)}</div><div class="exam-note">Feedback is shown after you submit the exam.</div><div class="exam-nav"><button class="ghost" id="prev" ${state.index===0?'disabled':''}>Previous</button><button class="primary" id="exam-next">${state.index===state.queue.length-1?'Submit exam':'Next question'}</button></div></section>${examSidebar()}</div>`);
    document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>selectExamAnswer(Number(b.dataset.i)));
    document.querySelector('#prev').onclick=()=>{saveCurrentExam();state.index--;renderExamQuestion();};
    document.querySelector('#exam-next').onclick=()=>{saveCurrentExam();if(state.index===state.queue.length-1)submitExam(false);else{state.index++;renderExamQuestion();}};
    document.querySelector('#home').onclick=()=>{if(confirm('End this exam? Your current attempt will be discarded.'))home();};
    updateTimer();
  }
  function selectExamAnswer(choice){state.currentChoice=choice;document.querySelectorAll('.answer').forEach((b,i)=>b.classList.toggle('selected',i===choice));}
  function saveCurrentExam(){const prior=state.responses[state.index];const choice=state.currentChoice ?? prior?.choice ?? null;state.responses[state.index]={choice};state.currentChoice=null;}

  function examSidebar() {
    const answered=state.responses.filter(r=>r?.choice!==null).length+(state.currentChoice!==null&&!state.responses[state.index]?1:0);
    return `<aside class="sidebar"><div class="side-card timer-card"><span>Time remaining</span><strong id="timer">${formatTime(state.remainingSeconds)}</strong><small>${answered} of ${state.queue.length} answered</small></div><details class="side-card formula-card"><summary>Provided formulas</summary><ul>${(examConfig.formulas||[]).map(f=>`<li>${esc(f)}</li>`).join('')}</ul></details><div class="side-card"><h4>Keyboard</h4><div class="metric"><span>Choose</span><strong><i class="kbd">A</i>–<i class="kbd">D</i></strong></div><button class="ghost" id="home" style="width:100%;margin-top:10px">End exam</button></div></aside>`;
  }

  function submitExam(timeExpired) {
    if(state.screen!=='exam')return;
    saveCurrentExam(); stopTimer(); state.screen='exam-results';
    const scored=state.queue.map((q,i)=>({q,choice:state.responses[i]?.choice ?? null,correct:(state.responses[i]?.choice ?? null)===q.answer}));
    const correct=scored.filter(x=>x.correct).length, pct=Math.round(correct/state.queue.length*100);
    scored.forEach(x=>{if(x.correct){state.mastered.add(x.q.id);state.missed.delete(x.q.id);}else{state.missed.add(x.q.id);state.mastered.delete(x.q.id);}});persist();
    const rows=['theory','application','calculation'].map(kind=>{const group=scored.filter(x=>x.q.kind===kind);if(!group.length)return'';const c=group.filter(x=>x.correct).length;return `<div class="result-row"><span><i class="type-dot ${kind}"></i>${kindLabel(kind)}</span><strong>${c}/${group.length} · ${Math.round(c/group.length*100)}%</strong></div>`;}).join('');
    const missed=scored.filter(x=>!x.correct).map(x=>x.q);
    layout(`<section class="panel result"><p class="eyebrow dark">${esc(state.examName)}${timeExpired?' · Time expired':''}</p><div class="score-ring" style="--score:${pct*3.6}deg"><strong>${pct}%</strong></div><h2>Exam submitted</h2><p class="panel-sub">${correct} correct out of ${state.queue.length}. ${pct>=90?'Exam-ready performance. Review the few misses to lock them in.':pct>=75?'You have a solid base. Your type breakdown shows where to focus next.':'Use the weakest category below for your next targeted exam.'}</p><div class="result-breakdown">${rows}</div><div class="controls" style="justify-content:center"><button class="primary" id="review-missed" ${missed.length?'':'disabled'}>Review missed (${missed.length})</button><button class="secondary" id="retry">New ${esc(state.examName)}</button><button class="ghost" id="home">Back to dashboard</button></div></section>`);
    document.querySelector('#review-missed').onclick=()=>startStudy(missed);document.querySelector('#retry').onclick=()=>startExam(state.examName.startsWith('Full')?'full':state.examName.split(' ')[0].toLowerCase());document.querySelector('#home').onclick=home;
  }

  function studyResults(){const pct=state.answered?Math.round(state.correct/state.answered*100):0;layout(`<section class="panel result"><div class="score-ring" style="--score:${pct*3.6}deg"><strong>${pct}%</strong></div><h2>Study session complete</h2><p class="panel-sub">${state.correct} correct out of ${state.answered}. ${pct>=90?'Strong work—use the missed bank to close the remaining gaps.':pct>=75?'Good base. Retry missed questions while the explanations are fresh.':'Focus on one topic at a time, then retry the missed bank.'}</p><div class="controls" style="justify-content:center"><button class="primary" id="again">Retry this set</button><button class="secondary" id="review" ${state.missed.size?'':'disabled'}>Study missed (${state.missed.size})</button><button class="ghost" id="home">Dashboard</button></div></section>`);document.querySelector('#again').onclick=()=>startStudy(state.queue);document.querySelector('#review').onclick=()=>startStudy(all.filter(q=>state.missed.has(q.id)));document.querySelector('#home').onclick=home;}

  document.addEventListener('keydown',e=>{if(!['quiz','exam'].includes(state.screen))return;if(['a','b','c','d'].includes(e.key.toLowerCase())){const i=letters.indexOf(e.key.toUpperCase());document.querySelector(`.answer[data-i="${i}"]`)?.click();}if(e.key==='Enter'){if(state.screen==='quiz'&&state.currentChoice!==null)nextStudy();if(state.screen==='exam')document.querySelector('#exam-next')?.click();}});
  home();
})();
