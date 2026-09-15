(() => {
  const app = document.querySelector('#app');
  const all = window.STATS_QUESTIONS || [];
  const letters = ['A', 'B', 'C', 'D'];
  const key = 'orbg8028-progress-v1';
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  const state = {
    screen: 'home', selectedTopics: new Set(), queue: [], index: 0,
    correct: 0, answered: 0, currentChoice: null,
    missed: new Set(saved.missed || []), mastered: new Set(saved.mastered || [])
  };
  const topics = [...new Set(all.map(q => q.topic))];
  const esc = s => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const shuffle = arr => [...arr].sort(() => Math.random() - .5);
  const persist = () => localStorage.setItem(key, JSON.stringify({missed:[...state.missed], mastered:[...state.mastered]}));
  const topicCount = t => all.filter(q => q.topic === t).length;

  function layout(content) {
    app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand"><div class="brand-mark">Σ</div><div><h1>ORBG 8028</h1><p>Exam 1 · Full-Coverage Study App</p></div></div><div class="pill">Multiple choice · Immediate explanations</div></header>${content}</div>`;
  }

  function home() {
    state.screen = 'home';
    state.selectedTopics.clear();
    layout(`<section class="hero"><p class="eyebrow">Temple · Fall 2026</p><h2>Understand the theory. Then prove you know it.</h2><p class="hero-copy">Built from all six uploaded lectures through September 14. Choose topics or run the complete bank. Every answer is explained immediately.</p><div class="stat-row"><div class="stat"><strong>${all.length}</strong><span>multiple-choice questions</span></div><div class="stat"><strong>${topics.length}</strong><span>exam topic groups</span></div><div class="stat"><strong>${state.missed.size}</strong><span>questions to revisit</span></div></div></section>
    <section class="panel"><div class="panel-head"><div><h3>Build a study session</h3><p class="panel-sub">Select one or more topics, or start full coverage.</p></div><button class="ghost" id="toggle-all">Select all</button></div><div class="topic-grid">${topics.map(t=>`<button class="topic" data-topic="${esc(t)}"><strong>${esc(t)}</strong><span>${topicCount(t)} questions</span></button>`).join('')}</div><div class="controls"><button class="primary" id="full">Start full coverage</button><button class="secondary" id="selected" disabled>Study selected topics</button><button class="ghost" id="missed" ${state.missed.size?'':'disabled'}>Retry missed (${state.missed.size})</button><button class="ghost" id="reset">Reset saved progress</button></div></section>`);
    document.querySelectorAll('.topic').forEach(btn => btn.onclick = () => {
      const t = btn.dataset.topic; state.selectedTopics.has(t) ? state.selectedTopics.delete(t) : state.selectedTopics.add(t);
      btn.classList.toggle('selected'); document.querySelector('#selected').disabled = !state.selectedTopics.size;
    });
    document.querySelector('#toggle-all').onclick = () => {
      const select = state.selectedTopics.size !== topics.length; state.selectedTopics = new Set(select ? topics : []);
      document.querySelectorAll('.topic').forEach(b => b.classList.toggle('selected', select));
      document.querySelector('#selected').disabled = !select; document.querySelector('#toggle-all').textContent = select?'Clear all':'Select all';
    };
    document.querySelector('#full').onclick = () => start(all);
    document.querySelector('#selected').onclick = () => start(all.filter(q=>state.selectedTopics.has(q.topic)));
    document.querySelector('#missed').onclick = () => start(all.filter(q=>state.missed.has(q.id)));
    document.querySelector('#reset').onclick = () => { if(confirm('Clear missed and mastered progress?')) { state.missed.clear(); state.mastered.clear(); persist(); home(); } };
  }

  function start(source) {
    state.queue = shuffle(source); state.index = 0; state.correct = 0; state.answered = 0; state.currentChoice = null; state.screen='quiz'; question();
  }
  function question() {
    if (state.index >= state.queue.length) return results();
    const q = state.queue[state.index]; const pct = (state.index/state.queue.length)*100;
    layout(`<div class="quiz-layout"><section class="panel question-card"><div class="question-meta"><span>${esc(q.topic)}</span><span>Question ${state.index+1} of ${state.queue.length}</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><h2>${esc(q.question)}</h2><div class="answers">${q.options.map((o,i)=>`<button class="answer" data-i="${i}"><span class="answer-letter">${letters[i]}</span><span>${esc(o)}</span></button>`).join('')}</div><div id="feedback"></div><div class="next-row"><button class="primary" id="next" hidden>Next question</button></div></section><aside class="sidebar"><div class="side-card"><h4>Session</h4><div class="metric"><span>Correct</span><strong>${state.correct}</strong></div><div class="metric"><span>Answered</span><strong>${state.answered}</strong></div><div class="metric"><span>Accuracy</span><strong>${state.answered?Math.round(state.correct/state.answered*100):0}%</strong></div></div><div class="side-card"><h4>Keyboard</h4><div class="metric"><span>Choose</span><strong><i class="kbd">A</i>–<i class="kbd">D</i></strong></div><div class="metric"><span>Continue</span><strong><i class="kbd">Enter</i></strong></div><button class="ghost" id="home" style="width:100%;margin-top:10px">End session</button></div></aside></div>`);
    document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answer(Number(b.dataset.i)));
    document.querySelector('#next').onclick=next; document.querySelector('#home').onclick=home;
  }
  function answer(choice) {
    if (state.currentChoice !== null) return;
    const q=state.queue[state.index], ok=choice===q.answer; state.currentChoice=choice; state.answered++; if(ok){state.correct++;state.mastered.add(q.id);state.missed.delete(q.id);}else{state.missed.add(q.id);state.mastered.delete(q.id);} persist();
    document.querySelectorAll('.answer').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');if(i===choice&&!ok)b.classList.add('wrong');});
    document.querySelector('#feedback').innerHTML=`<div class="feedback ${ok?'':'wrong'}"><strong>${ok?'Correct':'Not quite — the best answer is '+letters[q.answer]+'.'}</strong>${esc(q.explanation)}</div>`;
    document.querySelector('#next').hidden=false;
  }
  function next(){ if(state.currentChoice===null)return; state.index++;state.currentChoice=null;question(); }
  function results(){ const pct=state.answered?Math.round(state.correct/state.answered*100):0; layout(`<section class="panel result"><div class="score-ring" style="--score:${pct*3.6}deg"><strong>${pct}%</strong></div><h2>Session complete</h2><p class="panel-sub">${state.correct} correct out of ${state.answered}. ${pct>=90?'Strong work—use the missed bank to close the remaining gaps.':pct>=75?'Good base. Retry missed questions while the explanations are fresh.':'Focus on one topic at a time, then retry the missed bank.'}</p><div class="controls" style="justify-content:center"><button class="primary" id="again">Retry this set</button><button class="secondary" id="review" ${state.missed.size?'':'disabled'}>Study missed (${state.missed.size})</button><button class="ghost" id="home">Choose topics</button></div></section>`); document.querySelector('#again').onclick=()=>start(state.queue);document.querySelector('#review').onclick=()=>start(all.filter(q=>state.missed.has(q.id)));document.querySelector('#home').onclick=home; }
  document.addEventListener('keydown', e=>{if(state.screen!=='quiz')return;if(['a','b','c','d'].includes(e.key.toLowerCase())){const i=letters.indexOf(e.key.toUpperCase());document.querySelector(`.answer[data-i="${i}"]`)?.click();}if(e.key==='Enter'&&state.currentChoice!==null)next();});
  home();
})();
