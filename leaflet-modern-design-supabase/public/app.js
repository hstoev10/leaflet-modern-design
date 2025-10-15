import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM
const searchEl = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const leafletList = document.getElementById('leaflet-list');
const questionView = document.getElementById('question-view');
const questionBox = document.getElementById('question-box');
const prevBtn = document.getElementById('prev-q');
const nextBtn = document.getElementById('next-q');

let categories = [];
let leaflets = [];
let questions = [];
let currentQuestionIndex = 0;
let currentQuestionSet = [];

async function loadCategories(){
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if(error){ console.error(error); return; }
  categories = data || [];
  categoryFilter.innerHTML = '<option value="">Всички</option>' + categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  // Fill admin selects if present
  const leafCat = document.getElementById('leaf-cat');
  const qLeaf = document.getElementById('q-leaf');
  if(leafCat) leafCat.innerHTML = '<option value="">--</option>' + categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  if(qLeaf) qLeaf.innerHTML = '<option value="">--</option>' + categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
}

async function loadLeaflets(){
  const q = supabase.from('leaflets').select('id,title,content,category_id').order('id');
  const { data, error } = await q;
  if(error){ console.error(error); return; }
  leaflets = data || [];
  renderLeaflets();
}

function renderLeaflets(){
  const q = searchEl.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const filtered = leaflets.filter(l=>{
    if(cat && String(l.category_id)!==String(cat)) return false;
    if(!q) return true;
    return (l.title||'').toLowerCase().includes(q) || (l.content||'').toLowerCase().includes(q);
  });
  if(filtered.length===0) leafletList.innerHTML = '<p>Няма намерени листовки.</p>';
  else leafletList.innerHTML = filtered.map(l=>`<div class="leaflet-card"><h3>${l.title}</h3><p>${(l.content||'').substring(0,200)}</p><button data-id="${l.id}" class="open-leaflet">Отвори</button></div>`).join('');
  document.querySelectorAll('.open-leaflet').forEach(btn=>{
    btn.onclick = async ()=> {
      const id = btn.dataset.id;
      await openLeaflet(id);
    };
  });
}

async function openLeaflet(leafletId){
  // load questions for leaflet
  const { data: qs, error } = await supabase.from('questions').select('*').eq('leaflet_id', leafletId).order('id');
  if(error){ console.error(error); return; }
  currentQuestionSet = qs || [];
  currentQuestionIndex = 0;
  if(currentQuestionSet.length===0){
    questionBox.innerHTML = '<p>Няма добавени въпроси за тази листовка.</p>';
    questionView.style.display = 'block';
    return;
  }
  await loadQuestionWithAnswers(currentQuestionSet[currentQuestionIndex].id);
  questionView.style.display = 'block';
}

async function loadQuestionWithAnswers(questionId){
  // question
  const { data:q, error:qerr } = await supabase.from('questions').select('*').eq('id', questionId).single();
  if(qerr){ console.error(qerr); return; }
  const { data: answers, error: aerr } = await supabase.from('answers').select('*').eq('question_id', questionId).order('id');
  if(aerr){ console.error(aerr); return; }
  renderQuestion(q, answers);
}

function renderQuestion(q, answers){
  questionBox.innerHTML = `<h3>${q.question_text}</h3>
    <div id="answers">${answers.map(a=>`<div class="answer" data-id="${a.id}" data-correct="${a.is_correct}">${a.answer_text}</div>`).join('')}</div>
    <div id="q-feedback"></div>`;
  document.querySelectorAll('.answer').forEach(el=>{
    el.onclick = ()=> {
      document.querySelectorAll('.answer').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
      // feedback
      const correct = el.dataset.correct === 't' || el.dataset.correct === 'true';
      const fb = document.getElementById('q-feedback');
      if(correct) fb.innerText = 'Правилен отговор ✅';
      else fb.innerText = 'Грешен отговор ❌';
    };
  });
}

prevBtn && prevBtn.addEventListener('click', async ()=>{
  if(currentQuestionIndex>0){
    currentQuestionIndex--;
    await loadQuestionWithAnswers(currentQuestionSet[currentQuestionIndex].id);
  }
});
nextBtn && nextBtn.addEventListener('click', async ()=>{
  if(currentQuestionIndex < currentQuestionSet.length -1){
    currentQuestionIndex++;
    await loadQuestionWithAnswers(currentQuestionSet[currentQuestionIndex].id);
  }
});

searchEl && searchEl.addEventListener('input', renderLeaflets);
categoryFilter && categoryFilter.addEventListener('change', renderLeaflets);

// Initial load
await loadCategories();
await loadLeaflets();

/* ADMIN related code (works for admin.html too) */
if(document.getElementById('signup')){
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const signup = document.getElementById('signup');
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');
  const userInfo = document.getElementById('user-info');
  const adminActions = document.getElementById('admin-actions');

  signup.onclick = async ()=>{
    const { data, error } = await supabase.auth.signUp({ email: email.value, password: password.value });
    if(error) alert(error.message); else alert('Регистрацията е изпратена. Потвърди имейла ако е необходимо.');
  };
  login.onclick = async ()=>{
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
    if(error) alert(error.message);
    else { userInfo.innerText = JSON.stringify(data.user); adminActions.style.display = 'block'; loadCategories(); loadLeaflets(); loadAdminSelects(); }
  };
  logout.onclick = async ()=>{
    await supabase.auth.signOut();
    userInfo.innerText = ''; adminActions.style.display = 'none';
  };

  async function loadAdminSelects(){
    const { data } = await supabase.from('leaflets').select('id,title');
    const select = document.getElementById('q-leaf');
    const leafSel = document.getElementById('leaf-cat');
    if(select) select.innerHTML = (data||[]).map(x=>`<option value="${x.id}">${x.title}</option>`).join('');
    if(leafSel) leafSel.innerHTML = '<option value="">--</option>' + (categories||[]).map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  }

  // Add category
  document.getElementById('add-cat').onclick = async ()=>{
    const name = document.getElementById('cat-name').value;
    const desc = document.getElementById('cat-desc').value;
    const { error } = await supabase.from('categories').insert({ name, description: desc });
    if(error) alert(error.message); else { alert('Добавена'); await loadCategories(); }
  };

  // Add leaflet
  document.getElementById('add-leaf').onclick = async ()=>{
    const title = document.getElementById('leaf-title').value;
    const content = document.getElementById('leaf-content').value;
    const category_id = document.getElementById('leaf-cat').value || null;
    const { error } = await supabase.from('leaflets').insert({ title, content, category_id });
    if(error) alert(error.message); else { alert('Добавена листовка'); await loadLeaflets(); loadAdminSelects(); }
  };

  // Add question + answers
  document.getElementById('add-q').onclick = async ()=>{
    const leaflet_id = document.getElementById('q-leaf').value;
    const qtext = document.getElementById('q-text').value;
    const a1 = document.getElementById('a1').value;
    const a1c = document.getElementById('a1c').checked;
    const a2 = document.getElementById('a2').value;
    const a2c = document.getElementById('a2c').checked;
    const a3 = document.getElementById('a3').value;
    const a3c = document.getElementById('a3c').checked;
    const a4 = document.getElementById('a4').value;
    const a4c = document.getElementById('a4c').checked;

    const { data, error } = await supabase.from('questions').insert({ leaflet_id, question_text: qtext }).select();
    if(error){ alert(error.message); return; }
    const qid = data[0].id;
    const answers = [
      { question_id: qid, answer_text: a1, is_correct: a1c },
      { question_id: qid, answer_text: a2, is_correct: a2c },
      { question_id: qid, answer_text: a3, is_correct: a3c },
      { question_id: qid, answer_text: a4, is_correct: a4c }
    ];
    const { error: aerr } = await supabase.from('answers').insert(answers);
    if(aerr) alert(aerr.message); else { alert('Въпрос + отговори добавени'); }
  };
}
