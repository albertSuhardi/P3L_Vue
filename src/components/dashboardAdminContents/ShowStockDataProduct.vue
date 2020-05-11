<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Stok Produk</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-switch v-model="showable" class="ml-2" label="Show Log"></v-switch>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="stocks" :search="keyword" :loading="load" v-if="!showable">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_pengadaan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>
                                    <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
                                </td>
                                <td>{{ item.id_pengadaan}}</td>  
                                <td>{{ item.pengeluaran }}</td>  
                                <td class="text-center">
                                    <v-btn icon color="green" light @click="updateStatus(item.id_pengadaan)">
                                        <v-icon>mdi-check-decagram</v-icon>
                                    </v-btn>
                                </td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="setDelete(item)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn icon color="blue" light @click="printed(item)">
                                        <v-icon>mdi-printer</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <div v-if="showable">
                    <v-data-table :headers="headers_LOG" :items="stocksLog" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_pengadaan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.created_at}}</td>
                                <td>{{ item.update_at}}</td>
                                <td>{{ item.delete_at}}</td>
                                <td>{{ item.printed_at}}</td>   
                                <td>{{ 'OWNER' }}</td>
                                <td class="text-center">
                                    <v-btn icon color="blue" light @click="printed(item)">
                                        <v-icon>mdi-printer</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                </div>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Stock Produk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Nomor Telephone*" v-model="form.no_telp" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Alamat*" v-model="form.alamat" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script> 
import { log } from 'util'
export default {    
    data () {       
        return {         
            dialog: false,         
            showable: false,
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Supplier',               
                    value: 'nama'             
                },             
                {               
                    text: 'Status',               
                    value: 'status'             
                },             
                {               
                    text: 'Id Pengadaan Barang',               
                    value: 'id_pengadaan'             
                },
                {               
                    text: 'Harga Barang',
                    value: 'pengeluaran'
                },
                {               
                    text: 'Ubah Status',
                    value: null,
                    sortable: false
                },         
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],
             headers_LOG: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Supplier',               
                    value: 'nama'             
                },             
                {               
                    text: 'Dibuat Tanggal',               
                    value: 'created_at'             
                },             
                {               
                    text: 'Diubah Tanggal',               
                    value: 'update_at'             
                },             
                {               
                    text: 'Dihapus Tanggal',               
                    value: 'delete_at'             
                }, 
                {               
                    text: 'Dicetak Tanggal',               
                    value: 'printed_at'             
                },             
                {               
                    text: 'Aktor',               
                    value: 'aktor'             
                },             
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            stocks: [],
            stocksLog: [],         
            detailOrder: [],
            AllProduct: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                no_telp : '',
                alamat : ''
            },         
            stock : new FormData,         
            addOrder : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
            jumlah : 0,
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.stocks=response.data.data;
            }).catch(error =>{               
                this.stocks=[];
            })           
        },
        getDataLog(){             
            var uri = this.$apiUrl + '/pengadaan_produk/log'             
            this.$http.get(uri).then(response =>{                 
                this.stocksLog=response.data.data             
            })               
        },
        getOrderDetail(item){             
            var uri = this.$apiUrl + '/detail_pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.detailOrder=response.data.data;
                for(this.i = 0; this.i < this.detailOrder.length; this.i++){
                  if(this.detailOrder[this.i].id_pengadaan == item.id_pengadaan){
                    this.deleteOnebyOne(this.detailOrder[this.i].id_detail_produk);
                  }
                }
            })               
        }, 
        getProduct(){
            var uri = this.$apiUrl + '/produk'             
            this.$http.get(uri).then(response =>{                 
                this.AllProduct=response.data.data             
            })               
        },        
        getDetail(item){
            var uri = this.$apiUrl + '/detail_pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.detailOrder=response.data.data;  
                for(this.i = 0; this.i < this.detailOrder.length; this.i++){    
                    this.jumlah = 0;
                    if(this.detailOrder[this.i].id_pengadaan === item.id_pengadaan){
                        //this.deleteOnebyOne(this.detailOrder[this.i].id_detail_produk);
                        this.jumlah = this.detailOrder[this.i].jumlah;
                        console.log(item.id_pengadaan)
                        console.log(this.jumlah)
                        console.log(this.detailOrder[this.i].id_produk) 
                        this.reverseProduct(this.detailOrder[this.i].id_produk);
                    }
                }           
            })               
        },
        editHandler(item){           
            if(item.printed_at == null){
                localStorage.setItem('id_pengadaan', item.id_pengadaan);
                this.$router.replace({ path : '/dashboardAdmin/AddStock' })
                console.log(localStorage.getItem('id_pengadaan'))   
            }else{
                this.load = true;
                this.snackbar = true;               
                this.text = 'Tidak dapat merubah transaksi yang telah selesai!';               
                this.color = 'red';               
                this.load = false;               
            }
        },
        updateStatus(statusId){
            console.log(statusId);
            var uri, requestBody;
            requestBody = {
                    id_pengadaan : statusId
                }
            uri = this.$apiUrl + '/pengadaan_produk/status';             
            this.load = true;
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;    
                this.getData();
            }).catch(error =>{               
                this.errors = error;               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
            })     
        },
        deleteData(deleteId) { //mengahapus data             
            this.stock.append('id_pengadaan', deleteId);
            // this.stock.append('aktor', localStorage.getItem('id_pegawai'));       
            var uri = this.$apiUrl + '/pengadaan_produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.stock).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green';
                this.deleteDialog = false;                 
                this.getData(); 
                this.getDataLog();            
            }).catch(error =>{                 
                this.errors = error;                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })         
        },
        deleteOnebyOne(deleteId){
            this.addOrder.append('id_detail_produk', deleteId);
            console.log(deleteId)
            var uri = this.$apiUrl + '/detail_pengadaan_produk/' + deleteId; //data dihapus berdasarkan id_ukuran
            
            this.$http.delete(uri, this.addOrder).then(response =>{ 
                console.log('bisa delete');
            }).catch(error =>{                 

            })
        },
        setDelete(item){     
            this.getOrderDetail(item);
            this.deleteData(item.id_pengadaan);
        },         
        resetForm(){             
            this.form = {               
                nama : '',               
                no_telp : '',
                alamat : ''
            }         
        },
        getColor(status){   
            if(status == 'belum selesai'){
                return 'red'
            }else{
                return 'green'
            }
        },
        printed(item){
            if(item.status == 'belum selesai'){
                this.load = true;               
                this.snackbar = true;               
                this.text = 'Status Masih Belum Selesai';               
                this.color = 'red';               
                this.load = false;               
            }else{
                this.getDetail(item);
                this.print(item);
            }
        },
        print(item){
            console.log(item.id_pengadaan)
            var uri, requestBody;
            requestBody = {
                id_pengadaan : item.id_pengadaan
            }
            uri = this.$apiUrl + '/pengadaan_produk/print';             
            this.load = true;
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;    
                this.getData();
                this.getDataLog();  
            }).catch(error =>{               
                this.errors = error;               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
            })     
        },
        reverseProduct(id){
            var stok;
            var uri, requestBody;

            this.AllProduct.forEach(row => {
                if(row.id_produk == id){
                    stok = 0;
                    stok = parseInt(this.jumlah) + parseInt(row.stok);
                }
            })

            console.log(stok)
            requestBody = {
                id_produk : id,
                stok : stok
            }
            uri = this.$apiUrl + '/reverse_data';             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                console.log('hai');
            }).catch(error =>{})     
        }     
    },     
    mounted(){ 
        this.getData(); 
        this.getDataLog();
        this.getProduct();
    } 
} 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>
