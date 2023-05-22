export default function restauraHome (lista, path, cabecalho) {
	while(lista.firstElementChild){
		lista.removeChild(lista.firstElementChild);
	}

	path.innerHTML = 'Bordados';

	cabecalho.innerHTML = `   
                <button class="btn__quadrado" id="btn-home" value="home"><i  value="home" class="fa-solid fa-house"></i></button>
                <button class="btn_filtro" id="btn-brasao" value="Brasão" title="Brasões">Brasões</button>
                <button class="btn_filtro" id="btn-logo " value="Logo" title="Logos">Logos</button>
                <button class="btn_filtro" id="btn-escrita" value="Escritas" title="Escrita">Escritas</button>
                <button class="btn_filtro" id="btn-outros" value="Outros" title="Outros">Outros</button>
                <div id="div-pesquisa" class="pesquisa_cabecalho">
                    <input type="text" name="pesquisa" id="pesquisa" class="input_pesquisa">
                    <button class="btn_pesquisa" value="pesquisa" id="btn__pesquisa"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button class="btnX btn__quadrado" id="btnX" value="btnX"><i class="fa-solid fa-x" id="btnX"></i></button>
`;
}