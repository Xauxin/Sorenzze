export default function atualizaCabecalhoEPath(caminho, lista, tipo){
    
	while(tipo.firstChild){
		tipo.removeChild(tipo.firstChild);
	}

	const caminhos = [...new Set(lista.map(bordado => bordado[`${caminho}`]))];

	tipo.innerHTML = ' <button class="btn__quadrado" id="btn-home" value="home"><i  value="home" class="fa-solid fa-house"></i></button>';

	if(caminhos != '' && caminhos != '-'){
		for (let i = 0; i < caminhos.length; i++) {
			const caminhoFormatado = caminhos[i].split('/');
			let button = document.createElement('button');
			button.innerHTML = caminhoFormatado[0];
			button.classList.add('btn_filtro');
			button.setAttribute('value', caminhos[i]);
			button.setAttribute('title', caminhoFormatado[0]);
			tipo.appendChild(button);
		}
	}

	let button = document.createElement('button');
	button.classList.add('btn__quadrado');
	button.setAttribute('id', 'btnX');
	button.setAttribute('value', 'btnX');
	button.innerHTML = '<i class="fa-solid fa-x" value="btnX"></i>';
	tipo.appendChild(button);

}