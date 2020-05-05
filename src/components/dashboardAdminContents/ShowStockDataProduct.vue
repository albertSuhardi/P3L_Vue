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
                                <td>{{ item.status}}</td>
                                <td>{{ item.id_pengadaan}}</td>  
                                <td>{{ 'BOSS' }}</td>  
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_pengadaan)">
                                        <v-icon>mdi-delete</v-icon>
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
                                <td>{{ 'OWNER' }}</td>
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
                    text: 'Aktor'
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
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.stocks=response.data.data             
            })               
        },
        getDataLog(){             
            var uri = this.$apiUrl + '/pengadaan_produk/log'             
            this.$http.get(uri).then(response =>{                 
                this.stocksLog=response.data.data             
            })               
        },         
        editHandler(item){           
            localStorage.setItem('id_pengadaan', item.id_pengadaan);
            localStorage.setItem('name_supplier', item.nama);
            this.$router.replace({ path : '/dashboardAdmin/AddStock' })
            console.log(localStorage.getItem('id_pengadaan'))
        },
        deleteData(deleteId) { //mengahapus data             
            this.stock.append('id_pengadaan', deleteId);
            // this.stock.append('aktor', localStorage.getItem('id_pegawai'));       
            var uri = this.$apiUrl + '/pengadaan_produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.stock).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getData(); 
                this.getDataLog();            
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })         
        },
        setForm(){             
                  
        },         
        resetForm(){             
            this.form = {               
                nama : '',               
                no_telp : '',
                alamat : ''
            }         
        }     
    },     
    mounted(){ 
        this.getData(); 
        this.getDataLog();
    } 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>