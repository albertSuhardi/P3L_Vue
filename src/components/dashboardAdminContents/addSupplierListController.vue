<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Supplier</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-switch v-model="showable" class="ml-2" label="Show Log"></v-switch>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Supplier
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="suppliers" :search="keyword" :loading="load" v-if="!showable">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_supplier">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.no_telp}}</td>
                                <td>{{ item.alamat}}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_supplier)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <div v-if="showable">
                    <v-data-table :headers="headers_LOG" :items="suppliersLog" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_supplier">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.created_at}}</td>
                                <td>{{ item.update_at}}</td>
                                <td>{{ item.delete_at}}</td>
                                <td>{{ item.aktor }}</td>
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
                    <span class="headline">Data Supplier</span>
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
                    text: 'Nama',               
                    value: 'nama'             
                },             
                {               
                    text: 'Nomor Telephone',               
                    value: 'no_telp'             
                },             
                {               
                    text: 'Alamat',               
                    value: 'alamat'             
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
                    text: 'Nama',               
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
            ],         
            suppliers: [],
            suppliersLog: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                no_telp : '',
                alamat : ''
            },         
            supplier : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/supplier'             
            this.$http.get(uri).then(response =>{                 
                this.suppliers=response.data.data             
            })               
        },
        getDataLog(){             
            var uri = this.$apiUrl + '/supplier/log'             
            this.$http.get(uri).then(response =>{                 
                this.suppliersLog=response.data.data             
            })               
        },         
        sendData(){
            this.supplier.append('nama', this.form.nama);      
            this.supplier.append('no_telp', this.form.no_telp);       
            this.supplier.append('alamat', this.form.alamat);       
            this.supplier.append('aktor', localStorage.getItem('id_pegawai'));       
            this.supplier.append('id_supplier', 1);
            var uri =this.$apiUrl + '/supplier'             
            this.load = true             
            this.$http.post(uri,this.supplier).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data supplier         
                this.resetForm();           
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
                id_supplier : this.updatedId,
                nama : this.form.nama,
                no_telp : this.form.no_telp,
                alamat : this.form.alamat,
                aktor : localStorage.getItem('id_pegawai')
            }                     
            uri = this.$apiUrl + '/supplier/' + this.updatedId;             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.status; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data ukuran          
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
            this.form.no_telp = item.no_telp;
            this.form.alamat = item.alamat;
            this.updatedId = item.id_supplier
            console.log(item.id_supplier)
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.supplier.append('id_supplier', deleteId);
            this.supplier.append('aktor', localStorage.getItem('id_pegawai'));       
            var uri = this.$apiUrl + '/supplier/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.supplier).then(response =>{ 
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