document.addEventListener("DOMContentLoaded", () => {
  const fallText = document.querySelector(".fall-text");
  const text = fallText.textContent;
  fallText.textContent = "";

  [...text].forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${i * 0.05}s`; // atraso entre as letras
    fallText.appendChild(span);
  });
});

 document.querySelector("input").onclick = ()=>{ 
  document.body.classList.toggle('dark');
  textContent = document.body.classList.contains('dark')
};



function num_telefone() {

  var tel = document.getElementById("tel").value
  console.log(tel)
  tel = tel.slice(0, 14)
  console.log(tel)
  document.getElementById("tel").value = tel
  tel = document.getElementById("tel").value.slice(0, 10)
  console.log(tel)


  var tel_formatado = document.getElementById("tel").value
  if (tel_formatado[0] != "(") {
      if (tel_formatado[0] != undefined) {
          document.getElementById("tel").value = "(" + tel_formatado[0];
      }
  }

  if (tel_formatado[3] != ")") {
      if (tel_formatado[3] != undefined) {
          document.getElementById("tel").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3]
      }
  }

  if (tel_formatado[9] != "-") {
      if (tel_formatado[9] != undefined) {
          document.getElementById("tel").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9]
      }
  }
}

// Aplicar máscaras automaticamente
document.getElementById('telefone').addEventListener('input', e => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});



let btn = document.getElementById("btn")
let modal = document.getElementById("modal")
let fechar = document.getElementById("fechar")

btn.addEventListener('click',()=>{
  modal.showModal()
})

fechar.addEventListener('click',()=>{
  modal.close()
})

