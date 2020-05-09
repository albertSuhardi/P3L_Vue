<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <!-- <v-btn class="mx-2" fab dark small color="primary" @click="back()">
                    <v-icon dark>mdi-minus</v-icon>
                </v-btn> -->
                <h2 class="text-md-center">Transaction</h2>
                <v-text-field append-icon="mdi-book-account-outline" name="id_transaksi_produk" label="Id Transaksi" type="text" v-model="id_transaksi_produk" height="34" disabled="disabled"></v-text-field>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTransaksi = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Pesan Produk
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-xl-right">
                        <v-text-field class="font-weight-bold" v-model="totalHarga" label="Harga Total" name="totalHarga" disabled="disabled">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Pesanan Produk
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="detailUser" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_detail_produk">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama_produk }}</td>
                                <td>{{ item.harga}}</td>
                                <td>{{ item.jumlah}}</td>
                                <td>{{ item.sub_harga }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteHandler(item)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table> 
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Produk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="nama_produk_array" v-model="form.nama_produk" label="Nama Produk*" autocomplete></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Jumlah Pembelian*" v-model="form.jumlah" type='number' required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="setDataClose()">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogTransaksi" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Pesan Produk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="nama_member_array" v-model="nama_member" label="Pembeli*" autocomplete></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Harga Pembelian*" v-model="totalHarga" type='number' disabled="disabled"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogTransaksi = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="updateTransaksi()">Save</v-btn>
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
            dialogTransaksi: false,
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Nama Produk',               
                    value: 'nama_produk'             
                },             
                {               
                    text: 'Harga Per Item',               
                    value: 'harga'             
                },             
                {               
                    text: 'Jumlah Pesanan',               
                    value: 'jumlah'             
                },
                {               
                    text: 'Harga Total PerItem',               
                    value: 'sub_harga'             
                },
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            id_transaksi_produk : 0,       
            transactions: [],
            detailUser: [],
            AllDataProduct : [],
            AllProduct : [],
            AllMember : [],
            nama_produk_array : [],
            nama_member_array : [],
            details: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            harga: 0,
            nama_member: '',
            totalHarga: 0,
            stok: 0,
            simpan: 0,
            form: {            
                nama_produk : '',                      
                jumlah : 0
            },         
            detail : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',
            deletedId : '',
        }     
    },     
    methods:{        
        getDataTransaction(){
            console.log(localStorage.getItem("id_pegawai"))
            var i;
            var uri = this.$apiUrl + '/transaksi_produk/id'             
            this.$http.get(uri).then(response =>{                 
                this.transactions=response.data.data
                for(i = 0; i < this.transactions.length; i++){
                    if(this.transactions[i].aktor === localStorage.getItem('id_pegawai')){
                        localStorage.setItem("id_transaksi_produk", this.transactions[i].id_transaksi_produk);
                        console.log('ini id transaksi'+localStorage.getItem("id_transaksi_produk"))
                        this.id_transaksi_produk = this.transactions[i].id_transaksi_produk;
                    }
                }

            })               
        }, 
        getDataTransactionUpdate(){
            console.log(localStorage.getItem("id_pegawai"))
            var i;
            var uri = this.$apiUrl + '/transaksi_produk/id'             
            this.$http.get(uri).then(response =>{                 
                this.transactions=response.data.data
                for(i = 0; i < this.transactions.length; i++){
                    if(this.transactions[i].aktor === localStorage.getItem('id_pegawai')){
                        console.log('hai')
                        console.log('ini id transaksi'+this.transactions[i].id_transaksi_produk)
                        if(this.transactions[i].id_transaksi_produk == localStorage.getItem('id_transaksi_produk')){
                            console.log('ini id transaksi'+localStorage.getItem("id_transaksi_produk"))
                            this.id_transaksi_produk = this.transactions[i].id_transaksi_produk
                            console.log('ini id transaksi'+ this.id_transaksi_produk)
                        }
                    }
                }

            })               
        }, 
        getDataDetail(){          
            this.detailUser = [];  
            this.totalHarga = 0; 
            var uri = this.$apiUrl + '/detail_transaksi_produk'             
            this.$http.get(uri).then(response =>{                 
                this.details=response.data.data
                for (this.i = 0; this.i < this.details.length; this.i++) {
                    console.log('ini id transaksi'+localStorage.getItem("id_transaksi_produk"))
                    if(this.details[this.i].id_transaksi_produk === localStorage.getItem("id_transaksi_produk")){
                        this.detailUser.push(this.details[this.i]),
                        this.totalHarga = parseFloat(this.details[this.i].sub_harga) + parseFloat(this.totalHarga)
                    }
                }
            })               
        },
        getDataProduk(){
            var uri = this.$apiUrl + '/produk'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataProduct = response.data.data;             
                this.AllDataProduct.forEach(row => { this.nama_produk_array.push(row.nama) });
            })               
        },
        getProduk(){
            var uri = this.$apiUrl + '/produk'             
            this.$http.get(uri).then(response =>{                 
                this.AllProduct = response.data.data;             
            })               
        },
        getMember(){
            var uri = this.$apiUrl + '/member'             
            this.$http.get(uri).then(response =>{                 
                this.AllMember = response.data.data;             
                this.AllMember.forEach(row => { this.nama_member_array.push(row.nama) });
            })               
        },
        sendData(){
            var subHarga, id_produk;
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    subHarga = row.harga*this.form.jumlah;
                }
            })
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    id_produk = row.id_produk;
                }
            }) 
            this.detail.append('id_produk', id_produk);
            this.detail.append('sub_harga', subHarga);
            this.detail.append('jumlah', this.form.jumlah);      
            this.detail.append('id_transaksi_produk', localStorage.getItem('id_transaksi_produk'));
            this.detail.append('id_detail_produk', 1);

            var uri =this.$apiUrl + '/detail_transaksi_produk'             
            this.load = true             
            this.$http.post(uri, this.detail).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false;     
                this.getDataDetail(); //mengambil data pegawai                  
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },  
        updateTransaksi(){             
            var uri, requestBody
            var id_member, nama;
            nama = this.nama_member;
            
            this.AllMember.forEach(row => {
                if(row.nama === nama){
                    id_member = row.id_member;
                }
            })
            requestBody = {
                id_member : id_member,
                sub_total : this.totalHarga,
                id_pegawai_cs : 0,
                id_transaksi_produk : localStorage.getItem('id_transaksi_produk')
            }
            uri = this.$apiUrl + '/transaksi_produk/';             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialogTransaksi = false; 
                this.resetTransaksi();         
                this.$router.replace({ path : '/dashboardPegawai/JualProdukCS' }) //mengambil data user                              
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;                
            })         
        },        
        updateData(){             
            var uri, requestBody
            var subHarga, id_produk;
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    subHarga = row.harga*this.form.jumlah;
                }
            })
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    id_produk = row.id_produk;
                }
            })
            
            requestBody = {
                id_detail_produk : this.updatedId,
                id_produk : id_produk,
                sub_harga : subHarga,
                jumlah : this.form.jumlah,
                id_transaksi_produk : localStorage.getItem('id_transaksi_produk')
            }
            uri = this.$apiUrl + '/detail_transaksi_produk/' + this.updatedId;             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false;               
                this.getDataDetail(); //mengambil data user                              
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        }, 
        minusData(){
            var uri, requestBody;
            var id_produk;
            this.AllDataProduct.forEach(row => {
                if(row.nama === this.form.nama_produk){
                    id_produk = row.id_produk;
                    this.stok = parseInt(row.stok) - parseInt(this.form.jumlah);
                }
            })
            console.log('minus Stok' + this.stok)
            requestBody = {
                id_produk : id_produk,
                stok : this.stok
            }
            uri = this.$apiUrl + '/reverse_data/' + this.id_produk;             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.dialog = false;
                this.resetForm();   
                this.stok = 0;
            }).catch(error =>{               
                this.errors = error;           
            })         
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
        deleteHandler(item){              
            this.form.nama_produk = item.nama_produk;           
            this.form.jumlah = item.jumlah;           
            this.deletedId = item.id_detail_produk;
            this.reverseData(),
            this.deleteData(item.id_detail_produk),
            this.resetForm();
        },
        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.nama_produk = item.nama_produk;           
            this.form.jumlah = item.jumlah;           
            this.updatedId = item.id_detail_produk;
            this.reverseData(),
            this.getProduk()
        },
        deleteData(deletedId) { //mengahapus data    
            this.detail.append('id_detail_produk', this.deletedId);
            var uri = this.$apiUrl + '/detail_transaksi_produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.detail).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getDataDetail();             
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })         
        },
        setDataClose(){             
            if (localStorage.getItem('stok') == 0) {              
                this.dialog = false;
            } else {
                this.minusData()
            }         
        },         
        setForm(){             
            if (this.typeInput === 'new') {              
                this.sendData(),
                this.minusData(),
                this.getDataProduk()
            } else {
                this.updateData(),
                this.minusData(),
                this.getDataProduk()
            }         
        },         
        resetForm(){             
            this.form = {               
                nama_produk : '',                   
                jumlah : 0
            }         
        },     
        resetTransaksi(){             
            this.nama_member = '',
            this.totalHarga = 0,
            localStorage.setItem('id_transaksi_produk', null),
            localStorage.setItem('member', null)
        }     
    },     
    mounted(){
        if(localStorage.getItem('id_transaksi_produk') == 0){
            this.getDataTransaction(); 
        }else if(localStorage.getItem('id_transaksi_produk') != 0){
            this.getDataTransactionUpdate(); 
        }
        this.getDataDetail();
        this.getDataProduk();
        this.getMember();
        this.getProduk();
        this.nama_member = localStorage.getItem('nama_member');
        console.log(localStorage.getItem('id_transaksi_produk'))
        localStorage.setItem('stok', 0);
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>
