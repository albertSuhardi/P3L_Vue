<template>
    <v-container>
        <v-card class="content">
            <v-container grid-list-md px-12 py-12>
                <h2 class="text-md-center">Laporan Pengadaan Produk Bulanan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs4>
                            <div style="width:60%" class="mt-2 ml-0">
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
                                    <tr v-for="(item,index) in items" :key="item.index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama_produk}}</td>
                                        <td>Rp. {{ item.jumlah_pengeluaran}},-</td>
                                    </tr>
                                </tbody>
                            </template>
                            <template slot="footer">
                                <div class="mt-5 mb-0">
                                    <tr>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Total Pengeluaran</span>
                                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        <span style="font-weight:bold">Rp. {{ TotalHarga }} ,-</span>
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
                    text: 'Nama Produk',               
                    value: 'nama_produk',
                    sortable: false            
                },             
                {               
                    text: 'Jumlah Pengeluaran',               
                    value: 'jumlah_pengeluaran',
                    sortable: false
                }   
            ],       
            laporans: [],
            nama_layanan: [],
            pengadaan_tahun: [],
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
            TotalHarga: 0,
            idBulan: 0          
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
            //header
            var headRows = function() {
                return [{
                no: "No",
                nama_produk: "Nama Produk",
                jumlah_pengeluaran: "Jumlah Pengeluaran",
                }];
            };
            //body
            var bodyRows = function() {
                let body = [];
                for(var i = 0, len = _this.laporans.length; i < len; i++){
                body.push({
                    no: i+1,
                    nama_produk: _this.laporans[i].nama_produk,
                    jumlah_pengeluaran: "Rp. "+_this.laporans[i].jumlah_pengeluaran+",-"
                });
                }
                return body;
            };
            //text judul
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Laporan Pengadaan Produk Bulanan", 120, 150);
            //text tahun
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Tahun : 2020", 28, 180);
            //text Bulan
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Bulan : "+this.form.bulan, 28, 195);
            //text Total
            doc.setFontSize(10);
            doc.setTextColor(40);
            doc.setFontStyle('bold');
            doc.text("Total Harga : Rp. "+_this.TotalHarga+",-", 320, 195);
            doc.autoTable({
            margin: { top: 220 },
            head: headRows(),
            body: bodyRows()
            });
            //text cetak pada
            doc.setFontSize(15);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            var date = (new Date().toLocaleString('id',{month:'long', year:'numeric', day:'numeric'}))
            doc.text("Dicetak Tanggal : "+date, 28, 610);
            doc.save('Laporan_Pengadaan_Produk_Bulanan.pdf');
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
            var uri = this.$apiUrl + '/laporan/PengadaanProdukTahun?tahun=2020'              
            this.$http.get(uri).then(response =>{    
                this.pengadaan_tahun = response.data.data              
                for(var i = 0, len = this.pengadaan_tahun.length; i < len; i++){
                    if(this.pengadaan_tahun[i].month_name === this.form.bulan){
                        console.log('== ID BULAN ==');
                        this.idBulan = i+1 ;
                        id_bulan_local = i+1 ;
                        console.log(id_bulan_local);
                        this.updateDataTable(id_bulan_local);
                    }
                }            
            })                   
        },
        updateDataTable(id_bulan){   
            var harga = 0           
            var uri = this.$apiUrl + '/laporan/PengadaanProdukBulan?tahun=2020&bulan='+ id_bulan
            this.$http.get(uri).then(response =>{                 
                this.laporans=response.data.data 
                 for(var i = 0, len = this.laporans.length; i < len; i++){
                    harga = harga + parseInt(this.laporans[i].jumlah_pengeluaran)
                }
                this.TotalHarga = harga;
                console.log(harga)          
            })               
        },
        getData(){   
            var harga = 0           
            var uri = this.$apiUrl + '/laporan/PengadaanProdukBulan?tahun=2020&bulan=4'             
            this.$http.get(uri).then(response =>{                 
                this.laporans=response.data.data 
                 for(var i = 0, len = this.laporans.length; i < len; i++){
                    harga = harga + parseInt(this.laporans[i].jumlah_pengeluaran)
                }
                this.TotalHarga = harga;
                console.log(harga)          
            })               
        }, 
        getNamaBulanProduk(){             
            var uri = this.$apiUrl + '/laporan/PengadaanProdukTahun?tahun=2020'              
            this.$http.get(uri).then(response =>{    
                this.pengadaan_tahun = response.data.data              
                this.pengadaan_tahun.forEach(row =>{
                    if(row.jumlah != 0){
                        this.nama_bulan.push(row.month_name)
                    }
                });
            })               
        }  
    },     
    mounted(){         
        this.getData(); 
        this.getNamaBulanProduk();
        this.convertBase64LocalImage();
        } 
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