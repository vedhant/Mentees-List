
const addMentee = document.forms['add_mentee'];
const list = document.querySelector('#list ul');

loadAll();

function Color(li,rate){
  if(rate == 5){
  li.style.backgroundColor = "rgb(83, 166, 93)";
  li.querySelector('.name').style.backgroundColor = "rgb(45, 89, 50)";
  li.querySelector('.rating').style.backgroundColor = "rgb(45, 89, 50)";
  li.querySelector('.delete').style.backgroundColor = "rgb(51, 102, 57)";
  li.querySelector('.edit').style.backgroundColor = "rgb(51, 102, 57)";}
  if(rate == 4){
  li.style.backgroundColor = "rgb(83, 166, 93)";
  li.querySelector('.name').style.backgroundColor = "rgba(45, 89, 50,0.6)";
  li.querySelector('.rating').style.backgroundColor = "rgba(45, 89, 50,0.6)";
  li.querySelector('.delete').style.backgroundColor = "rgba(51, 102, 57,1)";
  li.querySelector('.edit').style.backgroundColor = "rgba(51, 102, 57,1)";}
  if(rate == 3){
  li.style.backgroundColor = "rgb(83, 166, 93)";
  li.querySelector('.name').style.backgroundColor = "rgba(45, 89, 50,0.2)";
  li.querySelector('.rating').style.backgroundColor = "rgba(45, 89, 50,0.2)";
  li.querySelector('.delete').style.backgroundColor = "rgba(51, 102, 57,1)";
  li.querySelector('.edit').style.backgroundColor = "rgba(51, 102, 57,1)";}
  if(rate == 1){
  li.style.backgroundColor = "rgba(194, 0, 0,0.7)";
  li.querySelector('.name').style.backgroundColor = "rgba(117, 0, 0,0.8)";
  li.querySelector('.rating').style.backgroundColor = "rgba(117, 0, 0,0.8)";
  li.querySelector('.delete').style.backgroundColor = "rgba(156, 0, 0)";
  li.querySelector('.edit').style.backgroundColor = "rgba(156, 0, 0)";}
  if(rate == 2){
  li.style.backgroundColor = "rgba(194, 0, 0,0.7)";
  li.querySelector('.name').style.backgroundColor = "rgba(117, 0, 0,0.5)";
  li.querySelector('.rating').style.backgroundColor = "rgba(117, 0, 0,0.5)";
  li.querySelector('.delete').style.backgroundColor = "rgba(156, 0, 0)";
  li.querySelector('.edit').style.backgroundColor = "rgba(156, 0, 0)";}
}

function addToPage(mentee,x){
  const li = document.createElement('li');
  const name = document.createElement('div');
  const rollno = document.createElement('div');
  const dep = document.createElement('div');
  const rate = document.createElement('div');
  const comment = document.createElement('div');
  const del = document.createElement('div');
  const span = document.createElement('span');
  const edit = document.createElement('div');

  name.textContent = mentee.name;
  rollno.textContent = mentee.rollno;
  dep.textContent = mentee.dep;
  comment.textContent = mentee.comment;
  rate.textContent = mentee.rate;
  del.textContent = "Delete";
  edit.textContent = "Edit";

  name.classList.add('name');
  rollno.classList.add('rollno');
  dep.classList.add('dep');
  rate.classList.add('rating');
  comment.classList.add('comment');
  del.classList.add('delete');
  span.classList.add('compress');
  edit.classList.add('edit');

  li.appendChild(del);
  li.appendChild(name);
  li.appendChild(rate);
  span.appendChild(rollno);
  span.appendChild(dep);
  span.appendChild(comment);
  span.appendChild(edit);
  li.appendChild(span);
  if(x==0)
  { Color(li,mentee['rate']);
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

   const rating_radio = addMentee.querySelectorAll('input[type="radio"]');
   var rating = 0;
   for(var i=0;i<rating_radio.length;++i)
   {
     if(rating_radio[i].checked)
     {
       rating = i+1;
     }
   }

   //creating json object
   var mentee = {
     "name" : details[0].value,
     "rollno" : details[1].value,
     "rate" : rating,
     "dep" : details[2].value,
     "comment" : details[3].value
   };

   //adding mentee to page
   if(localStorage.getItem(mentee.rollno)==null)
   {addToPage(mentee,0);}

   //storing mentee locally
   localStorage.setItem(mentee.rollno,JSON.stringify(mentee));
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

  else if(e.target.parentElement.className != 'compress'){
    // console.log('clicked');
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
  topdiv = li.querySelectorAll('li > div');
  bottomdiv = li.querySelectorAll('span div');

  const form = document.createElement('form');
  const br = document.createElement('br');
  const Name = document.createElement('input');
  const Roll = document.createElement('input');
  const Dep = document.createElement('input');
  const Comm = document.createElement('input');
  const Rate = document.createElement('input');

  Name.setAttribute('type','text');
  Roll.setAttribute('type','text');
  Dep.setAttribute('type','text');
  Comm.setAttribute('type','text');
  Rate.setAttribute('type','text');

  Name.setAttribute('value',mentee['name']);
  Roll.setAttribute('value',mentee['rollno']);
  Dep.setAttribute('value',mentee['dep']);
  Comm.setAttribute('value',mentee['comment']);
  Rate.setAttribute('value',mentee['rate']);

  Name.classList.add('name');
  Roll.classList.add('rollno');
  Dep.classList.add('dep');
  Rate.classList.add('rating');
  Comm.classList.add('comment');

  const Submit = document.createElement('input');
  Submit.setAttribute('type','submit');
  Submit.setAttribute('value','Save');
  Submit.classList.add('save');

  const wrapper = document.createElement('div');
  const Span = document.createElement('span');
  Span.classList.add('compress');

  Span.appendChild(Roll);
  Span.appendChild(Dep);
  Span.appendChild(Comm);
  Span.appendChild(Submit);
  form.appendChild(topdiv[0]);
  form.appendChild(Name);
  form.appendChild(Rate);
  form.appendChild(Span);
  wrapper.appendChild(form);

  li.innerHTML = wrapper.innerHTML;
  console.log(li);
  Color(li,mentee['rating']);
  const Form = li.querySelector('form');
  Form.addEventListener('submit',function(e){
    e.preventDefault();
    const details = Form.querySelectorAll('input[type="text"]');
    var mentee_edit = {
      "name" : details[0].value,
      "rollno" : details[2].value,
      "rate" : details[1].value,
      "dep" : details[3].value,
      "comment" : details[4].value
    };

    localStorage.removeItem(mentee.rollno);
    localStorage.setItem(mentee_edit.rollno,JSON.stringify(mentee_edit));

    li.innerHTML = addToPage(mentee_edit,1);
    Color(li,mentee_edit['rate']);

  });
}

const icon = document.querySelector('#add i');
icon.addEventListener('click',function(e){
  if(e.target.textContent == 'add'){
    e.target.textContent = 'remove';
    e.target.parentElement.querySelector('h2').style.display = 'block';
    e.target.parentElement.querySelector('form').style.display = 'block';
    e.target.parentElement.style.width = '25%';
    document.querySelector('#list').style.float = 'right';
  }
  else{
    e.target.textContent = 'add';
    e.target.parentElement.querySelector('h2').style.display = 'none';
    e.target.parentElement.querySelector('form').style.display = 'none';
    e.target.parentElement.style.width = '2.2%';
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
