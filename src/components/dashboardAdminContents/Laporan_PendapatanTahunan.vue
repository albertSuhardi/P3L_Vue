<template>
    <v-container>
        <v-card class="content">
            <v-container grid-list-md px-12 py-12>
                <h2 class="text-md-center">Laporan Pendapatan Tahunan</h2>
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
                        :items="merged" 
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
                                        <td>Rp. {{ item.jasa_layanan}},-</td>
                                        <td>Rp. {{ item.produk}},-</td>
                                        <td>Rp. {{parseInt(item.produk) + parseInt(item.jasa_layanan)}},-</td>
                                    </tr>
                                </tbody>
                            </template>
                            <template slot="footer">
                                <div class="mt-5 mb-0">
                                    <tr>
                                        <td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Total Harga</span>
                                        <td></td><td></td><td></td><td></td>
                                        <td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Rp. {{Summary_Total}} ,-</span>
                                    </tr>                                    
                                </div>
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
                    value: 'nama_bulan',
                    sortable: false            
                },             
                {               
                    text: 'Jasa Layanan',               
                    value: 'nama_layanan',
                    sortable: false
                },            
                {               
                    text: 'Produk',               
                    value: 'produk',
                    fixed: true,
                    sortable: false
                },            
                {               
                    text: 'Total',               
                    value: 'total',
                    fixed: true,
                    sortable: false
                }         
            ],       
            laporans: [],
            //produks
            produks: [],
            jmlh_produks: [],
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
            jumlah_produk: [] ,
            combined: [],
            merged: [],
            Summary_Layanan: 0,
            Summary_Produk: 0,
            Summary_Total: 0,
            Array_Layanan: [],
            Array_Produk: []
        }     
    },  
    //coba drop down   
    components: {
        'dropdown': dropdown
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
                nama_bulan: "Bulan",
                jasa_layanan: "Jasa Layanan",
                produk: "Produk",
                total: "Total",
                }];
            };
            //body
            console.log('=== MERGED ARRAY ===')
            console.log(_this.merged)
            var bodyRows = function() {
                var total_harga = 0
                let body = [];
                for(var i = 0, len = 12; i < len; i++){
                total_harga = parseInt(_this.produks[i].produk) + parseInt(_this.laporans[i].jasa_layanan)
                body.push({
                    no: i+1,
                    nama_bulan: _this.laporans[i].nama_bulan,
                    jasa_layanan: "Rp. "+_this.laporans[i].jasa_layanan+",-",
                    produk: "Rp. "+_this.merged[i].produk+",-",
                    total: "Rp. "+total_harga+",-"
                });
                }
                return body;
            }
            //text judul
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Laporan Pendapatan Tahunan", 120, 150);
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
            //text Total
            doc.setFontSize(10);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Total Harga : Rp. "+_this.Summary_Total+",-", 320, 420);
            doc.save('Laporan_Pendapatan_Tahunan.pdf');
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
        getTotalSemua(){
            var uri = this.$apiUrl + '/laporan/PendapatanLayananTahun?tahun=2020'             
            this.$http.get(uri).then(response =>{     
                this.Summary_Total = this.Summary_Layanan + this.Summary_Produk
                console.log('==== SUMMARY TOTAL ====')
                console.log(this.Summary_Total)
            })
        },
        getData(){  
            var k = 0           
            var uri = this.$apiUrl + '/laporan/PendapatanLayananTahun?tahun=2020'             
            this.$http.get(uri).then(response =>{                 
                this.laporans=response.data.data  
                //summary layanan
                for(var i = 0, len = this.laporans.length; i < len; i++){
                    k = k + parseInt(this.laporans[i].jasa_layanan)
                    this.Array_Layanan = parseInt(this.laporans[i].jasa_layanan)
                }
                this.Summary_Layanan = k;
                console.log("== Jumlah Harga Layanan ==");
                console.log(k);
                console.log("== Harga Layanan ==");
                console.log(this.laporans);
            })               
        },    
        getDataProduk(){   
            var pro = 0
            var uri = this.$apiUrl + '/laporan/PendapatanProdukTahun?tahun=2020'             
            this.$http.get(uri).then(response =>{                 
                this.produks = response.data.data   
                for(var i = 0, len = this.produks.length; i < len; i++){
                    this.jumlah_produk.push(this.produks[i]);
                    pro = pro + parseInt(this.produks[i].produk)
                }
                this.Summary_Produk = pro;
                 console.log("== Jumlah Harga produk ==");
                console.log(pro);
                console.log("== Harga Produk ==");
                console.log(this.jumlah_produk);
                for(var i = 0, len = this.produks.length; i < len; i++){
                    var arr3 = this.laporans.map((item, i) => Object.assign({}, item, this.jumlah_produk[i]));
                }           
                console.log("== combined array ==");
                console.log(arr3);
                this.merged = arr3;
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
        this.getDataProduk();
        this.getTotalSemua();
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