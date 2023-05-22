import ConectaApi from '../ConectaApi.js';
const conectaApi = new ConectaApi();
const divBordadoSelecionado = document.getElementById('bordado-selecionado');

export default async function selecionaBordado (elemento) {
	const codigoBordado = elemento.lastElementChild.innerHTML;
	const bordadoSelecionado = await conectaApi.pegaBordadoPorCodigo(codigoBordado);
	divBordadoSelecionado.innerHTML=`
        <div class="bordado_Selecionado">
        <div>
            <img id="img-bordadoSel" src="${bordadoSelecionado[0].imagem}" alt="">
        </div>    
        <p class="nome_bordadoSel" >${bordadoSelecionado[0].nome}</p>
        <p class="codigo_bordadoSel" id="codigo-bordadoSel">
            <span>
                Código:
            </span> 
                ${bordadoSelecionado[0].codigo}
        </p>
        <p class="preco_bordadoSel">
            <span>
                Preço:
            </span> 
                ${bordadoSelecionado[0].preco}
        </p>
        </div>
        `;         
}