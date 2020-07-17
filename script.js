function createDiv(n){
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  for(let i=0;i<n*n;i++){
      const div = document.createElement('div');
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


function changeSize(){
  const size = Number(resolution.value);
  const instruction = document.querySelector('input + p');
  const prevContainer = document.querySelector('.container');
  const prevPixels = document.querySelectorAll('.container div');

  if(Number.isInteger(size)){
    if(0<size && size<=100){
      prevContainer.remove();
      prevPixels.forEach(pixel => pixel.remove());
      createDiv(size);
        
      }
      instruction.textContent = "";
    }else if(size>100){
      instruction.textContent = "Try a smaller number";
  }else instruction.textContent = "Enter a valid number"

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

function changeBackground(e){
  const color = document.querySelector('[name="color"]').value;
  this.style.backgroundColor = color;
}

const reset = document.querySelector('button[name="reset"');
reset.addEventListener('click', resetCanvas);




function resetCanvas(){
  const pixels = document.querySelectorAll('.container div');
  pixels.forEach(pixel => pixel.style.backgroundColor="")
}