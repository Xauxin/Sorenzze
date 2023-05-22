export default function constroiImg (url, cod){
	const img = document.createElement('img');
	const div = document.createElement('div');
	const p = document.createElement('p');
	p.classList.add('codigo_img');
	p.innerHTML = cod;
	img.src = url;
	img.classList.add('img_bordado');
	div.classList.add('div_lista');
	div.appendChild(img);
	div.appendChild(p);
	return div;
}
    
