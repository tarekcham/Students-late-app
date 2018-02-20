//import 'webpack-hot-middleware/client';
//import './index.html';
import $ from 'jquery';
import 'bootstrap';
import './main.scss';
import pic from './images/beach.jpg';
import tpl from './template.html';
import app from './app.html';
import login from './login.html';
import moment from 'moment';

$(() => {
	console.log('jquery is ready');

	let loggedIn = localStorage.getItem('loggedIn');
	if(loggedIn == 1) {
		buildApp();
	}
	else {
		buildLogin();
	}
});

function buildApp() {
	$('body').empty();
	$('body').append(app);

	$('#link-logout').on('click', (e) => {		
		$.ajax({
			url: '/logout',
			method: 'POST',
			contentType: 'application/json'
		})
		.done(function(data) {
			console.log('success', data);

			if(data.err == 0) {
				localStorage.setItem('loggedIn', 0);
				buildLogin();
			}
		})
		.fail(function(xhr) {
			console.log('error', xhr);
		});
				
	});

	let now = new Date();
	let dd = now.getDate();
	let mm = now.getMonth() + 1;

	let yyyy = now.getFullYear();
	if(dd < 10) {
		dd = '0' + dd;
	}
	if(mm < 10) {
		mm = '0' + mm;
	}

	let strNow = dd + '/' + mm + '/' + yyyy;
	let strTime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
	
	$('.container').append(`
		<form id="form-add" style="margin-top: 100px">
		<div class="form-row">
			<div class="col-6">
			<input type="text" id="input-name" class="form-control" placeholder="Max Mueller">
			</div>
			<div class="col">
			<input type="text" id="input-date" class="form-control" placeholder="${strNow}" value="${strNow}">
			</div>
			<div class="col">
			<input type="text" id="input-time" class="form-control" placeholder="${strTime}" value="${strTime}">
			</div>
		</div>
		<button style="margin-top: 15px" type="submit" class="btn btn-dark">Add Laty</button>	
		<div class="alert alert-success" style="display: none" role="alert">New Laty Added!</div>
		</form>		
	`);

	$('#form-add').submit( (e) => {
		let newLaty = {
			name: $('#input-name').val(),
			date: $('#input-date').val(),
			time: $('#input-time').val()
		};

		$.ajax({
			url: 'http://localhost:3000/toolatecomers',
			method: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(newLaty)
		})
		.done(function(data) {
			console.log('success', data);
			
			let name = $('#input-name').val();
			let date = $('#input-date').val();
			let time = $('#input-time').val();						

			let start = moment.duration('09:15', 'HH:mm');
			let end = moment.duration(data[i].time, 'HH:mm');			
			let diff = end.subtract(start);
			let tooLate = diff.hours() + ':' + diff.minutes();

			let row = 
			`<tr data-id="${data.newTooLateComer._id}">
				<td>${name}</td>
				<td>${date}</td>
				<td>${time} (${tooLate})</td>
				<td><button type="button" class="btn btn-secondary btn-remove">X</button></td>
			</tr>`;
			$('tbody').append(row);		

			$('.alert-success').show().delay(2000).fadeOut('slow');
			$('#input-name').val('');
			$('#input-date').val('');
			$('#input-time').val('');				
		})
		.fail(function(xhr) {
			console.log('error', xhr);
		});
	});

	$('.container').append(`
		<table class="table" style="margin-top: 20px">
		<thead>
		<tr>
			<th scope="col">Name</th>
			<th scope="col">Date</th>
			<th scope="col">Time</th>
			<th scope="col"></th>
		</tr>
		</thead>
		<tbody>
		</tbody>
	</table>	
	`);

	$.ajax({
		url: 'http://localhost:3000/toolatecomers',
		method: 'GET',
		contentType: 'application/json'
	})
	.done(function(data) {
		console.log('success: ' + data);		
		for(let i=0;i<data.length;i++) {

			let start = moment.duration('09:15', 'HH:mm');
			let end = moment.duration(data[i].time, 'HH:mm');			
			let diff = end.subtract(start);
			let tooLate = diff.hours() + ':' + diff.minutes();

			let row = 
			`<tr data-id="${data[i]._id}">
				<td>${data[i].name}</td>
				<td>${data[i].date}</td>
				<td>${data[i].time} (${tooLate})</td>
				<td><button type="button" class="btn btn-secondary btn-remove">X</button></td>			
			</tr>`;
			$('tbody').append(row);			
		}
	})
	.fail(function(xhr) {
		console.log('err: ' + xhr);
	});

	$('tbody').on('click', '.btn-remove', (e) => {
		const row = $(e.target).parent().parent();
		const id = row.attr('data-id');
		console.log('huhu');

		$.ajax({
			url: 'http://localhost:3000/toolatecomers/' + id,
			method: 'DELETE',
			contentType: 'application/json'
		})
		.done(function(data) {
			console.log('success: ' + data);
			row.remove();
		})
		.fail(function(xhr) {
			console.log('error: ' + xhr);
		});		
	});

}

function buildLogin() {
	$('body').empty();
	$('body').append(login);

	$('#form-login').submit((e) => {
		e.preventDefault();

		let user = {
			username: $('#input-username').val(),
			password: $('#input-password').val()
		};
		console.log(user);

		$.ajax({
			url: '/login',
			method: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(user)
		})
		.done(function(data) {
			console.log('success', data);

			if(data.err == 0) {
				localStorage.setItem('loggedIn', 1);
				buildApp();
			}
		})
		.fail(function(xhr) {
			console.log('error', xhr);
		});
	});
}