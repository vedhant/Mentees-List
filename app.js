
const addMentee = document.forms['add_mentee'];
const list = document.querySelector('#list ul');
var ed = false;

loadAll();

function Color(li,rate){

  if(rate == 5){
  li.style.backgroundColor = "rgb(83, 166, 93)";

  li.querySelector('.name').style.backgroundColor = "rgb(45, 89, 50)";
  li.querySelector('.rating').style.backgroundColor = "rgb(45, 89, 50)";
  li.querySelector('.delete').style.backgroundColor = "rgb(51, 102, 57)";
  try{li.querySelector('.edit').style.backgroundColor = "rgb(51, 102, 57)";}
  catch(e){li.querySelector('.save').style.backgroundColor = "rgb(51, 102, 57)";}
  for(var i=0;i<li.querySelectorAll('.comment').length;++i){
    li.querySelectorAll('.comment')[i].style.backgroundColor = "rgb(51, 102, 57,0.8)";
  }
  }
  if(rate == 4){
  li.style.backgroundColor = "rgb(83, 166, 93)";
  li.querySelector('.name').style.backgroundColor = "rgba(45, 89, 50,0.6)";
  li.querySelector('.rating').style.backgroundColor = "rgba(45, 89, 50,0.6)";
  li.querySelector('.delete').style.backgroundColor = "rgba(51, 102, 57,1)";
  try{li.querySelector('.edit').style.backgroundColor = "rgba(51, 102, 57,1)";}
  catch(e){li.querySelector('.save').style.backgroundColor = "rgba(51, 102, 57,1)";}

  for(var i=0;i<li.querySelectorAll('.comment').length;++i){
    li.querySelectorAll('.comment')[i].style.backgroundColor = "rgba(51, 102, 57,0.8)";
  }
  }
  if(rate == 3){
  li.style.backgroundColor = "rgb(83, 166, 93)";
  li.querySelector('.name').style.backgroundColor = "rgba(45, 89, 50,0.2)";
  li.querySelector('.rating').style.backgroundColor = "rgba(45, 89, 50,0.2)";
  li.querySelector('.delete').style.backgroundColor = "rgba(51, 102, 57,1)";
  try{li.querySelector('.edit').style.backgroundColor = "rgba(51, 102, 57,1)";}
  catch(e){li.querySelector('.save').style.backgroundColor = "rgba(51, 102, 57,1)";}

  for(var i=0;i<li.querySelectorAll('.comment').length;++i){
    li.querySelectorAll('.comment')[i].style.backgroundColor = "rgba(51, 102, 57,0.8)";
  }
  }
  if(rate == 1){
  li.style.backgroundColor = "rgba(194, 0, 0,0.7)";
  li.querySelector('.name').style.backgroundColor = "rgba(117, 0, 0,0.8)";
  li.querySelector('.rating').style.backgroundColor = "rgba(117, 0, 0,0.8)";
  li.querySelector('.delete').style.backgroundColor = "rgba(156, 0, 0)";
  try{li.querySelector('.edit').style.backgroundColor = "rgba(156, 0, 0)";}
  catch(e){li.querySelector('.save').style.backgroundColor = "rgba(156, 0, 0)";}

  for(var i=0;i<li.querySelectorAll('.comment').length;++i){
    li.querySelectorAll('.comment')[i].style.backgroundColor = "rgba(156, 0, 0,0.8)";
  }
  }
  if(rate == 2){
  li.style.backgroundColor = "rgba(194, 0, 0,0.7)";
  li.querySelector('.name').style.backgroundColor = "rgba(117, 0, 0,0.5)";
  li.querySelector('.rating').style.backgroundColor = "rgba(117, 0, 0,0.5)";
  li.querySelector('.delete').style.backgroundColor = "rgba(156, 0, 0)";
  try{li.querySelector('.edit').style.backgroundColor = "rgba(156, 0, 0)";}
  catch(e){li.querySelector('.save').style.backgroundColor = "rgba(156, 0, 0)";}

  for(var i=0;i<li.querySelectorAll('.comment').length;++i){
    li.querySelectorAll('.comment')[i].style.backgroundColor = "rgba(156, 0, 0,0.8)";
  }
  }
}

function addToPage(mentee,x){
  no_of_comments = mentee['comment'].length;

  const li = document.createElement('li');
  const name = document.createElement('div');
  const rollno = document.createElement('div');
  const dep = document.createElement('div');
  const rate = document.createElement('div');
  const comment = [];
  for(var i=0;i<no_of_comments;++i)
  {
    comment.push(document.createElement('div'));
  }
  const del = document.createElement('div');
  const span = document.createElement('span');
  const edit = document.createElement('div');

  name.textContent = mentee.name;
  rollno.textContent = mentee.rollno;
  dep.textContent = mentee.dep;
  for(var i=0;i<no_of_comments;++i)
  {
    comment[i].textContent = mentee['comment'][i];
  }

  rate.textContent = mentee.rate;
  del.textContent = "Delete";
  edit.textContent = "Edit";

  name.classList.add('name');
  rollno.classList.add('rollno');
  dep.classList.add('dep');
  rate.classList.add('rating');
  for(var i=0;i<no_of_comments;++i)
  {
    comment[i].classList.add('comment');
  }
  del.classList.add('delete');
  span.classList.add('compress');
  edit.classList.add('edit');

  li.appendChild(del);
  li.appendChild(name);
  li.appendChild(rate);
  span.appendChild(rollno);
  span.appendChild(dep);
  for(var i=0;i<no_of_comments;++i)
  {
    span.appendChild(comment[i]);
  }
  span.appendChild(edit);
  li.appendChild(span);

  if(x==0)
  {
    Color(li,mentee['rate']);
    list.appendChild(li);}
  if(x==1)
  {
    return li.innerHTML;
  }
}

function loadAll(){
  for(var i=0;i<localStorage.length;++i){
    var id = localStorage.key(i);
    addToPage(JSON.parse(localStorage.getItem(id)),0);
  }
}

addMentee.addEventListener('submit',function(e){
   e.preventDefault();
   const details = addMentee.querySelectorAll('input[type="text"]');

   var rating = findRating();
   const comm = [];
   if(details[3].value){
   comm.push(String(details[3].value));}

   //creating json object
   var mentee = {
     "name" : details[0].value,
     "rollno" : details[1].value,
     "rate" : rating,
     "dep" : details[2].value,
     "comment" : comm
   };

   //adding mentee to page
   if(localStorage.getItem(mentee.rollno)==null)
   {addToPage(mentee,0);

   //storing mentee locally
   localStorage.setItem(mentee.rollno,JSON.stringify(mentee));}
});

list.addEventListener('click',function(e){
  //delete a mentee

  if(e.target.className == 'delete'){
    const li = e.target.parentElement;
    rn = li.querySelector('.rollno').textContent;
    localStorage.removeItem(rn);
    li.parentNode.removeChild(li);
  }
  //hide and show MENTEE

  else if(e.target.parentElement.className != 'compress' && !ed){
    const x = e.target.parentElement;
    // console.log(x);
    sp = x.querySelector('.compress');
    // console.log(sp);
    // console.log(sp.style.display);
    if(sp.style.display == 'block')
    {
      sp.style.display = 'none';
      // console.log('yes');
    }
    else{
      sp.style.display = 'block';
    }
  }

  //edit mentee details
  else if(e.target.className == 'edit')
  {
    rollno = e.target.parentElement.querySelector('.rollno').textContent;
    mentee = JSON.parse(localStorage.getItem(rollno));
    editDetails(mentee,e.target.parentElement.parentElement);
  }
}
);


function editDetails(mentee,li){
  ed = true;
  topdiv = li.querySelectorAll('li > div');
  bottomdiv = li.querySelectorAll('span div');
  no_of_comments = mentee['comment'].length;

  const form = document.createElement('form');
  const br = document.createElement('br');
  const Name = document.createElement('input');
  const Roll = document.createElement('input');
  const Dep = document.createElement('input');
  const Comm = [];
  for(var i=0;i<no_of_comments+1;++i)
  {
    Comm.push(document.createElement('input'));
  }

  const Rate = document.createElement('input');

  Name.setAttribute('type','text');
  Roll.setAttribute('type','text');
  Dep.setAttribute('type','text');
  for(var i=0;i<no_of_comments+1;++i)
  {
    Comm[i].setAttribute('type','text');;
  }
  Rate.setAttribute('type','text');

  Name.setAttribute('value',mentee['name']);
  Roll.setAttribute('value',mentee['rollno']);
  Dep.setAttribute('value',mentee['dep']);
  for(var i=0;i<no_of_comments;++i)
  {
    Comm[i].setAttribute('value',mentee['comment'][i]);
  }
  Rate.setAttribute('value',mentee['rate']);

  Name.classList.add('name');
  Roll.classList.add('rollno');
  Dep.classList.add('dep');
  Rate.classList.add('rating');
  for(var i=0;i<no_of_comments+1;++i)
  {
    Comm[i].classList.add('comment');
  }

  const Submit = document.createElement('input');
  Submit.setAttribute('type','submit');
  Submit.setAttribute('value','Save');
  Submit.classList.add('save');

  const wrapper = document.createElement('div');
  const Span = document.createElement('span');
  Span.classList.add('compress');

  Span.appendChild(Roll);
  Span.appendChild(Dep);
  for(var i=0;i<no_of_comments+1;++i)
  {
    Span.appendChild(Comm[i]);
  }
  Span.appendChild(Submit);
  form.appendChild(topdiv[0]);
  form.appendChild(Name);
  form.appendChild(Rate);
  form.appendChild(Span);
  wrapper.appendChild(form);

  li.innerHTML = wrapper.innerHTML;
  // console.log(li);

  const Form = li.querySelector('form');
  Form.querySelector('.compress').style.display = "block";
  Color(li,mentee['rate']);

  Form.addEventListener('submit',function(e){
    e.preventDefault();
    const details = Form.querySelectorAll('input[type="text"]');

    var comm = [];
    for(var i=0;i<no_of_comments+1;++i)
    {
      if(details[4+i].value.length>0){
      comm.push(details[4+i].value);}
    }

    var mentee_edit = {
      "name" : details[0].value,
      "rollno" : details[2].value,
      "rate" : details[1].value,
      "dep" : details[3].value,
      "comment" : comm
    };

    localStorage.removeItem(mentee.rollno);
    localStorage.setItem(mentee_edit.rollno,JSON.stringify(mentee_edit));

    li.innerHTML = addToPage(mentee_edit,1);
    Color(li,mentee_edit['rate']);
    ed = false;
  });
}

const icon = document.querySelector('#add i');
icon.addEventListener('click',function(e){
  if(e.target.textContent == 'add'){
    e.target.textContent = 'remove';
    e.target.parentElement.querySelector('h2').style.display = 'block';
    e.target.parentElement.querySelector('form').style.display = 'block';
//    e.target.parentElement.style.width = '25%';
    document.querySelector('#list').style.float = 'right';
  }
  else{
    e.target.textContent = 'add';
    e.target.parentElement.querySelector('h2').style.display = 'none';
    e.target.parentElement.querySelector('form').style.display = 'none';
//    e.target.parentElement.style.width = '2.2%';
    document.querySelector('#list').style.float = 'left';
  }
});

Sort = document.getElementById('sort');
Sort.addEventListener('click',function(e){
  document.querySelector('ul').innerHTML = '';
  for(var i=5;i>=1;--i){
    for(var j=0;j<localStorage.length;++j){
      var id = localStorage.key(j);
      mentee = JSON.parse(localStorage.getItem(id));
      if(mentee['rate']==i){
        addToPage(mentee,0);
      }
    }
  }
});
stars = document.querySelectorAll('#add_mentee i');
for(var i=0;i<stars.length;++i){
stars[i].addEventListener('click',function(e){

  for(var j=0;j<e.target.getAttribute('name');++j)
  {
    stars[j].style.color = 'yellow';
  }
  for(;j<6;++j)
  {
    stars[j].style.color = 'white';
  }
});}

function findRating(){
    for(var i=0;i<stars.length;++i){
      if(stars[i].style.color == 'white'){
        return i;
      }
    }
    return 5;
}
