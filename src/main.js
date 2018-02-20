//import 'webpack-hot-middleware/client';
//import './index.html';
import sum from './sum';
import $ from 'jquery';
import 'bootstrap';
import './main.scss';
import pic from './images/beach.jpg';
import tpl from './template.html';

console.log('hallo world');
var a = () => {
	console.log('hallo from es6');
}

console.log(sum(1, 3));

const foo = function(param1, param2) {
		console.log('minify me:' + param1);
}

$(() => {
	console.log('jquery is ready');

 $('body').append(`
		<div class="profile"> 
			<img src="${pic}">
			<h1>Hallo World</h1>
		</div>
		<div id="root"></div>
 `);

 $('#root').append(tpl);

	$('#root').append('<h2>How are you doing?</h2>');
	$('#root').append('<button type="button" class="btn btn-primary">Primary</button>');
});