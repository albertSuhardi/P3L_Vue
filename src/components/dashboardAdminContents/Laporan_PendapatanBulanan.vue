<template>
    <v-container>
        <v-card class="content">
            <v-container grid-list-md px-12 py-12>
                <h2 class="text-md-center mb-10">Laporan Pendapatan Bulanan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs4>
                            <div style="width:55%" class="mt-2 ml-0">
                                <v-select 
                                :items="nama_tahun" 
                                v-model="form.tahun" 
                                label="Tahun" 
                                placeholder="Pilih Tahun" 
                                autocomplete 
                                @input='setDataTable'
                                append-icon='mdi-calendar'>
                                </v-select>
                            </div>
                    </v-flex>
                    <v-flex xs4>
                            <div style="width:55%" class="mt-2 ml-0">
                                <v-select 
                                :items="nama_bulan" 
                                v-model="form.bulan" 
                                label="Bulan" 
                                placeholder="April" 
                                autocomplete 
                                @input='setDataTable'
                                append-icon='mdi-calendar'>
                                </v-select>
                            </div>
                    </v-flex>
                    <v-flex xs4 class="text-right">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn 
                                    depressed rounded style="text-transform: none !important;" 
                                    color="blue accent-3"
                                    @click="createPDF()"
                                    v-on="on"
                                    class="mt-3">
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
                        :headers="headers_layanan" 
                        :items="layanans" 
                        :search="keyword" 
                        :loading="load" 
                        :items-per-page="12"
                        class="elevation-2"
                        hide-default-footer
                        >
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama_jasa_layanan}}</td>
                                        <td>Rp. {{ item.harga}} ,-</td>
                                    </tr>
                                </tbody>
                            </template>
                            <template slot="footer">
                                <div class="mt-5 mb-0">
                                    <tr>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Total Harga</span>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Rp. {{ Summary_Layanan }} ,-</span>
                                    </tr>                                    
                                </div>
                            </template>
                    </v-data-table>
                    <br>
                    <br>
                    <br>
                    <v-divider></v-divider>
                    <br>
                    <v-data-table 
                        sortable: false
                        :headers="headers_produk" 
                        :items="produks" 
                        :search="keyword" 
                        :loading="load" 
                        :items-per-page="12"
                        class="elevation-2 mt-12"
                        hide-default-footer
                        >
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama_produk }}</td>
                                        <td>Rp. {{ item.harga }} ,-</td>
                                    </tr>
                                </tbody>
                            </template>
                            <template slot="footer">
                                <div class="mt-5 mb-0">
                                    <tr>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Total Harga</span>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Rp. {{ Summary_Produk }} ,-</span>
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
            headers_layanan: [             
                {               
                    text: 'No',               
                    value: 'no',
                    sortable: false          
                },             
                {               
                    text: 'Nama Jasa Layanan',               
                    value: 'nama_layanan',
                    sortable: false            
                },             
                {               
                    text: 'Harga',               
                    value: 'harga',
                    sortable: false
                }
            ],       
            headers_produk: [             
                {               
                    text: 'No',               
                    value: 'no',
                    sortable: false          
                },             
                {               
                    text: 'Nama Produk',               
                    value: 'nama_produk',
                    sortable: false            
                },             
                {               
                    text: 'Harga',               
                    value: 'harga',
                    sortable: false
                }
            ],   
            tahun_layanans: [],
            tahun_produks: [],
            layanans: [],
            produks: [],
            nama_bulan: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                ukuran : '',           
                harga : '',
                created_at : '',
                update_at : '',
                bulan: 'April',
                tahun: '2020'
            },         
            nama_tahun:['2020'],
            size : new FormData,         
            typeInput: 'new',        
            errors : '',
            Summary_Layanan: 0,
            Summary_Produk: 0 ,
            pendapatan_tahun: []
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
            const header = this.local_image
            // doc
            const doc = new jsPDF('a4','px');
            doc.addImage(header,'JPEG',25,20,400,110);
            // isi auto table
            //header_layanan
            var headRows_layanan = function() {
                return [{
                no: "No",
                nama_jasa_layanan: "Nama Jasa Layanan",
                harga: "Harga",
                }];
            };
            //body_layanan
            var bodyRows_layanan = function() {
                let body = [];
                for(var i = 0, len = _this.layanans.length; i < len; i++){
                body.push({
                    no: i+1,
                    nama_jasa_layanan: _this.layanans[i].nama_jasa_layanan,
                    harga: "Rp. "+_this.layanans[i].harga+",-"
                });
                }
                return body;
            };
            //header_produk
            var headRows_produk = function() {
                return [{
                no: "No",
                nama_produk: "Nama Produk",
                harga: "Harga",
                }];
            };
            //body_produk
            var bodyRows_produk = function() {
                let body = [];
                for(var i = 0, len = _this.produks.length; i < len; i++){
                body.push({
                    no: i+1,
                    nama_produk: _this.produks[i].nama_produk,
                    harga: "Rp. "+_this.produks[i].harga+",-"
                });
                }
                return body;
            };
            //text judul
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Laporan Pendapatan Produk Bulanan", 120, 150);
            //text tahun
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Tahun : 2020", 28, 180);
            //text Total Layanan
            doc.setFontSize(10);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Total Layanan : Rp. "+_this.Summary_Layanan+",-", 320, 180);
            //text Bulan
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Bulan : "+this.form.bulan, 28, 195);
            //text Total Produk
            doc.setFontSize(10);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Total Produk : Rp. "+_this.Summary_Produk+",-", 320, 195);
            //table 1
            doc.autoTable({
            margin: { top: 220 },
            head: headRows_layanan(),
            body: bodyRows_layanan()
            });
            //table 2
            doc.autoTable({
            head: headRows_produk(),
            body: bodyRows_produk()
            });            
            //text cetak pada
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            var date = (new Date().toLocaleString('id',{month:'long', year:'numeric', day:'numeric'}))
            doc.text("Dicetak Tanggal : "+date, 28, 610);
            doc.save('Laporan_Pendapatan_Produk_Bulanan.pdf');
            this.succesPrinted();
        },
        clickedButton(text){
            this.snackbar = true; //mengaktifkan snackbar               
            this.color = 'green'; //memberi warna snackbar               
            this.text = text; //memasukkan pesan ke snackbar               
        },
        methodToRunOnSelect(payload) {
            this.object = payload;
        },
        setDataTable(){  
            var id_bulan_local = 0        
            var uri = this.$apiUrl + '/laporan/PendapatanLayananTahun?tahun=2020'              
            this.$http.get(uri).then(response =>{    
                this.pendapatan_tahun = response.data.data              
                for(var i = 0, len = this.pendapatan_tahun.length; i < len; i++){
                    if(this.pendapatan_tahun[i].nama_bulan === this.form.bulan){
                        console.log('== ID BULAN ==');
                        id_bulan_local = i+1 ;
                        console.log(id_bulan_local);
                        this.updateDataTableLayanan(id_bulan_local);
                        this.updateDataTableProduk(id_bulan_local);
                    }
                }            
            })                   
        },
        updateDataTableProduk(id_bulan){   
            var uri = this.$apiUrl + '/laporan/PendapatanProdukBulan?tahun=2020&bulan='+id_bulan
            var p = 0         
            this.$http.get(uri).then(response =>{                 
                this.produks=response.data.data 
                for(var i = 0, len = this.produks.length; i < len; i++){
                    p = p + parseInt(this.produks[i].harga)
                }
                console.log('=== DATA PRODUK UPDATE ===');
                console.log(this.produks);
                this.Summary_Produk = p;
            })       
        },
        updateDataTableLayanan(id_bulan){   
            var uri = this.$apiUrl + '/laporan/PendapatanLayananBulan?tahun=2020&bulan='+id_bulan
            var k = 0
            this.$http.get(uri).then(response =>{                 
                this.layanans=response.data.data 
                for(var i = 0, len = this.layanans.length; i < len; i++){
                    k = k + parseInt(this.layanans[i].harga)
                }
                this.Summary_Layanan = k;
            })             
        },
        getDataLayanan(){             
            var uri = this.$apiUrl + '/laporan/PendapatanLayananBulan?tahun=2020&bulan=4'             
            var k = 0
            this.$http.get(uri).then(response =>{                 
                this.layanans=response.data.data 
                for(var i = 0, len = this.layanans.length; i < len; i++){
                    k = k + parseInt(this.layanans[i].harga)
                }
                this.Summary_Layanan = k;
            })               
        },    
        getDataProduk(){    
            var p = 0         
            var uri = this.$apiUrl + '/laporan/PendapatanProdukBulan?tahun=2020&bulan=4'             
            this.$http.get(uri).then(response =>{                 
                this.produks=response.data.data 
                for(var i = 0, len = this.produks.length; i < len; i++){
                    p = p + parseInt(this.produks[i].harga)
                }
                console.log('=== DATA PRODUK ===');
                console.log(this.produks);
                this.Summary_Produk = p;
            })               
        },         
        getNamaBulanProduk(){             
            var uri = this.$apiUrl + '/laporan/PendapatanProdukTahun?tahun=2020'             
            this.$http.get(uri).then(response =>{    
                this.tahun_produks = response.data.data              
                this.tahun_produks.forEach(row =>{
                    if(row.produk != 0){
                        this.nama_bulan.push(row.nama_bulan)
                    }
                });
            })               
        },         
        getNamaBulanLayanan(){             
            var uri = this.$apiUrl + '/laporan/PendapatanLayananTahun?tahun=2020'             
            this.$http.get(uri).then(response =>{                 
                this.tahun_layanans=response.data.data  
                this.tahun_layanans.forEach(row => {
                    if(row.jasa_layanan != 0){
                        this.nama_bulan.push(row.nama_bulan)
                    }
                });      
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
    computed: {
        TotalHarga() {
            return this.layanans.reduce((accum, harga) => { return accum + this.layanans.harga }, 0.0)
        }
    },    
    mounted(){         
        this.getDataProduk();
        this.getNamaBulanProduk();    
        this.getNamaBulanLayanan();
        this.getDataLayanan();    
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