import sum from'./sum';import $ from'jquery';import'bootstrap';import'./main.scss';import pic from'./images/beach.jpg';console.log('hallo world');var a=()=>{console.log('hallo from es6')};console.log(sum(1,3));const foo=function(a){console.log('minify me:'+a)};$(()=>{console.log('jquery is ready'),$('body').append(`
		<div class="profile"> 
			<img src="${pic}">
			<h1>Hallo World</h1>
		</div>
		<div id="root"></div>
 `),$('#root').append('<h2>How are you doing?</h2>'),$('#root').append('<button type="button" class="btn btn-primary">Primary</button>')});