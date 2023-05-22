import ConectaApi from './ConectaApi.js';
import aplicaBordado from './PopUpBordados/aplicaBordados.js';
import constroiImg from './PopUpBordados/constroiImg.js';
import restauraHome from './PopUpBordados/restauraHome.js';
import selecionaBordado from './PopUpBordados/selecionaBordado.js';


export default class PopUpBordadosManager {
	constructor(){
		//conexão com a Api/DB//
		this.conectaApi = new ConectaApi();
		//tela preta fundo//
		this.overlay = document.getElementById('overlay');
		//popUp de edição de boraddos do item da Venda//
		this.popUpBordados = document.getElementById('bordados-overlay');
		//botão para abrir a edição de bordados do item da venda//
		this.botaoAbrirBordados = document.getElementById('mangas-bordado');
		this.botaoAbrirBordados.addEventListener('click', (event)=>{
			if(event.target.classList.contains('edit_mangas') || event.target.parentElement.classList.contains('edit_mangas')){
				if(event.target.classList.contains('edit_mangas')){
					this.mostraPopUpBordados(event.target.value);
				} else {
					this.mostraPopUpBordados(event.target.parentElement.value);
				}
			}});
		//botão para fechar a edição de bordados do item da venda//
		this.botaoFecharBordado = document.getElementById('cabecalho-bordados');
		this.botaoFecharBordado.addEventListener('click', (event)=>{
			if(event.target.value === 'btnX' || event.target.parentElement.value === 'btnX')
				this.escondePopUpBordados();});
		//popUp para adicionar bordado no banco de dados//	
		this.popUpAddBordado = document.getElementById('addbor-overlay');
		//botao para Abrir o popUp de adcionar bordado//
		this.botaoAbrirAddBordado = document.getElementById('btnadd');
		this.botaoAbrirAddBordado.addEventListener('click', this.abreJanelaAddBordado.bind(this));
		//botao para fechar o popUp de adcionar bordado//
		this.closeAddBordado = document.getElementById('close-addbor');
		this.closeAddBordado.addEventListener('click', this.fechaAddBordado.bind(this));
		//cabeçalho do popUp de Bordados//
		this.cabecalho = document.getElementById('cabecalho-bordados');
		//botoes do cabeçalho do popUp de Bordados//
		this.cabecalho.addEventListener('click', async (event)=>{
			if(event.target.parentElement.value === 'home'|| event.target.value === 'home'){
				restauraHome(this.listaBordado, this.path, this.cabecalho);
				this.listaTodosBordado();
			}else if(event.target.value === 'pesquisa' || event.target.parentElement.value === 'pesquisa'){
				if(event.target.value === 'pesquisa'){
					this.filtraPorTexto(event.target.parentElement.firstElementChild);
				}else{
					this.filtraPorTexto(event.target.parentElement.parentElement.firstElementChild);
				}
			}else if(event.target.classList.contains('btn_filtro')){
				this.filtrarPorBotao(event.target);
			}
		});
		//botão adicionar o bordado selecionado no item da venda//
		this.btnSelec = document.getElementById('btn-info');
		this.btnSelec.addEventListener('click', ()=>{
			aplicaBordado(this.acessouPelo);
			restauraHome(this.listaBordado, this.path, this.cabecalho);
			this.listaTodosBordado();
			this.escondePopUpBordados();
		});
		//lista de bordados//
		this.listaBordado = document.getElementById('lista-bordados');
		//evento click nos bordados para selecionados//
		this.listaBordado.addEventListener('click', async (evento) =>{
			if(evento.target.parentElement.classList.contains('div_lista') || evento.target.classList.contains('div_lista')){
				if(evento.target.classList.contains('div_lista')){         
					await selecionaBordado(evento.target); 
				}else if (evento.target.parentElement.classList.contains('div_lista')){
					await selecionaBordado(evento.target.parentElement);
				}
			}
		});
		this.path = document.getElementById('path-bordados');
	}

	mostraPopUpBordados (elemento) {
		this.acessouPelo = elemento;
		console.log(this.acessouPelo);
		this.overlay.style.display = 'block';
		this.popUpBordados.style.display = 'grid';
	}

	escondePopUpBordados () {
		this.overlay.style.display = 'none';
		this.popUpBordados.style.display = 'none';
		restauraHome();
		this.listaTodosBordado();
	}

	
	abreJanelaAddBordado(){
		this.popUpBordados.style.display = 'none';
		this.popUpAddBordado.style.display = 'block';
	}

	fechaAddBordado(){
		this.popUpBordados.style.display = 'grid';
		this.popUpAddBordado.style.display = 'none';
	}



	async listaTodosBordado(){
		try {
			const listaApi = await this.conectaApi.PegaTodosBordados();
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		} catch (error) {
			this.listaBordado.innerHTML= '<h2 class="mensagem__titulo">Não foi possivel carregar a lista de bordados</h2>';
		}
	}
    
    
	

	

	async filtraPorTexto(elemento){
		while(this.listaBordado.firstChild){
			this.listaBordado.removeChild(this.listaBordado.firstChild);
		}
		const filtro = elemento.value;
		const listaApi = await this.conectaApi.PegaBordadosComFiltros(filtro);
		if(listaApi.length !== 0){
			this.listaBordado.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr) )';
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		}else{
			this.filtroPorTextoNaoAchou(filtro);
		}

	}


	async filtrarPorBotao (elemento){
		this.listaBordado.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr) )';
		while(this.listaBordado.firstChild){
			this.listaBordado.removeChild(this.listaBordado.firstChild);
		}
    
		var listaApi = {};
		this.path.innerHTML = `${this.path.innerHTML}/${elemento.title}`;
		const pathSeparado = this.path.innerHTML.split('/');
    
		if(elemento.value === 'Liga/01' ||elemento.value === 'Turma/02' ||elemento.value === 'Curso/03'){
			listaApi = await this.conectaApi.PegaBordadosComFiltros(pathSeparado[pathSeparado.length-2], elemento.innerHTML);
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		}else{
			listaApi = await this.conectaApi.PegaBordadosComFiltros(elemento.value);
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		}
        
		if(this.path.innerHTML.split('/').length === 2){
			this.AtualizaCabecalhoEPath('nucleo', listaApi, this.cabecalho);
		}else if (this.path.innerHTML.split('/').length === 3){
			this.AtualizaCabecalhoEPath('particao', listaApi, this.cabecalho);
		}else{
			this.AtualizaCabecalhoEPath('', listaApi, this.cabecalho);
		}
    
	}

	AtualizaCabecalhoEPath(caminho, lista, tipo){
    
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



	filtroPorTextoNaoAchou(filtro){
		this.listaBordado.style.gridTemplateColumns = '1fr';
		const texto = document.createElement('h2');       
		texto.innerHTML= `Nenhum bordado no banco com o termo: <br> <span>${filtro}</span> `;
		texto.classList.add('texto_error');
		this.listaBordado.appendChild(texto);
	}


}




