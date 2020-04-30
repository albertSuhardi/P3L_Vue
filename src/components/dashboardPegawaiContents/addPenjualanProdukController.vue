<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Penjualan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-switch v-model="showable" class="ml-2" label="Show Log"></v-switch>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3" @click="setForm()">
                            <v-icon size="18" class="mr-2" >mdi-pencil-plus</v-icon>
                            Buat Transaksi
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="transactions" :search="keyword" :loading="load" v-if="!showable">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_transaksi_produk">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.id_transaksi_produk }}</td>
                                <td>{{ item.member }}</td>
                                <td>{{ item.total_harga }}</td>
                                <td>{{ item.diskon }}</td>
                                <td>{{ item.sub_total }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteHandler(item)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn icon color="green" light @click="updateData(item)">
                                        <v-icon>mdi-lock-check</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <div v-if="showable">
                    <v-data-table :headers="headers_LOG" :items="transactionsLog" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_transaksi_produk">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.id_transaksi_produk }}</td>
                                <td>{{ item.created_at }}</td>
                                <td>{{ item.update_at }}</td>
                                <td>{{ item.delete_at }}</td>
                                <td>{{ item.aktors }}</td>
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

import { log } from 'util'
export default {    
    data () {       
        return {       
            seen: false,
            showable: false,           
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Id Produk',               
                    value: 'id_produk'             
                },             
                {               
                    text: 'Member',               
                    value: 'member'             
                },
                {               
                    text: 'Total Harga',               
                    value: 'total_harga'             
                }, 
                {               
                    text: 'Diskon',               
                    value: 'diskon'             
                },      
                {               
                    text: 'Sub Total harga',               
                    value: 'sub_total'             
                },      
                {               
                    text: 'Aksi',               
                    value: null             
                },         
            ],headers_LOG: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Id Transaksi',               
                    value: 'id_transaksi_produk'             
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
                    value: 'aktors'             
                },         
            ],               
            trans: [],     
            transactions: [],
            transactionsLog: [],    
            AllDetail: [],     
            AllDetailChoose: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                unit : '',
            },         
            transaction : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            id: 0,          
        }     
    },     
    methods:{         
        getData(){             
            this.transactions = [];
            var uri = this.$apiUrl + '/transaksi_produk'             
            this.$http.get(uri).then(response =>{                 
                this.trans = response.data.data
                for(this.i = 0; this.i < this.trans.length; this.i++){
                    if(this.trans[this.i].aktor === localStorage.getItem("id_pegawai")){
                        this.transactions.push(this.trans[this.i])
                    }
                }
            })               
        },  
        getDataLog(){             
            var uri = this.$apiUrl + '/transaksi_produk/log'             
            this.$http.get(uri).then(response =>{                 
                this.transactionsLog=response.data.data             
            })               
        },  
        sendData(){       
            this.transaction.append('aktor', localStorage.getItem('id_pegawai'));
            this.transaction.append('id_transaksi_produk', 1);
            var uri =this.$apiUrl + '/transaksi_produk'             
            this.load = true;             
            this.$http.post(uri,this.transaction).then(response =>{               
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
        updateData(item){             
            var uri, requestBody
            requestBody = {
                sub_total : item.sub_total,
                id_pegawai_cs : localStorage.getItem('id_pegawai'),
                id_transaksi_produk : item.id_transaksi_produk
            }
            uri = this.$apiUrl + '/transaksi_produk/pesan';             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;     
                this.getData();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;                
            })         
        },             
        editHandler(item){           
            localStorage.setItem('id_transaksi_produk', item.id_transaksi_produk);
            localStorage.setItem('nama_member', item.member);
            this.$router.replace({ path : '/dashboardPegawai/TransaksiCS' })
        },
        deleteData(deleteId) { //mengahapus data             
            this.transaction.append('id_transaksi_produk', deleteId);
            var uri = this.$apiUrl + '/transaksi_produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.transaction).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green';
                this.getData();
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
                this.load = false;  
            })         
        },
        deleteHandler(item){
            if(item.sub_total === '0'){
                this.deleteData(item.id_transaksi_produk)
            }else{
                localStorage.setItem('id_transaksi_produk', item.id_transaksi_produk);
                localStorage.setItem('nama_member', item.member);
                this.$router.replace({ path : '/dashboardPegawai/TransaksiCS' })
            }
        },
        setForm(){             
            this.sendData(),
            localStorage.setItem('id_transaksi_produk', 0)
            this.$router.replace({ path : '/dashboardPegawai/TransaksiCS' })
        },   
        reverseData(){
            var uri, requestBody
            var id_produk;
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    id_produk = row.id_produk;
                    console.log(row.stok)
                    console.log(this.form.jumlah)
                    this.stok = parseInt(row.stok) + parseInt(this.form.jumlah);
                }
            })
            console.log(this.stok)
            requestBody = {
                id_produk : id_produk,
                stok : this.stok
            }
            localStorage.setItem('stok', this.stok);
            uri = this.$apiUrl + '/reverse_data/' + this.id_produk;             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{      
                this.stok = 0;  
            }).catch(error =>{               
                this.errors = error;           
            })         
        },        
        resetForm(){             
            this.form = {               
                nama : '',               
                unit : ''
            }         
        },
    },     
    mounted(){         
        this.getData();  
        this.getDataLog();     
        console.log(localStorage.getItem('id_transaksi_produk'))
        // localStorage.setItem('id_transaksi_produk', null);   
        // localStorage.setItem('nama_member', null);   
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>
