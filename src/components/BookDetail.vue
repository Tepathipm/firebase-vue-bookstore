<script setup>
defineProps({
    books: {
    }
})
</script>
 
<template>
  <div class="w-full h-full flex justify-center items-center">
      <div v-for="(book, index) in books" :key="index" class="content h-full w-full flex justify-center items-center">
        <div class= "w-full h-full flex flex-col justify-center items-center m-20"> 
          <div class="w-full h-full flex flex-col items-center justify-center">
          <h1 class="text-orange-400 text-4xl pb-4">{{ book.name }}</h1>
          <img :src="book.img" />
          <table class="w-full h-8/12 m-5">
            <tr>
              <th>Status</th>
              <td>
                <span class="text-green-400" v-if="book.completed === false">Ongoing</span>
                <span class="text-red-500" v-else>Ended</span>
              </td>
              <th>Type</th>
              <td><span class="text-orange-400">{{ book.type }}</span></td>
            </tr>
            <tr>
              <th>Stars</th>
              <td><span class="text-orange-400">{{ book.stars }}</span></td>
              <th>Genre</th>
              <td><span class="text-orange-400">{{ book.genre.join() }}</span></td>
            </tr>
            <tr>
              <th>Author</th>
              <td><span class="text-orange-400">{{ book.author }}</span></td>
              <th>Available in </th>
              <td>
                <span class="text-orange-400">{{ book.release_details.location }}</span>
              </td>
            </tr>
          </table>
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
  background-color: #020024;
  color: white;
}
.content{
  width: 80%;
  height: 80%;
}
img{
  width: 250px;
  height: 370px;
  padding: 10px;
  border-radius: 20px;
  transition: .7s ;
}
img:hover{

    transform: scale(1.1);
    transition: .7s ;
}
th{
  padding: 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.476);
  border-top: none;
  border-left: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
tr{

  border: 0.5px solid rgba(255, 255, 255, 0.476);
  border-top: none;
  border-left: none;
  border-right: none;
}
td{
  padding-left: 20px;
}
</style>