<template>
  <v-app>
    <v-app-bar app color="#D68945" class="white--text" height="40">
      <img class="logo" src="./logo.jpg" style="height:30px;width:30px">
      <v-toolbar-title class="Libre Baskerville display-0.8">
        <span class="ml-5">Kouvee Pet Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-btn text router to="/">Home</v-btn>
      </v-toolbar-items>
      
      <v-toolbar-items>
        <v-btn text router to="/showProduk">Produk</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/layanan">Layanan</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/signDual">Sign In</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.v-btn {
  color: white;
}
.logo {
  padding: 0.5%;
  border-radius: 100%;
  background-color: white;
}
</style>

<script>
export default {
 name: 'app'
}
</script>