<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs,orderBy } from 'firebase/firestore'
import db from "../firebase/init.js";
import { RouterLink } from "vue-router";

let books = ref([])
let qry = null

onMounted( async() => {
    getBook()
}) 

async function getBook() {
  books.value = [];
  const booksRef = collection(db, "book");
  qry = query(booksRef, orderBy("name", "asc"))

  const querySnap = await getDocs(qry);
  querySnap.forEach((doc) => {
    let data = doc.data();
    data.id = doc.id;
    books.value.push(data);
  });
}
</script>
 
<template>
<div class="w-full h-full flex flex-col justify-center items-center flex-nowrap">
    <div class="container overflow-hidden">
        <div class="book w-full h-full">
        <div v-for="book,index in books" :key="index" class="img-item">
        <RouterLink :to="'/query/' +book.name">
            <img :src="book.img" class="" alt="Book Cover">
        </RouterLink>
        </div>
      </div>
    </div>
    </div>
</template>
 
<style scoped>
* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
    box-sizing: border-box;
    background-color: #020024;
    color: white;
}
.container {
    max-width: 1200px;
    width: 95%;
}
.book{
    display: grid;
    gap:20px;
    scrollbar-width: none;
    grid-template-columns: repeat(10, 1fr);
}
.book::-webkit-scrollbar{
    display: none;
}

img {
    width: 325px;
    height: 400px;
    object-fit: cover;
    transition: .7s ;
    border-radius: 10px;
}
.book img:hover{
    /* -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2); */
    transform: scale(1.3);
    transition: .7s ;
}
</style>