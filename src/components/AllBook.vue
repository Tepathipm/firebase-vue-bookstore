<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs,orderBy, getDoc, onSnapshot, getCountFromServer, limit} from 'firebase/firestore'
import db from "../firebase/init.js";

let books = ref([])
let totalBook = ref(0)
let snapshot = ref([])
let qry = null
const selectedSortOption = ref("default");

onMounted( async() => {
    getBook()
}) 

async function getBook() {
  books.value = [];
  const booksRef = collection(db, "book");
  getTotalBook(booksRef)
  qry = onSnapshot(
    query(booksRef, orderBy('name', 'asc')),
    (querySnapshot) => {
      books.value = []; // Clear existing data
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        books.value.push(data);
      })
    })
}

async function getTotalBook(qry){
  totalBook.value = 0
  snapshot = await getCountFromServer(qry)
  totalBook.value = snapshot.data().count
}

async function handleSortChange() {
  books.value = [];
  const booksref = collection(db, "book");
  switch (selectedSortOption.value) {
    case "default":
      books.value = [];
      getBook();
      break;
    case "namedesc":
      qry = query(booksref, orderBy("name", "desc"), limit(5));
      getTotalBook(qry)
      break;
    case "stars":
      qry = query(booksref, where("stars", ">=", 4), where("stars", "<=", 5),orderBy("stars", "desc"));
      getTotalBook(qry)
      break;
    case "latestupdate":
      const dateNow = new Date()
      const twentyFourHoursAgo = new Date(dateNow.getTime());
      twentyFourHoursAgo.setFullYear(twentyFourHoursAgo.getFullYear())
      qry = query(booksref, orderBy("release_details.lastupdated", "desc"))
      getTotalBook(qry)
      break;
    case "mostep":
      qry = query(booksref, orderBy("release_details.numofep", "desc"))
      getTotalBook(qry)
      break
    case "mangaanime":
      qry = query(booksref, where("type", "in" , ["Manga", "Anime"]))
      getTotalBook(qry)
      break
  }

  if (selectedSortOption.value !== "default") {
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
        <option value="default">Default</option>
        <option value="namedesc">Name Desc (limit 5)</option>
        <option value="stars">Stars 4 - 5</option>
        <option value="latestupdate">Latest update</option>
        <option value="mostep">Most Episode</option>
        <option value="mangaanime">Manga And Anime</option>
      </select>
      <p>Total Book : <span class="text-orange-400">{{ totalBook }}</span></p>
    </div>
    <div class="grid-container w-full h-full">
      <div v-for="book, index in books" :key="index" class="grid-item">
        <img :src="book.img" class="book-cover rounded-2xl border border-gray-500" alt="Book Cover">
        <p><span class="text-white">{{ book.name }}</span></p>
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

img{
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 20px;
  transition: .4s ease;
  cursor: pointer;
  filter: blur(100%);

}
img:hover{
  object-fit: cover;
  transform: scale(1.1);
  transition: .4s ease ;
  filter: blur(0%);

}
</style>

  
  