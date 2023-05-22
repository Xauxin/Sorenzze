import ConectaApi from '../ConectaApi.js';
import atualizaCabecalhoEPath from './atualizaCabecalhoEPath.js';
import constroiImg from './constroiImg.js';

class ListagemDeBordado extends ConectaApi{
	constructor(){
		super();
		this.listaBordado = document.getElementById('lista-bordados');
		this.path = document.getElementById('path-bordados');
		this.cabecalho = document.getElementById('cabecalho-bordados');
	}
	
    
	async listaTodosBordado(){
		try {
			const listaApi = await this.PegaTodosBordados();
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		} catch (error) {
			console.log(error);
			this.listaBordado.innerHTML= '<h2 class="mensagem__titulo">Não foi possivel carregar a lista de bordados</h2>';
		}
	}

	async filtraPorTexto(elemento){
		while(this.listaBordado.firstChild){
			this.listaBordado.removeChild(this.listaBordado.firstChild);
		}
		const filtro = elemento.value;
		const listaApi = await this.PegaBordadosComFiltros(filtro);
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
			listaApi = await this.PegaBordadosComFiltros(pathSeparado[pathSeparado.length-2], elemento.innerHTML);
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		}else{
			listaApi = await this.PegaBordadosComFiltros(elemento.value);
			await listaApi.forEach(elemento => this.listaBordado.appendChild(constroiImg(elemento.imagem, elemento.codigo)));
		}
        
		if(this.path.innerHTML.split('/').length === 2){
			atualizaCabecalhoEPath('nucleo', listaApi, this.cabecalho);
		}else if (this.path.innerHTML.split('/').length === 3){
			atualizaCabecalhoEPath('particao', listaApi, this.cabecalho);
		}else{
			atualizaCabecalhoEPath('', listaApi, this.cabecalho);
		}
    
	}

	
	filtroPorTextoNaoAchou(filtro){
		this.listaBordado.style.gridTemplateColumns = '1fr';
		const texto = document.createElement('h2');       
		texto.innerHTML= `Nenhum bordado no banco com o termo: <br> <span>${filtro}</span> `;
		texto.classList.add('texto_error');
		this.listaBordado.appendChild(texto);
	}
    
}

export default ListagemDeBordado;