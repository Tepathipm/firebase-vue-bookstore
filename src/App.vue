<script setup>
import { RouterView } from 'vue-router';
import Home from './components/Home.vue';
import Navbar from './components/navbar.vue';


</script>
 
<template>
    <div class="w-screen h-screen flex flex-row justify-center">
        <div class="w-1/2 h-full">
            <Navbar/>
        </div>
        <div class="showContent w-8/12 h-full">
            <RouterView />
        </div>
    </div>
</template>
 
<style scoped>
</style>