<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Hewan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Masukkan Data Hewan Baru
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="pets" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_hewan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.id_jenis }}</td>
                                <td>{{ item.tgl_lhr}}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_hewan)">
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
                    <span class="headline">Data Hewan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="select.jenis" :hint="`${select.jenis}`"
                                    :items="types"
                                    item-text="Jenis Hewan"
                                    item-value="abbr"
                                    label="Select"
                                    persistent-hint
                                    return-object
                                    single-line
                                    >{{ select.jenis }}</v-select>
                            </v-col>
                            <v-col cols="12">
                                <!-- <v-date-picker v-text-field v-model="date" prepend-icon="event" v-on="on" label="Tgl lahir*" required></v-date-picker> -->
                                <v-menu
                                    v-model="date"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    append-icon="mdi-calender"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="form.tgl_lhr"
                                        label="Tanggal Lahir*"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.tgl_lhr" @input="menu2 = false" required></v-date-picker>
                                </v-menu>
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
                    value: 'id_hewan',             
                },             
                {               
                    text: 'Nama',               
                    value: 'nama'             
                },             
                {               
                    text: 'Jenis Hewan',               
                    value: 'jenis_hewan.jenis'             
                },
                {               
                    text: 'Tanggal Lahir',               
                    value: 'tgl_lhr'             
                },
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            pets: [],
            types: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                tgl_lhr : ''
            },         
            select: {            
                jenis : ''
            },       
            type : new FormData,           
            pet : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/data_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.pets=response.data.data             
            })               
        },
        getType(){             
            var uri = this.$apiUrl + '/jenis_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.types=response.data.data             
            })               
        },         
        sendData(){
            this.pet.append('nama', this.form.nama);      
            this.pet.append('tgl_lhr', this.form.tgl_lhr);       
            this.pet.append('id_hewan', 1);
            var uri =this.$apiUrl + '/data_hewan'             
            this.load = true             
            this.$http.post(uri,this.pet).then(response =>{               
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
            this.pet.append('nama', this.form.nama);      
            this.pet.append('tgl_lhr', this.form.tgl_lhr);       
            this.pet.append('id_hewan', 1);
            var uri = this.$apiUrl + '/data_hewan/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.pet).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data supplier         
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
            this.form.tgl_lhr = item.tgl_lhr;
            this.updatedId = item.id_hewan
            console.log(item.id_hewan)
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.pet.append('id_hewan', deleteId);
            var uri = this.$apiUrl + '/data_hewan/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.pet).then(response =>{ 
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
                tgl_lhr : ''
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