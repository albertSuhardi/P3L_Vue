<template>
  <v-card
    class=""
  >
    <v-container class="margin">
      <v-row dense>    
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="6"
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
                size="110"
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
            //src: require('../../assets/halaman.png'),
            items: [
            {
              color: '#D6B066',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Jasa Layanan Terlaris',
              artist: 'Melihat Laporan Jasa Layanan Terlaris sesuai tahun',
            //   button: this.sign(Jasa_Layanan_terlaris_tahun),
            },
            {
              color: '#D6B066',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Produk Terlaris',
              artist: 'Melihat Laporan Produk Terlaris sesuai tahun',
            //   button: this.sign(Produk_terlaris_tahun),
            },
            {
              color: '#3C3D3F',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Pendapatan Tahunan',
              artist: 'Melihat Laporan Pendapatan Tahunan berdasarkan tahun',
            //   button: this.sign(Pendapatan_tahun),
            },
            {
              color: '#3C3D3F',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Pendapatan Bulanan',
              artist: 'Melihat Laporan Pendapatan sesuai bulan dan tahun yang dipilih',
            //   button: this.sign(Pendapatan_bulan),
            },
            {
              color: '#D29C76',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Pengadaan Produk Tahunan',
              artist: 'Melihat Laporan Pengadaan Produk sesuai tahun',
            //   button: this.sign(Pengadaan_tahun),
            },
            {
              color: '#D29C76',
              src: "https://image.freepik.com/free-vector/data-report-illustration-concept_114360-883.jpg",
              title: 'Laporan Pengadaan Produk Bulanan',
              artist: 'Melihat Laporan Pendapatan berdasarkan bulan dan tahun',
            //   button: this.sign(Pendapatan_bulan),
            },
          ],
          order : new FormData,         
        }     
    },     
    methods:{   
      //
        sign(item){
        if(item.title === 'Laporan Jasa Layanan Terlaris'){
          this.$router.push({ path : '/dashboardAdmin/JasaLayananTerlaris' })
        }else if(item.title === 'Laporan Produk Terlaris'){
          this.$router.push({ path : '/dashboardAdmin/ProdukTerlaris' })
        }else if(item.title === 'Laporan Pendapatan Tahunan'){
          this.$router.push({ path : '/dashboardAdmin/Laporan_PendapatanTahunan' })
        }else if(item.title === 'Laporan Pendapatan Bulanan'){
          this.$router.push({ path : '/dashboardAdmin/LaporanPendapatanBulanan' })
        }else if(item.title === 'Laporan Pengadaan Produk Tahunan'){
          this.$router.push({ path : '/dashboardAdmin/Laporan_PengadaanProdukTahunan' })
        }else if(item.title === 'Laporan Pengadaan Produk Bulanan'){
          this.$router.push({ path : '/dashboardAdmin/Laporan_PengadaanProdukBulanan' })
        }else{
          this.$router.push({ path : '/dashboardAdmin/LaporanPendapatanBulanan' }) 
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