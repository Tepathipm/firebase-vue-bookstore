<script setup>
import { RouterLink } from 'vue-router';


</script>
 
<template>
<div class="w-full h-full flex items-center justify-center text-white">
    <ul id="nav">
	    <li class="nav-link">
		    <RouterLink to="/"><h1 data-name="home">Home</h1></RouterLink>
	    </li>
	    <li class="nav-link">
		    <RouterLink to="/book"><h1 data-name="book">Book</h1></RouterLink>
	    </li>
	    <li class="nav-link">
		    <RouterLink to="/author"><h1 data-name="author">author</h1></RouterLink>
	    </li>
	    <li class="nav-link">
		    <RouterLink to="/genre"><h1 data-name="genre">genre</h1></RouterLink>
	    </li>
    </ul>
</div>
</template>
 
<style scoped>

* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
    background-color: #020024;
}

body {
	min-height: 100vh;
	display: grid;
	place-items: center;
	color: white;
}
ul {
	list-style: none;
}
h1 {
	font-size: 5rem;
	position: relative;
	text-transform: uppercase;
	transition: all 300ms ease;
	width: fit-content;
	cursor: pointer;
}
h1:hover {
	transform: skew(10deg);
}
h1::before {
	content: attr(data-name);
	position: absolute;
	top: 0;
	left: -20px;
	background: var(--bgcolor);
	height: 3rem;
	overflow: hidden;
	transition: all 300ms ease;
	padding-left: 20px;
}
h1:hover::before {
	top: -3px;
	left: 0px;
	color: hotpink;
}

h1::after {
	content: "";
	height: 4px;
	width: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: hotpink;
	transition: all 300ms ease;
}
h1:hover::after {
	width: 120%;
	outline: 5px solid rgb(2, 0, 36);
}

</style>