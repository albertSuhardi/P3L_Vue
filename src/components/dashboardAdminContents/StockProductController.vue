<template>
  <v-card
    class=""
  >
    <v-container class="margin">
      <v-row dense>
        <!-- <v-col cols="12">
          <v-card
            color="item.color"
            dark
          >
            <v-card-title class="headline">Add New Stock Product</v-card-title>

            <v-card-subtitle>Check your product so you can restok your product if your stock start to be empty.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Add New Stock</v-btn>
            </v-card-actions>
          </v-card>
        </v-col> -->

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle clss="fonr-weight-bold" v-text="item.artist"></v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="sign(item)">Show More</v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script> 
import { log } from 'util'
export default {    
    data () {       
        return {         
            items: [
            {
              color: '#D6B066',
              src: 'https://media.giphy.com/media/3Mb5Mzii1nxMmNdM1P/giphy.gif',
              title: 'Order Stok Produk baru',
              artist: 'Cek produkmu jadi kamu dapat mengisi kembali persediaanmu ketika mulai habis.',
              // button: this.sign(),
            },
            {
              color: '#D29C76',
              src: 'https://www.storage.ie/wp-content/uploads/2017/03/document_storage-1.jpg',
              title: 'Tampilkan List Order',
              artist: 'Menampilkan semua list stok yang akan dan pernah dilakukan.',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
            {
              color: '#3C3D3F',
              src: 'https://ak.picdn.net/shutterstock/videos/15071320/thumb/4.jpg',
              title: 'Supplier',
              artist: 'Cek Rekanku!! Pastikan tidak ada data yang salah disana!',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
          ],
          order : new FormData,         
        }     
    },     
    methods:{         
        sign(item){
        if(item.title === 'Order Stok Produk baru'){
          this.sendData(),
          this.$router.replace({ path : '/dashboardAdmin/AddStock' })
        }else if(item.title === 'Tampilkan List Order'){
          this.$router.replace({ path : '/dashboardAdmin/ShowStock' })
        }else{
          this.$router.replace({ path : '/dashboardAdmin/addSupplier' }) 
        }
      },
      sendData(){       
            this.order.append('id_pengadaan', 1);
            var uri =this.$apiUrl + '/pengadaan_produk'             
            this.load = true;             
            this.$http.post(uri,this.order).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;                 
                this.getData(); //mengambil data user               
                this.resetForm(); //mengambil data ukuran                       
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })
        },     
    },      
    } 
</script> 


<style lang="scss" scoped>
.margin{
  padding-top: 4%;
  padding-bottom: 6%;
}
</style>