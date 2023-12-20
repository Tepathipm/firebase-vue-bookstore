<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs } from 'firebase/firestore'
import db from "../firebase/init.js";
import BookDetail from '../components/BookDetail.vue'
import { useRoute } from "vue-router";

const books = ref([]);
let title = ref("");
let route = useRoute();

async function getQuery() {
    let qryId = route.params.id
    books.value = [];
    let qry = null;

    if (qryId == 'Solo Max-Level Newbie') {
        // title.value = "Max-Level Newbie";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Solo Max-Level Newbie"));

    } else if(qryId == 'Dr.Stone'){
        title.value = "Solo Leveling";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Dr.Stone"));

    } else if(qryId == 'Blue Lock'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Blue Lock"));
    } else if(qryId == 'One Punch Man'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "One Punch Man"));
    } else if(qryId == 'Magic Emperor'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Magic Emperor"));
    } else if(qryId == 'Ranker’s Return (Remake)'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Ranker’s Return (Remake)"));
    } else if(qryId == 'One Piece'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "One Piece"));
    } else if(qryId == 'Solo Leveling'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Solo Leveling"));
    } else if(qryId == 'Mercenary Enrollment'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Mercenary Enrollment"));
    } else if(qryId == 'Nano Machine'){
        // title.value = "Nano Machine";
        const bookRef = collection(db, "book");
        qry = query(bookRef, where("name", "==", "Nano Machine"));
    }

    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        console.log(data);
        books.value.push(data);
    });
}

watch(() => route.params.id, getQuery);

onMounted(() => {
    getQuery();
});
</script>

<template>
    <BookDetail :books="books"/>
</template>

<style scoped>
/* Add your scoped styles here if needed */
</style>
