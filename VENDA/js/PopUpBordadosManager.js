import aplicaBordado from './PopUpBordados/aplicaBordados.js';
import ListagemDeBordado from './PopUpBordados/ListagemDeBordados.js';
import restauraHome from './PopUpBordados/restauraHome.js';
import selecionaBordado from './PopUpBordados/selecionaBordado.js';


export default class PopUpBordadosManager {
	constructor(){
		//listagem de bordado//
		this.Listagem = new ListagemDeBordado();
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
				this.Listagem.listaTodosBordado();
			}else if(event.target.value === 'pesquisa' || event.target.parentElement.value === 'pesquisa'){
				if(event.target.value === 'pesquisa'){
					this.Listagem.filtraPorTexto(event.target.parentElement.firstElementChild);
				}else{
					this.Listagem.filtraPorTexto(event.target.parentElement.parentElement.firstElementChild);
				}
			}else if(event.target.classList.contains('btn_filtro')){
				this.Listagem.filtrarPorBotao(event.target);
			}
		});
		//botão adicionar o bordado selecionado no item da venda//
		this.btnSelec = document.getElementById('btn-info');
		this.btnSelec.addEventListener('click', ()=>{
			aplicaBordado(this.acessouPelo);
			restauraHome(this.listaBordado, this.path, this.cabecalho);
			this.Listagem.listaTodosBordado();
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
		this.Listagem.listaTodosBordado();
	}

	
	abreJanelaAddBordado(){
		this.popUpBordados.style.display = 'none';
		this.popUpAddBordado.style.display = 'block';
	}

	fechaAddBordado(){
		this.popUpBordados.style.display = 'grid';
		this.popUpAddBordado.style.display = 'none';
	}
}




