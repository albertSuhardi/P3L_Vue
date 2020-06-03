<template>
    <v-container>
        <v-card class="content">
            <v-container grid-list-md px-12 py-12>
                <h2 class="text-md-center">Laporan Produk Terlaris</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs5>
                            <div style="width:55%" class="mt-2 ml-0">
                                <v-select 
                                :items="nama_tahun" 
                                v-model="form.tahun" 
                                label="Tahun" 
                                placeholder="Pilih Tahun" 
                                autocomplete 
                                append-icon='mdi-calendar'>
                                </v-select>
                            </div>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn 
                                    depressed rounded style="text-transform: none !important;" 
                                    color="blue accent-3"
                                    @click="createPDF()"
                                    v-on="on">
                                    <v-icon left>mdi-printer</v-icon>
                                    Print Laporan
                                </v-btn>
                            </template>
                            <span>Print</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>

                <div ref="table" id="content">
                    <v-data-table 
                        sortable: false
                        :headers="headers" 
                        :items="laporans" 
                        :search="keyword" 
                        :loading="load" 
                        v-if="!showable"
                        :items-per-page="12"
                        class="elevation-2"
                        hide-default-footer
                        >
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.id_bulan">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama_bulan}}</td>
                                        <td>{{ item.nama_produk}}</td>
                                        <td>
                                            <v-chip color="primary" text-color="white">{{ item.jumlah_produk }}</v-chip>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                    </v-data-table>
                </div>
            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script> 
//sweet alert
import Vue from 'vue' 
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
//=====
import html2canvas from "html2canvas" // canvas
import jsPDF from 'jspdf' // bikin pdf
import 'jspdf-autotable'
import dropdown from 'vue-dropdowns';
import { log } from 'util'
export default {    
    data () {       
        return {       
            //coba drop down
            arrayOfObjects: [
                { name: '2020' }
            ],
            object: {
              name: '2020',
            },
            //=======
            snackbar: false,
            text: 'Hello, I\'m a snackbar',
            dialog: false,
            showable: false,         
            keyword: '',       
            pagination:{
                rowsPerPage: 12
            },
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',
                    sortable: false          
                },             
                {               
                    text: 'Bulan',               
                    value: 'bulan',
                    sortable: false            
                },             
                {               
                    text: 'Nama Produk',               
                    value: 'nama_produk',
                    sortable: false
                },            
                {               
                    text: 'Jumlah Penjualan',               
                    value: 'jumlah_produk',
                    fixed: true,
                    sortable: false
                }         
            ],       
            laporans: [],
            nama_layanan: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                ukuran : '',           
                harga : '',
                created_at : '',
                update_at : '',
                tahun: '2020'
            },         
            nama_tahun:['2020'],
            size : new FormData,         
            typeInput: 'new',        
            errors : '',         
        }     
    },  
    //coba drop down   
    components: {
        'dropdown': dropdown,
    },
    methods:{ 
        succesPrinted(){
            this.$swal('Sukses Print Laporan','','success');
        },
        convertBase64LocalImage(){
        //add local image
            let _this = this
            var res
            var xhr = new XMLHttpRequest();       
            xhr.open("GET", require('../../assets/header.png'), true); 
            xhr.responseType = "blob";
            xhr.onload = function (e) {
                    console.log(this.response);
                    var reader = new FileReader();
                    reader.onload = function(event) {
                    res = event.target.result;
                    _this.local_image = res 
                    }
                    var file = this.response;
                    reader.readAsDataURL(file)
            }
            xhr.send()
        },
        createPDF () {
          let _this = this
            console.log('=== local image ===')
            console.log(this.local_image)
            const header = this.local_image
            // doc
            const doc = new jsPDF('a4','px');
            doc.addImage(header,'JPEG',25,20,400,110);
            // isi auto table
            //header
            var headRows = function() {
                return [{
                no: "ID",
                bulan: "Bulan",
                nama_produk: "Nama Produk",
                jumlah_penjualan: "Jumlah Penjualan",
                }];
            };
            //body
            var bodyRows = function() {
                let body = [];
                for(var i = 0, len = _this.laporans.length; i < len; i++){
                body.push({
                    no: i+1,
                    bulan: _this.laporans[i].nama_bulan,
                    nama_produk: _this.laporans[i].nama_produk,
                    jumlah_penjualan: _this.laporans[i].jumlah_produk
                });
                }
                return body;
            }
            //text judul
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Laporan Produk Terlaris", 145, 150);
            //text tahun
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Tahun : 2020", 28, 180);
            doc.autoTable({
            margin: { top: 190 },
            head: headRows(),
            body: bodyRows()
            })
            //text cetak pada
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            var date = (new Date().toLocaleString('id',{month:'long', year:'numeric', day:'numeric'}))
            doc.text("Dicetak Tanggal : "+date, 28, 420);
            doc.save('Laporan_Produk_Terlaris.pdf');
            this.succesPrinted();
        },
        clickedButton(){
            this.snackbar = true; //mengaktifkan snackbar               
            this.color = 'green'; //memberi warna snackbar               
            this.text = 'Clicked'; //memasukkan pesan ke snackbar               
        },
        methodToRunOnSelect(payload) {
            this.object = payload;
        },
        getData(){             
            var uri = this.$apiUrl + '/laporan/ProdukTerlaris?tahun=2020'             
            this.$http.get(uri).then(response =>{                 
                this.laporans=response.data.data           
            })               
        },         
        sendData(){
            this.tahun.append('tahun', this.form.ukuran);      
            var uri =this.$apiUrl + '/laporan/LayananTerlaris/'             
            this.load = true             
            this.$http.post(uri, this.tahun).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data ukuran            
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        }
    },     
    mounted(){         
        this.getData();
        this.convertBase64LocalImage();         
        }, 
    } 
</script> 
<style lang="scss" scoped>
.content{
    width: 85%;
    margin: auto;
}
.v-btn {
  color : white;
}
</style>