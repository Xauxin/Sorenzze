export default class PopUpMedidasManager{
	constructor(){
		//tela preta fundo//
		this.overlay = document.getElementById('overlay');
		//popUp de edição de medidas do item da Venda//
		this.popUpMedidas = document.getElementById('medidas-overlay');
		//botão para abrir a edição de Medidas do item da venda//
		this.botaoAbrirMedidas = document.getElementById('botao-medidas');
		this.botaoAbrirMedidas.addEventListener('click', this.mostraPopUpMedidas.bind(this));
		//botão para fechar a edição de Medidas do item da venda//
		this.botaoFecharMedidas = document.getElementById('popup-close');
		this.botaoFecharMedidas.addEventListener('click', this.escondePopUpMedidas.bind(this));
		//cabecalho do popUp de Medidas//
		this.cabecalho = document.getElementById('cabecalho-medida');
		//botões do cabecalho do popUp de Medidas//
		this.cabecalho.addEventListener('click', (event)=>{
			if(event.target.classList.contains('add_cabecalho') || event.target.parentElement.classList.contains('add_cabecalho')){
				if(this.coluna1.childElementCount === this.coluna2.childElementCount){
					this.criaCatMedidas(this.coluna1);
				}else{
					this.criaCatMedidas(this.coluna2);
				}
			}else if(event.target.classList.contains('anot_cabecalho') || event.target.parentElement.classList.contains('anot_cabecalho')){
				this.mostraEEscondeQuadro();
			}
		});
		//botão de aplicar as medidas no item da Venda//
		this.botaoApp = document.getElementById('btn-app');
		this.botaoApp.addEventListener('click', ()=>{
			this.aplicaMedidas();
		});
		//colunas para funções do popUp de Medidas//
		this.coluna2 = document.getElementById('coluna2');
		this.coluna1 = document.getElementById('coluna1');
		this.quadroAnot = document.getElementById('quadro-anot');
		this.listaMed = document.getElementById('tabela-medidas');

		

	}
	mostraPopUpMedidas () {
		this.overlay.style.display = 'block';
		this.popUpMedidas.style.display = 'grid';
	}

	escondePopUpMedidas () {
		this.overlay.style.display = 'none';
		this.popUpMedidas.style.display = 'none';
	}

    
	aplicaMedidas () {
		const lista0 = this.coluna1.querySelectorAll('div');
		const lista1 = this.coluna2.querySelectorAll('div');
		const lista = [...lista0, ...lista1];
		const listaFilt = {};
		for (let i = 0; i < lista.length; i++) {
			if (lista[i].lastElementChild.value !== ''){
				var cat = lista[i].children[0].innerHTML;
				var input = lista[i].children[1].value;
				listaFilt[`${cat}`] = input;
			}
		}
    
		while (this.listaMed.childElementCount > 1){
			this.listaMed.lastChild.remove();
		}
    
		for (let i = 0; i < Object.keys(listaFilt).length ; i++) {
			const linha = document.createElement('tr');
			const celula = document.createElement('td');
			const valor = document.createElement('span');
			valor.innerHTML = `${listaFilt[Object.keys(listaFilt)[i]]}`;
			celula.innerHTML = (Object.keys(listaFilt)[i]);
			if (i <= 6){
				celula.appendChild(valor);
				linha.appendChild(celula);
				this.listaMed.appendChild(linha);     
			}else if (i > 6 & i < 14){
				celula.appendChild(valor);
				this.listaMed.children[i-6].appendChild(celula);
			}else {
				celula.appendChild(valor);
				linha.appendChild(celula);
				this.listaMed.appendChild(linha); 
			}
		}
    
		if (this.quadroAnot.lastElementChild.value != ''){
			const texto = document.createElement('textarea');
			texto.disabled = true;
			texto.style.resize = 'none';
			const linha = document.createElement('tr');
			texto.value = this.quadroAnot.lastElementChild.value;
			linha.appendChild(texto);
			this.listaMed.appendChild(linha);
		}
        
	}

	criaCatMedidas (coluna) {
		var categoria = document.createElement('div');
		var input = document.createElement('input');
		input.style.width = '100%';
		categoria.appendChild(input);
		coluna.appendChild(categoria);
		input.focus();
		input.addEventListener('focusout', (event)=>{
			this.formataCatMedidas(event, input);});
	}

	formataCatMedidas (event, elemento) {
		var cat = elemento.value;
		if (cat !== ''){
			var div = event.target.parentElement;
			event.target.remove();
			var label = document.createElement('label');
			label.innerHTML = cat;
			label.setAttribute('for', `popup-${cat}`);
			var input = document.createElement('input');
			input.setAttribute('id', `popup-${cat}`);
			div.appendChild(label);
			div.appendChild(input);
		}else{
			event.target.parentElement.remove();
		}
	}

	mostraEEscondeQuadro () {
		if(this.quadroAnot.style.display != 'block'){
			this.quadroAnot.style.display = 'block';
		} else{
			this.quadroAnot.style.display = 'none';
		}
	}
}

