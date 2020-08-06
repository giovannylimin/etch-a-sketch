const nest = document.querySelector('.nest');
function createDiv(n){
  const container = document.createElement('div');
  container.classList.add('container');
  nest.appendChild(container);

  for(let i=0;i<n*n;i++){
      const div = document.createElement('div');
      div.dataset.times = "0";
      container.appendChild(div);
    }
    //const width = (1/n)*100 + '% '

  container.style.gridTemplateColumns += `repeat(${n}, auto`;
  container.style.gridTemplateRows += `repeat(${n}, auto`;

  const pixels = container.querySelectorAll('div');

  const method = document.querySelector('[name="mode"]');
  let mode = method.value;
  listenValue()
  method.addEventListener('change', listenValue);

  function listenValue(){
    mode = method.value;
    console.log(mode);
    if (mode === "hover"){
    pixels.forEach(pixel=>pixel.addEventListener('mouseenter',changeBackground));
  } else if(mode=== "press"){
    handleUp();
    pixels.forEach(pixel => pixel.addEventListener('mousedown',handlePress));
    pixels.forEach(pixel=>pixel.addEventListener('mouseup', handleUp));
  }
}
}

createDiv(16);

const resolution = document.querySelector('input[name="size"');
resolution.addEventListener('keyup', changeSize);
resolution.addEventListener('change', changeSize);



function changeSize(){
  const size = Number(resolution.value);
  const instruction = document.querySelector('input + p');
  const prevContainer = document.querySelector('.container');
  const prevPixels = document.querySelectorAll('.container div');

    if(0<size && size<=100){
      prevContainer.remove();
      prevPixels.forEach(pixel => pixel.remove());
      createDiv(size);
      instruction.textContent = "";
      }else if(size>50){
        instruction.innerHTML = "Try a smaller number <br> (1-50)";
    }else instruction.innerHTML = "Enter a valid number <br> (1-50)"

}






function handlePress(){
  const pixels = document.querySelectorAll('.container div');
  pixels.forEach(pixel=>pixel.addEventListener('click',changeBackground));
  pixels.forEach(pixel=>pixel.addEventListener('mouseenter', changeBackground));
}

function handleUp(){
  const pixels = document.querySelectorAll('.container div');
  pixels.forEach(pixel=>pixel.removeEventListener('mouseenter', changeBackground));
}

const random = document.querySelector('[name="random"]')

function changeBackground(e){
  let time = Number(this.dataset.times)
  if(random.checked){
    if(time === 0){
    this.dataset.times = time+1;
    let red = Math.round(Math.random()*255);
    let blue = Math.round(Math.random()*255);
    let green = Math.round(Math.random()*255);

    this.style.backgroundColor = `rgb(${red},${green},${blue})`;
    this.dataset.red = red;
    this.dataset.green = green;
    this.dataset.blue = blue;

    }else if(time <= 10){
      let red = this.dataset.red - (time / 10)*this.dataset.red;
      let green = this.dataset.green - (time / 10)*this.dataset.green;
      let blue = this.dataset.blue - (time / 10)*this.dataset.blue;
      this.style.backgroundColor = `rgb(${red},${green},${blue})`;
      this.dataset.times = time+1;
    }

  }else{
    const color = document.querySelector('[name="color"]').value;
    this.style.backgroundColor = color;
  
  }
}

const reset = document.querySelector('button[name="reset"');
reset.addEventListener('click', resetCanvas);


function resetCanvas(){
  const pixels = document.querySelectorAll('.container div');
  pixels.forEach(pixel => pixel.style.backgroundColor="")
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', shrink);
  button.addEventListener('transitionend', revert)
});

function shrink(e){
  this.classList.add('shrink');
}

function revert(e){
  this.classList.remove('shrink');
}

const main = document.querySelector('main');
main.classList.add('disappear', 'none');

const start = document.querySelector('[name="start"');
start.addEventListener('click', changeLayout);

const title = document.querySelector('header');


function changeLayout(){
  title.classList.add('disappear');
  setTimeout(function(){
  title.classList.add('none')
  main.classList.remove('none', 'disappear');
  },500)  

}


random.addEventListener('change', () => random.checked ? random.classList.add('checked') : random.classList.remove('checked'))

const menu = document.querySelector('section');
const settings = document.querySelector('[name="option"]');
menu.classList.add('disappear', 'none');

settings.addEventListener('click', openMenu);

function openMenu(){
  settings.classList.add('disappear');
  menu.classList.remove('none');
  setTimeout(()=>{
    menu.classList.remove('disappear');
    menu.classList.add('moveIn');
  }, 200);
}

const exit = menu.querySelector('[name="exit"]');

exit.addEventListener('click',closeMenu);

function closeMenu(){
  menu.classList.remove('moveIn');
  menu.classList.add('disappear');
  setTimeout(()=>{
    settings.classList.remove('disappear');
    menu.classList.add('none');
  }, 200);

}