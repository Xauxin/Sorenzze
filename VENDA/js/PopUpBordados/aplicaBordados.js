export default function aplicaBordado(elemento){
	const codigoPedido = document.getElementById(`td${elemento}-cod`); 
	const codigoSel = document.getElementById('codigo-bordadoSel').innerHTML; 
	const codigoFormatado = codigoSel.split(':'); 
	const imgSel = document.getElementById('img-bordadoSel').src; 
	const imgPedido = document.getElementById(`td${elemento}-img`).firstElementChild; 
	codigoPedido.innerHTML = codigoFormatado[1]; 
	imgPedido.src = imgSel; 
}