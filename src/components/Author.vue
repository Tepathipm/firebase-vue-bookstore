<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { collection, query, where, getDocs,orderBy, getDoc, onSnapshot, getCountFromServer, limit} from 'firebase/firestore'
import db from "../firebase/init.js";

let authors = ref([])
let totalAuthors = ref(0)
let snapshot = ref([])
let qry = null
const selectedSortOption = ref("default");

onBeforeMount(async() => {
    getAuthor()
})

async function getAuthor() {
  authors.value = [];
  const authorsRef = collection(db, "author");
  qry = onSnapshot(
    query(authorsRef, orderBy('name', 'asc')),
    (querySnapshot) => {
      authors.value = []; // Clear existing data
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        authors.value.push(data);
      })
    })
}

async function handleSortChange() {
  authors.value = [];
  const authorsRef = collection(db, "author");
  switch (selectedSortOption.value) {
    case "default":
    authors.value = [];
      getAuthor()
      break;
    case "namedesc":
      qry = query(authorsRef, orderBy("name", "desc"));
      break;
    case "writtenmt5":
      qry = query(authorsRef, where('numofbookwritten', '>' , 5));
      break;
    
  }
      if (selectedSortOption.value !== "default") {
      const querySnap = await getDocs(qry);
      querySnap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        authors.value.push(data);
      });
    }
  }
</script>
 
<template>
<div class="w-full h-full flex justify-center overflow-x-hidden">
    <div class="content">
        <div class="filters text-3xl">
          <label for="sortDropdown" class="sort">Sort By:</label> &nbsp;
          <select
            id="sortDropdown"
            v-model="selectedSortOption"
            @change="handleSortChange"
            class="h-1/2 text-5xl"
          >
            <option value="default">Default</option>
            <option value="namedesc">Name (desc)</option>
            <option value="writtenmt5">Written Book > 5</option>
          </select>
        </div>
        <ul class="team" v-for="author,index in authors" :key="index">
            <li class="member">
                <div class="description">
                    <h3 class="text-center text-3xl">{{ author.name }}</h3>
                    <p>Total Book Written : <span class="text-orange-400">{{ author.numofbookwritten }}</span></p>
                    <p>Written Book : <span class="text-orange-400">{{ author.book.join('&nbsp - &nbsp') }}</span></p>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
 
<style scoped>

* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #020024;
  color: white;
}
::-webkit-scrollbar{
  background: #020024;
}
option{
    text-align: center;
}
.content{
    width: 90vmin;
}
.team {
	padding: 2em 0 2em 2.5em;
	margin: 0;
}
.member{
    margin: 1.5em 0 0.5em;
    height: 100%;
	padding: 0.73em;
    position: relative;
	list-style: none;
	display: inline-block;
	transform: scale(0.85);
	transition: all 0.4s ease 0s;
}
.member:nth-of-type(even) {
	text-align: right;
}
.thumb {
	width: 17vmin;
	height: 20vmin;
	float: left;
	margin-right: 1em;
	transform: rotate(-4deg);
	transition: all 0.4s ease 0s;
	border-radius: 0.25em;
	overflow: hidden;
	margin-left: -3em;
	padding: 0.5em;
}
.member:nth-of-type(even) .thumb {
	--deg: 86deg;
	float: right;
	margin-left: 2em;
	margin-right: -3em;
	transform: rotate(4deg);
}
.thumb img {
	width: 100%;
	height: 100%;
	border-radius: 0.25em;
	filter: grayscale(1);
	background: #2f313a;
    object-fit: cover;
}
.member:hover {
	transform: scale(1);
	transition: all 0.4s ease 0s;
	filter: drop-shadow(0px 20px 10px #0008);
}
.member:hover .thumb {
	padding: 0.1em;
	transition: var(--trans);
	transform: rotate(-1deg);
	--deg: -89deg;
}
.member:nth-of-type(even):hover .thumb {
	--deg: 91deg;
}
.member:hover .thumb img {
	filter: none;
	transition: all 0.4s ease 0s;
}
.description {
	padding-top: 1vmin;
}

.description p {
	padding: 0 2em;
	margin-bottom: 1em;
}
:root {
	--yellow: #ffdd40;
	--dark: #2f313a;
	--deg: -86deg;
	--trans: all 0.4s ease 0s;
}
#sortDropdown {
  padding: 8px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: -5px;
  margin-right: 80px;
}

.filters {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 10px;
}

</style>