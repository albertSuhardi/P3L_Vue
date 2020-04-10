<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">List Jenis</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Jenis
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="types" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_jenis">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.jenis }}</td>
                                <td>{{ item.harga}}</td>
                                <td>{{ item.created_at}}</td>
                                <td>{{ item.update_at}}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_jenis)">
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
                    <span class="headline">Jenis Hewan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Jenis*" v-model="form.jenis" required></v-text-field>
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
            dialog: false,         
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Type',               
                    value: 'jenis'             
                },             
                {               
                    text: 'Harga',               
                    value: 'harga'             
                },  
                {               
                    text: 'Dibuat Tanggal',               
                    value: 'created_at'             
                },
                {               
                    text: 'Diupdate Tanggal',               
                    value: 'update_at'             
                },             
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            types: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                jenis : '',           
                harga : ''
            },         
            type : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/jenis_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.types=response.data.data             
            })               
        },         
        sendData(){
            this.type.append('jenis', this.form.jenis);      
            this.type.append('harga', this.form.harga);       
            this.type.append('id_jenis', 1);
            var uri =this.$apiUrl + '/jenis_hewan'             
            this.load = true             
            this.$http.post(uri,this.jenis).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data jenis            
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
                id_jenis : this.updatedId,
                jenis : this.form.jenis,
                harga : this.form.harga
            }
            uri = this.$apiUrl + '/jenis_hewan/' + this.updatedId;             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.status; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data jenis               
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
            this.form.jenis = item.jenis;           
            this.form.harga = item.harga;
            this.updatedId = item.id_jenis
            console.log(item.id_jenis)
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.type.append('id_jenis', deleteId);
            var uri = this.$apiUrl + '/jenis_hewan/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.type).then(response =>{ 
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
                jenis : '',               
                harga : ''
            }         
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