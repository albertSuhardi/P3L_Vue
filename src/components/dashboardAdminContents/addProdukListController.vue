<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">List Produk</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Produk
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="products" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_produk">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.unit }}</td>
                                <td>{{ item.stok }}</td>
                                <td>{{ item.min_stok }}</td>
                                <td>{{ item.harga }}</td>
                                <v-img class="white--text align-end" height="70px" width="50px"
                                    v-bind:src="'http://localhost:8081/API_REST/upload/produk/'+item.foto">
                                </v-img>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_produk)">
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
                    <span class="headline">Produk Data</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama Produk*" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Keterangan*" v-model="form.unit" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Stok*" v-model="form.stok" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Minimal Stok*" v-model="form.min_stok" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Harga*" v-model="form.harga" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="form.foto" label="Pilih Gambar Produk*"
                                    accept="image/png, image/jpeg, image/bmp, image/jpg" @change="onFileChange"
                                    prepend-icon="mdi-camera"></v-file-input>
                            </v-col>
                        </v-row>
                        <small>*indicates required field</small>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
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
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Nama Produk',               
                    value: 'nama'             
                },             
                {               
                    text: 'Keterangan',               
                    value: 'unit'             
                },             
                {               
                    text: 'Stok',               
                    value: 'stok'             
                },             
                {               
                    text: 'Minimal Stok',               
                    value: 'min_stok'             
                }, 
                {               
                    text: 'Harga',               
                    value: 'harga'             
                }, 
                {
                    text: 'Foto',
                    value: 'foto'
                },       
                {               
                    text: 'Aksi',               
                    value: null             
                },         
            ],         
            products: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                unit : '',
                stok : '',           
                min_stok : '',
                harga : '',
                foto : null,
            },         
            product : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            imageUrl : null,          
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/produk'             
            this.$http.get(uri).then(response =>{                 
                this.products=response.data.data             
            })               
        },  
        sendData(){             
            this.product.append('nama', this.form.nama);             
            this.product.append('unit', this.form.unit);             
            this.product.append('stok', this.form.stok);
            this.product.append('min_stok', this.form.min_stok);  
            this.product.append('harga', this.form.harga);  
            this.product.append('foto', this.form.foto);  
            var uri =this.$apiUrl + '/produk'             
            this.load = true             
            this.$http.post(uri, this.product).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();
                //this.uploadFoto();
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
            requestBody = {
                id_produk : this.updatedId,
                nama : this.form.nama,
                unit : this.form.unit,
                stok : this.form.stok,
                min_stok : this.form.min_stok,
                harga : this.form.harga
            }            
            uri = this.$apiUrl + '/produk/' + this.updatedId;             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
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

        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.nama = item.nama;           
            this.form.unit = item.unit;           
            this.form.stok = item.stok;
            this.form.min_stok = item.min_stok;
            this.form.harga = item.harga;
            this.form.foto = null;        
            this.updatedId = item.id_produk;
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.product.append('id_produk', deleteId);
            var uri = this.$apiUrl + '/produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.product).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getData();             
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })         
        },
        
        setForm(){             
            if (this.typeInput === 'new') {               
                this.sendData()             
            } else {               
                this.updateData()             
            }         
        },   

        resetForm(){             
            this.form = {               
                nama : '',               
                unit : '',               
                stok : '',
                min_stok : '',
                harga : ''
            }         
        },

        onFileChange() {
            let reader = new FileReader()
            reader.onload = () => {
                this.imageUrl = reader.result
            }
            reader.readAsDataURL(this.form.foto)
        },

        uploadFoto(){
           this.product.append('id_produk', deleteId);
            var uri = this.$apiUrl + '/produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.product).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getData();             
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
            })          
        }
    },     
    mounted(){         
        this.getData();     
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>