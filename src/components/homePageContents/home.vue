<template>
  <v-app light>
    <v-content>
      <section>
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
      </section>

      <section class="about">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Kouvee Pet Shop</h2> 
          </div>
        </v-flex >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <span class="subheading">
              Nomor satu dalam pelayanan hewan peliharaan anda
            </span>
          </div>
          </v-flex>
          <v-flex xs12 sm4 class="my-3">
            <div class="icon light black--text mb-2 display-1 text-xs-center" style="font-weight: 900">
              <v-icon x-large class="blue--text text--lighten-2">mdi-earth</v-icon>
            </div>
            <div class="light black--text mb-2 display-1 text-xs-center" style="font-weight: 900">
              <h2 class="headline">Tentang Kami</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-card-text align="center">
              Kouvee Pet Shop merupakan sebuah toko hewan yang sudah berdiri sejak tahun 2018 menyediakan produk dan jasa layanan yang berada di Kota Yogyakarta. Kouvee Pet Shop menyediakan berbagai macam produk untuk hewan kesayangan anda seperti makanan, aksesoris, perlengkapan dan lain-lain sesuai kebutuhan hewan kesayangan anda. Selain menjual berbagai macam produk, Kouvee Pet Shop juga menyediakan jasa layanan seperti grooming dan penitipan hewan. Kouvee Pet Shop bekerja sama dengan beberapa supplier dalam penyediaan produk yang dijual.
            </v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md5>
                  <v-card class="elevation-0 transparent">
                    <!-- <v-card-text class="text-xs-center">
                      <v-icon x-large class="icon blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-card-text> -->
                    <!-- <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Reach the world</div>
                    </v-card-title> -->
                  </v-card>
                </v-flex>
                <!-- <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast feedback</div>
                    </v-card-title>
                    <v-card-text>
                      Time is important, we don't want you to waste it. Here you can get a massive feedback from real users in minutes. And if your stuff is appreciated you won't only get positive feedback but also lovely and sincere fans
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Create new connections</div>
                    </v-card-title>
                    <v-card-text>
                      Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe! 
                    </v-card-text>
                  </v-card>
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

       <section>
        <v-container grid-list-md>

        
          <v-layout row wrap>
          <v-space></v-space>
            </v-layout>
          </v-container>
      </section>

       <section>
        <v-parallax :src="imageLink.social_cover" height="380">
          <v-layout column align-center justify-center>
            <div class="headline light blue--text mb-3 text-xs-center">Supaya ga ketinggalan info terbaru, yuk follow media sosial kita!</div>
          </v-layout>
          <v-layout justify-space-around justify-center>

              <v-icon x-large dark color="blue">mdi-facebook</v-icon>

              <v-icon x-large dark color="blue">mdi-twitter</v-icon>

              <v-icon x-large dark color="orange">mdi-reddit</v-icon>

              <v-icon x-large dark color="pink">mdi-instagram</v-icon>

              <v-icon x-large dark color="purple">mdi-discord</v-icon>
            </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Info Kami</div>
                </v-card-title>
                <v-card-text align="justify">
                  Halo teman-teman! Pengedepanan pelayanan hewan peliharaan dan penjualan makanan berkualitas adalah prioritas dari kami. Jika terdapat komplain kritik dan saran bisa langsung menghubungi kontak yang tersedia atau melewati media sosial kami
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Lowongan</div>
                </v-card-title>
                <v-card-text>
                  Info penerimaan dan pengumpulan CV dapat dikirim melalui qwerty@techno.id.com atau menghubungi nomert (021) 12311312312
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

       <section>
        <v-container>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
                <img height="200px" :src="imageLink.logo">
            </v-flex>
          </v-layout>
        </v-container>
     </section>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12 class="text-xs-center">
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">mdi-heart</v-icon>
              using <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>

    </v-content>
</v-app>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      items: [
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
      title: "Endorfine",
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
          "https://cdn.royalcanin-weshare-online.io/xSJNPmYBaxEApS7LvAZG/v11/ed36h-grooming-and-hygiene-tips-for-your-new-puppy-hero-dog",
        logo:
          "https://scontent.fjog3-1.fna.fbcdn.net/v/t1.0-0/s600x600/101162753_2926166047496840_7373603152307683328_n.jpg?_nc_cat=107&_nc_sid=730e14&_nc_ohc=dzXKWZvWyQwAX9dyoCO&_nc_ht=scontent.fjog3-1.fna&_nc_tp=7&oh=e44cf9c9aa97b30c0a59f5e72a3ea93c&oe=5EFB4619",
        social_cover:
          "https://scontent.fjog3-1.fna.fbcdn.net/v/t1.0-9/101348067_2926214817491963_6514044599965581312_o.jpg?_nc_cat=110&_nc_sid=730e14&_nc_ohc=jx21L4FVd1oAX-gKtTE&_nc_ht=scontent.fjog3-1.fna&oh=f5de71f9bb4935b0c113b068991cfb48&oe=5EF90D31"
      },
      subscribed: false
    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    this.calculateHeight();
  }
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}

.about {
  margin-left: 20%;
  margin-right: 20%;
}

.icon {
  text-align: center;
}

.headling, .subheadling{
  text-align: center;
}

</style>
