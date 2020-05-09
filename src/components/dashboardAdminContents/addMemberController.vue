<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Member Kouvee</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-switch v-model="showable" class="ml-2" label="Show Log"></v-switch>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Member
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="members" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_member">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.alamat}}</td>
                                <td>{{ item.tgl_lhr }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.status }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_member)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <div v-if="showable">
                    <v-data-table :headers="headers_LOG" :items="membersLog" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_member">
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
                    <span class="headline">Member</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Alamat*" v-model="form.alamat" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <!-- <v-date-picker v-text-field v-model="date" prepend-icon="event" v-on="on" label="Tgl lahir*" required></v-date-picker> -->
                                <v-menu
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
                            <v-col cols="12">
                                <v-text-field label="Nomor Telephone*" v-model="form.no_telp" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-radio-group label="Status*" v-model="form.status" :mandatory="false">
                                    <v-radio label="Member" value="member"></v-radio>
                                    <v-radio label="Customer" value="customer"></v-radio>
                                </v-radio-group>
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
                    text: 'Nama',               
                    value: 'nama'             
                },             
                {               
                    text: 'Alamat',               
                    value: 'alamat'             
                },             
                {               
                    text: 'Tanggal Lahir',               
                    value: 'tgl_lhr'             
                },
                {               
                    text: 'Nomor Telephone',               
                    value: 'no_telp'             
                },
                {               
                    text: 'Status',               
                    value: 'status'             
                },                
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            headers_Log: [             
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
                    text: 'Diupdate Tanggal',               
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
            members: [],         
            membersLog: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                alamat : '',           
                tgl_lhr : '',
                no_telp : '',
                status : ''
            },         
            member : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/member'             
            this.$http.get(uri).then(response =>{                 
                this.members=response.data.data             
            })               
        },
        getDataLog(){             
            var uri = this.$apiUrl + '/member/log'             
            this.$http.get(uri).then(response =>{                 
                this.membersLog=response.data.data             
            })               
        },           
        sendData(){
            this.member.append('nama', this.form.nama);      
            this.member.append('alamat', this.form.alamat);       
            this.member.append('tgl_lhr', this.form.tgl_lhr);
            this.member.append('no_telp', this.form.no_telp);
            this.member.append('status', this.form.status);
            this.member.append('id_pegawai_cs', 0);
            this.member.append('id_pegawai_kasir', 0);
            this.member.append('aktor', localStorage.getItem('id_pegawai'));
            this.member.append('id_member', 1);
            var uri =this.$apiUrl + '/member'             
            this.load = true             
            this.$http.post(uri,this.member).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data pegawai               
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
                id_member : this.updatedId,
                nama : this.form.nama,
                harga : this.form.harga,
                tgl_lhr : this.form.tgl_lhr,
                no_telp : this.form.no_telp,
                status : this.form.status,
                aktor : localStorage.getItem('id_pegawai'),
                id_pegawai_cs : 0,
                id_pegawai_kasir : 0
            }
            uri = this.$apiUrl + '/member/' + this.updatedId;             
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
            this.form.alamat = item.alamat;           
            this.form.tgl_lhr = item.tgl_lhr,
            this.form.no_telp = item.no_telp,        
            this.form.status = item.status,        
            this.updatedId = item.id_member
            console.log(item.id_member)
        },
        
        deleteData(deleteId) { //mengahapus data    
            this.member.append('aktor', localStorage.getItem('id_pegawai'));         
            this.member.append('id_member', deleteId);
            var uri = this.$apiUrl + '/member/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.member).then(response =>{ 
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
                alamat : '',               
                tgl_lhr : '',
                no_telp : '',     
                status : ''
            }         
        }     
    },     
    mounted(){         
        this.getData(); 
        this.getDataLog();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>
