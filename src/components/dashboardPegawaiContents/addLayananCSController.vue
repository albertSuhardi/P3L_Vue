<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Layanan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-switch v-model="showable" class="ml-2" label="Show Log"></v-switch>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="services" :search="keyword" :loading="load" v-if="!showable">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_layanan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.harga}}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_layanan)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <div v-if="showable">
                    <v-data-table :headers="headers_LOG" :items="servicesLog" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_layanan">
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
                    <span class="headline">Layanan Hewan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama Layanan*" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Harga*" v-model="form.harga" required></v-text-field>
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
            showable: false,   
            dialog: false,         
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Layanan',               
                    value: 'nama'             
                },             
                {               
                    text: 'Harga',               
                    value: 'harga'             
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
                    text: 'Layanan',               
                    value: 'nama'             
                },                        
                {               
                    text: 'Dibuat Tanggal',               
                    value: 'created_at'             
                },             
                {               
                    text: 'Diubah tanggal',               
                    value: 'update_at'             
                },
                {               
                    text: 'Dihapus tanggal',               
                    value: 'delete_at'             
                },
                {               
                    text: 'Aktor',
                    value: 'aktor'
                },         
            ],         
            services: [],         
            servicesLog: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                harga : ''
            },         
            service : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/layanan'             
            this.$http.get(uri).then(response =>{                 
                this.services=response.data.data             
            })               
        },  
        getDataLog(){             
            var uri = this.$apiUrl + '/layanan/log'             
            this.$http.get(uri).then(response =>{                 
                this.servicesLog=response.data.data             
            })               
        },                
        updateData(){             
            var uri, requestBody
            requestBody = {
                id_layanan : this.updatedId,
                nama : this.form.nama,
                harga : this.form.harga,
                aktor : localStorage.getItem('id_pegawai')
            }
            uri = this.$apiUrl + '/layanan/' + this.updatedId;             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
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
            this.form.nama = item.nama,           
            this.form.harga = item.harga,
            this.updatedId = item.id_layanan
            console.log(item.id_layanan)
        },
        deleteData(deleteId) { //mengahapus data      
            this.service.append('aktor', localStorage.getItem('id_pegawai'));       
            this.service.append('id_layanan', deleteId);
            var uri = this.$apiUrl + '/layanan/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.service).then(response =>{ 
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
                layanan : '',               
                harga : ''
            }         
        }     
    },     
    mounted(){         
        this.getData();     
        this.getDataLog()
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>