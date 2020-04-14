<template>

<v-container fluid>
   <v-carousel
   cycle
    height="600"
    hide-delimiter-background
    show-arrows-on-hover>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      hide-delimiter-background
      show-arrows-on-hover
    >
    </v-carousel-item>
  </v-carousel>
  <v-card>
    <v-card-text id="Header-Info">Tentang Kami</v-card-text>
    <v-card-text align="justify">
      Kouvee Pet Shop merupakan sebuah toko hewan yang sudah berdiri sejak tahun 2018 menyediakan produk dan jasa layanan yang berada di Kota Yogyakarta. Kouvee Pet Shop menyediakan berbagai macam produk untuk hewan kesayangan anda seperti makanan, aksesoris, perlengkapan dan lain-lain sesuai kebutuhan hewan kesayangan anda. Selain menjual berbagai macam produk, Kouvee Pet Shop juga menyediakan jasa layanan seperti grooming dan penitipan hewan. Kouvee Pet Shop bekerja sama dengan beberapa supplier dalam penyediaan produk yang dijual.
    </v-card-text>
    <v-card-text align="right">
      by : P3L
    </v-card-text>
  </v-card>
</v-container>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://moondoggiesmusic.com/wp-content/uploads/2019/03/jenis-hewan-peliharaan.png',
            
          },
          {
            src: 'https://cdn.royalcanin-weshare-online.io/xSJNPmYBaxEApS7LvAZG/v11/ed36h-grooming-and-hygiene-tips-for-your-new-puppy-hero-dog',
            
          },
          {
            src: 'https://pingpoint.co.id/media/images/BINTARO_BISNIS_TIPS_SUKSES_USAHA_PET_SHOP_OCI_1.original.jpg',
          },
          {
            src: 'https://www.fachton.com/wp-content/uploads/2019/07/fachton-obat-kutu-kucing.jpg',
          },
        ],
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
      }
    },
  }
</script>
<style lang="scss" scoped>
.v-card {
  align-content: center;
  padding: 2%;
  margin-top: 2%;
}

#Header-Info {
    font-size: 20pt;
    font-weight: bold;
}

</style>