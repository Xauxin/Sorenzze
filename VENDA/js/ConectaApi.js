class ConectaApi{

	async PegaTodosBordados () {
		const conexao = await fetch('http://localhost:3001/bordados');
		const conexaoConvertida = await conexao.json();
		return conexaoConvertida;
	}

	async  PegaBordadosComFiltros (filtro1, filtro2 = '') {
		if(filtro2 === ''){
			const conexao = await fetch(`http://localhost:3001/bordados?q=${filtro1}`);
			const conexaoConvertida = await conexao.json();
			return conexaoConvertida;
		}else{
			const conexao = await fetch(`http://localhost:3001/bordados?q=${filtro1}/${filtro2}`);
			const conexaoConvertida = await conexao.json();
			return conexaoConvertida;
		}
    
	}
    
	async  pegaBordadoPorCodigo (filtro) {
		const conexao = await fetch(`http://localhost:3001/bordados?codigo=${filtro}`);
		const conexaoConvertida = await conexao.json();
		return conexaoConvertida;
	}
    

}

export default ConectaApi;