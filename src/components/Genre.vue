<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs,orderBy, getDoc, onSnapshot, getCountFromServer, getAggregateFromServer, or, sum, average, and} from 'firebase/firestore'
import db from "../firebase/init.js";

let books = ref([])
let totalBook = ref(0)
let totalPop = ref(0)
let avgPop = ref(0)
let snapshot = ref([])
let genres = ref([])
let qry = null
const selectedSortOption = ref("allgenre");

onMounted( async() => {
    getBook()
}) 

async function getBook() {
  books.value = [];
  genres.value = []
  const booksRef = collection(db, "book");
  
  qry = query(booksRef, orderBy('name', 'asc'))

  const querySnap = await getDocs(qry);
  getTotalBook(qry)
  getavgPop(qry)
  querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      books.value.push(data);
    });
}

async function getTotalBook(qry){
  totalBook.value = 0
  snapshot = await getCountFromServer(qry)
  totalBook.value = snapshot.data().count
}

async function getavgPop(qry){
    avgPop.value = 0
    totalPop.value = 0
    snapshot = await getAggregateFromServer(qry,{
        avgPop : average('pop'),
        totalPop : sum('pop')
    })
    avgPop.value = snapshot.data().avgPop
    totalPop.value = snapshot.data().totalPop 
}

async function handleSortChange() {
  books.value = [];
  const booksref = collection(db, "book");
  switch (selectedSortOption.value) {
    case "allgenre":
      books.value = [];
      getBook();
      break;
    case "actionadventure":
      qry = query(booksref, where("genre", "array-contains", 'Action'), where('pop', '>', 16000));
      getTotalBook(qry)
      getavgPop(qry)
      break;
    case "bestpop":
      qry = query(booksref, where('pop', '>', 16000))
      getavgPop(qry)
      getTotalBook(qry)
      break;
    case "comedyordrama":
      qry = query(booksref, or(where('genre', "array-contains", 'Comedy'), where('genre', "array-contains", 'Drama')))
      getavgPop(qry)
      getTotalBook(qry)
      break;
    case "notendandmorethan3stars":
      qry = query(booksref, and(where('completed', '==', false), where('stars', '>' , 3)))
      getavgPop(qry)
      getTotalBook(qry)
      break
  }

  if (selectedSortOption.value !== "allgenre") {
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      books.value.push(data);
    });
  }
}
</script>
 
<template>
  <div class="header h-full w-full overflow-auto">
    <div class="filters text-3xl">
      <label for="sortDropdown" class="sort">Sort By:</label> &nbsp;
      <select
      id="sortDropdown"
      v-model="selectedSortOption"
      @change="handleSortChange"
      class="h-1/2 text-5xl"
      >
      <option value="allgenre">All genre</option>
      <option value="actionadventure">Action Adventure</option>
      <option value="bestpop">Most Popular</option>
      <option value="comedyordrama">Comedy Or Drama</option>
      <option value="notendandmorethan3stars">Ongoing and > 3 stars</option>
    </select>
    <p>Total Book : <span class="text-orange-400 m-1">{{ totalBook }}</span></p> &nbsp;&nbsp;
    <p>Total Pop : <span class="text-orange-400 m-1">{{ totalPop }}</span></p> &nbsp;&nbsp;
    <p>Avg Pop : <span class="text-orange-400 m-1">{{ avgPop }}</span></p>
    </div>
    <div class="grid-container w-full h-full">
      <div v-for="book, index in books" :key="index" class="grid-item">
        <img :src="book.img" class="book-cover rounded-2xl border border-gray-500" alt="Book Cover">
        <p><span class="text-white">{{ book.genre.join('&nbsp&nbsp') }}</span></p>
        <p>
            <span class="text-green-400" v-if="book.completed === false">Ongoing</span>
            <span class="text-red-500" v-else>Ended</span>
        </p>
      </div>
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  color: #34043c;
}

.grid-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#sortDropdown {
  padding: 1px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: -5px;
  margin-right: 50px;
}

.filters {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 10px;
}

img{
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 20px;
  transition: .4s ease;
  cursor: pointer;

}
img:hover{
  object-fit: cover;
  transform: scale(1.1);
  transition: .4s ease ;

}
</style>

  
  