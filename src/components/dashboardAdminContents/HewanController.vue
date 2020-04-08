<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Hewan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true" >
                            <v-icon size="18" class="mr-2" >mdi-pencil-plus</v-icon>
                            Tambah Hewan
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field 
                        v-model="search" 
                        append-icon="mdi-search-web" 
                        label="Search Tanggal" 
                        hide-details
                        text
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                :headers="headers" 
                :items="data_hewans"  
                :loading="load"
                :search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_hewan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama}}</td>
                                <td>{{ item.ukuran }}</td>
                                <td>{{ item.jenis }}</td>
                                <td>{{ item.tgl_lhr }}</td>
                                <td>{{ item.nama_member }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" dark @click="editHandler(item)">
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
                                <v-text-field label="Nama Hewan*" v-model="form.nama_hewan" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select :items="nama_ukuran_array" v-model="form.ukuran_hewan" label="Ukuran Hewan" autocomplete></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select :items="nama_jenis_array" v-model="form.jenis_hewan" label="Jenis Hewan" autocomplete></v-select>
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

                                <v-select :items="nama_member_array" v-model="form.nama_member" label="Nama Pemilik" autocomplete></v-select>
                                <!-- <v-autocomplete
                                    v-model="model"
                                    :loading="isLoading"
                                    :search-input.sync="keyword"
                                    color="black"
                                    hide-no-data
                                    hide-selected
                                    item-text="Description"
                                    item-value="API"
                                    label="Public APIs"
                                    placeholder="Start typing to Search"
                                    prepend-icon="mdi-database-search"
                                    return-object
                                ></v-autocomplete> -->

                                <!-- <v-autocomplete 
                                label="Pemilik*" 
                                v-model="form.pemilik" 
                                required
                                :suggestions="cities" 
                                :selection.sync="value"
                                ></v-autocomplete> -->
                                <!-- <v-text-field label="Pemilik*" v-model="form.pemilik" required></v-text-field> -->
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text  @click="resetForm()">Close</v-btn>
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
            search: '',
            show: true,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            dialog: false,         
            id_ukuran: '',
            id_jenis: '',
            id_member: '',
            //Objek Jenis
            AllJenisHewan: [],
            nama_jenis_array : [],
            //Objek Ukuran
            AllUkuranHewan:[],
            nama_ukuran_array : [],
            //Objek Member
            AllDataMember:[],
            nama_member_array : [],
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },            
                {               
                    text: 'Nama Hewan',               
                    value: 'nama_hewan',             
                },             
                {               
                    text: 'Ukuran Hewan',               
                    value: 'ukuran_hewan'             
                },             
                {               
                    text: 'Jenis Hewan',               
                    value: 'jenis_hewan'             
                },
                {               
                    text: 'Tanggal Lahir',               
                    value: 'tgl_lhr'             
                },
                {               
                    text: 'Pemilik',               
                    value: 'pemilik'             
                },           
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            data_hewans: [],         
            AllNamaMember: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                pemilik : '',           
                nama_hewan : '',           
                ukuran_hewan : '',
                jenis_hewan : '',
                tgl_lhr : '',
            },         
            data_hewan : new FormData,         
            typeInput: 'new',        
            errors : '',         
            UpdatedID : '', 
        }     
    },     
    methods:{         
        getData(){           
            var idJenis, idUkuran;
            var uri = this.$apiUrl + '/data_hewan'             
            this.$http.get(uri).then(response =>{                 
                var temp =response.data.data 
                this.data_hewans = temp
            })               
            
        },   
        getDataJenis(){             
            var temp;
            var uri = this.$apiUrl + '/jenis_hewan'             
            this.$http.get(uri).then(response =>{                 
                temp = response.data.data             
                this.AllJenisHewan = temp
                temp.forEach(row =>{
                    this.nama_jenis_array.push(row.jenis)
                });
            })               
        },
        getDataUkuran(){             
            var temp;
            var uri = this.$apiUrl + '/ukuran_hewan'             
            this.$http.get(uri).then(response =>{                 
                temp = response.data.data             
                this.AllUkuranHewan = temp
                temp.forEach(row => {
                    this.nama_ukuran_array.push(row.ukuran)
                });
            })               
        },
        getDataMember(){             
            var temp;
            var uri = this.$apiUrl + '/member'             
            this.$http.get(uri).then(response =>{                 
                temp =response.data.data             
                this.AllDataMember = temp
                temp.forEach(row => {
                    this.nama_member_array.push(row.nama)
                });
            })               
        },       
        sendData(){
            var idJenis , idUkuran , idMember;
            this.data_hewan.append('nama', this.form.nama_hewan);  
            //Ambil id jenis dari membandingkannya dengan inputan
            this.AllJenisHewan.forEach(row => {
                if(row.jenis === this.form.jenis_hewan){
                    idJenis = row.id_jenis
                }
            })
            console.log("Ini ID JENIS : " +idJenis)    
            this.data_hewan.append('id_jenis', idJenis);
            //Ambil id Ukuran
            this.AllUkuranHewan.forEach(row => {
                if(row.ukuran === this.form.ukuran_hewan){
                    idUkuran = row.id_ukuran
                }
            })
            console.log("Ini Id Ukuran : " + idUkuran)    
            this.data_hewan.append('id_ukuran', idUkuran);
            //Ambil id member
            this.AllDataMember.forEach(row => {
                if(row.nama === this.form.nama_member){
                    idMember = row.id_member
                }
            })
            console.log("Ini Id member : " + idMember)           
            this.data_hewan.append('id_member', idMember);
            this.data_hewan.append('id_pegawai_cs', 5);
            this.data_hewan.append('id_pegawai_kasir', 5);
            this.data_hewan.append('created_by', 5);
            this.data_hewan.append('tgl_lhr', this.form.tgl_lhr);
            this.data_hewan.append('id_hewan', 1);
            var uri =this.$apiUrl + '/data_hewan'             
            this.load = true             
            this.$http.post(uri,this.data_hewan).then(response =>{               
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
            console.log("MASUK UPDATE DATA")
            var idJenis , idUkuran , idMember;
            this.data_hewan.append('nama', this.form.nama_hewan);  
            //Ambil id jenis dari membandingkannya dengan inputan
            this.AllJenisHewan.forEach(row => {
                if(row.jenis === this.form.jenis_hewan){
                    idJenis = row.id_jenis
                }
            })
            console.log("Ini ID JENIS : " +idJenis)    
            this.data_hewan.append('id_jenis', idJenis);
            //Ambil id Ukuran
            this.AllUkuranHewan.forEach(row => {
                if(row.ukuran === this.form.ukuran_hewan){
                    idUkuran = row.id_ukuran
                }
            })
            console.log("Ini Id Ukuran : " + idUkuran)    
            this.data_hewan.append('id_ukuran', idUkuran);
            //Ambil id member
            this.AllDataMember.forEach(row => {
                if(row.nama === this.form.nama_member){
                    idMember = row.id_member
                }
            })
            console.log("Ini Id member : " + idMember)
            this.data_hewan.append('id_member', idMember);
            this.data_hewan.append('id_pegawai_cs', 5);
            this.data_hewan.append('id_pegawai_kasir', 5);
            this.data_hewan.append('tgl_lhr', this.form.tgl_lhr);
            this.data_hewan.append('id_hewan', this.UpdatedID);
            var uri =this.$apiUrl + '/data_hewan/edit'             
            this.load = true             
           this.$http.post(uri,this.data_hewan).then(response =>{               
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

        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.nama_hewan = item.nama;           
            this.form.ukuran_hewan = item.ukuran;           
            this.form.jenis_hewan = item.jenis,
            this.form.tgl_lhr = item.tgl_lhr,        
            this.form.nama_member = item.nama_member,             
            this.UpdatedID = item.id_hewan
            console.log("Ini id hewan yang terpilih : " + item.id_hewan);
            console.log("UPDATED ID : " + this.UpdatedID);
        },
        
        deleteData(deleteId) { //mengahapus data             
            this.data_hewan.append('id_hewan', deleteId);
            this.data_hewan.append('deleted_by', 5);
            console.log("Ini ID yg mau di delete : " + deleteId)
            console.log("Ini ID yg nge delete : " + 5)
            var uri = this.$apiUrl + '/data_hewan/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.data_hewan).then(response =>{ 
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
                nama_hewan : '',               
                ukuran_hewan : '',               
                jenis_hewan : '',
                tgl_lhr : '',     
                nama_member : ''
            }
            this.dialog = false
            this.typeInput = 'new'         
        }     
    },
     computed: {
        filteredList() {
        return this.data_hewans.filter(item => {
            return item.nama.toLowerCase().includes(this.search.toLowerCase())
        })
        }
    },     
    mounted(){         
        this.getData();
        this.getDataJenis();
        this.getDataUkuran();
        this.getDataMember();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>