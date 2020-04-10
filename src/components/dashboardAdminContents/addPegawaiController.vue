<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Kolom Pegawai</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Pegawai
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search-web" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="employees" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_pegawai">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.alamat}}</td>
                                <td>{{ item.tgl_lhr }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.role }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.created_at}}</td>
                                <td>{{ item.update_at}}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_pegawai)">
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
                    <span class="headline">Pegawai</span>
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
                                <v-radio-group label="Pekerjaan*" v-model="form.role" :mandatory="false">
                                    <v-radio label="Customer Service" value="CS"></v-radio>
                                    <v-radio label="Kasir" value="KASIR"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Username*" v-model="form.username" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'"
                                name="input-10-2"
                                label="Password*"
                                hint="At least 8 characters"
                                class="input-group--focused"
                                @click:append="show = !show"
                                v-model="form.password"
                                required
                                ></v-text-field>
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
            show: true,
            password: 'Password',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
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
                    text: 'Role',               
                    value: 'role'             
                },        
                {               
                    text: 'Username',               
                    value: 'username'             
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
            employees: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',           
                alamat : '',           
                tgl_lhr : '',
                no_telp : '',
                username : '',
                password : ''
            },         
            employee : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/pegawai'             
            this.$http.get(uri).then(response =>{                 
                this.employees=response.data.data             
            })               
        },         
        sendData(){
            this.employee.append('nama', this.form.nama);      
            this.employee.append('alamat', this.form.alamat);       
            this.employee.append('tgl_lhr', this.form.tgl_lhr);
            this.employee.append('no_telp', this.form.no_telp);
            this.employee.append('username', this.form.username);
            this.employee.append('password', this.form.password);
            this.employee.append('role', this.form.role);
            this.employee.append('id_pegawai', 1);
            var uri =this.$apiUrl + '/pegawai'             
            this.load = true             
            this.$http.post(uri,this.employee).then(response =>{               
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
                id_pegawai : this.updatedId,
                nama : this.form.nama,
                alamat : this.form.alamat,
                tgl_lhr : this.form.tgl_lhr,
                no_telp : this.form.no_telp,
                username : this.form.username,
                password : this.form.password,
                role : this.form.role
            }            
            uri = this.$apiUrl + '/pegawai/' + this.updatedId;             
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
            this.form.username = item.username,        
            this.form.password = item.password,        
            this.form.role = item.role,        
            this.updatedId = item.id_pegawai
            console.log(item.id_pegawai)
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.employee.append('id_pegawai', deleteId);
            var uri = this.$apiUrl + '/pegawai/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.employee).then(response =>{ 
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
                role : '',
                username : '',
                password : ''
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