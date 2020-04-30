<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Jasa Layanan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3" @click="dialog = true">
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
                            <tr v-for="(item,index) in items" :key="item.id_transaksi_layanan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.id_transaksi_layanan }}</td>
                                <td>{{ item.member }}</td>
                                <td>{{ item.hewan }}</td>
                                <td>{{ item.status_layanan }}</td>
                                <td>{{ item.diskon }}</td>
                                <td>{{ item.sub_total }}</td>
                                <td>{{ item.total_harga }}</td>
                                <td class="text-center">
                                    <v-btn icon color="green" light @click="updateLayanan(item)">
                                        <v-icon>mdi-check-decagram</v-icon>
                                    </v-btn>
                                </td>
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
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Jasa Layanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="name_animal_array" v-model="form.name_animal" label="Nama Hewan" autocomplete></v-select>
                            </v-col>
                            <v-btn color="blue darken-1" @click="getMember()">Find Owner</v-btn>
                            <v-col cols="12">
                                <v-text-field label="Pemilik*" v-model="form.name_member" required></v-text-field>
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
            seen: false,
            dialog: false,
            showable: false,           
            keyword: '',         
            headers: [             
                {               
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Id Layanan',               
                    value: 'id_transaksi_layanan'             
                },             
                {               
                    text: 'Member',               
                    value: 'member'             
                },
                {               
                    text: 'Hewan',               
                    value: 'hewan'             
                }, 
                {               
                    text: 'Layanan Status',               
                    value: 'status_layanan'             
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
                    text: 'Total Harga',               
                    value: 'total_harga'             
                },      
                {               
                    text: 'Ubah Status',               
                    value: null             
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
            AllAnimal: [], 
            AllMember: [],    
            name_animal_array: [],     
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                name_animal : '',           
                name_member : '',
                id_member : '',
                id_hewan : '',
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
            var uri = this.$apiUrl + '/transaksi_layanan'             
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
            var uri = this.$apiUrl + '/transaksi_layanan/log'             
            this.$http.get(uri).then(response =>{                 
                this.transactionsLog=response.data.data             
            })               
        },  
        getAnimal(){             
            var uri = this.$apiUrl + '/data_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllAnimal=response.data.data             
                this.AllAnimal.forEach(row => { this.name_animal_array.push(row.nama) });
            })               
        },  
        getMember(){             
            var uri = this.$apiUrl + '/data_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllMember=response.data.data             
                for(this.i = 0; this.i < this.AllMember.length; this.i++){
                    if(this.AllMember[this.i].nama === this.form.name_animal){
                        this.form.name_member = this.AllMember[this.i].nama_member
                        this.form.id_member = this.AllMember[this.i].id_member
                        console.log(this.form.name_member)
                    }
                }
            })               
        },  
        sendData(){    
            this.AllAnimal.forEach(row => {
                if(row.nama === this.form.name_animal){
                    this.form.id_hewan = row.id_hewan;
                }
            })
            this.transaction.append('status_layanan', "belum selesai");
            this.transaction.append('status_pembayaran', "belum lunas");
            this.transaction.append('id_member', this.form.id_member);
            this.transaction.append('id_hewan', this.form.id_hewan);
            this.transaction.append('aktor', localStorage.getItem('id_pegawai'));
            this.transaction.append('id_transaksi_layanan', 1);
            var uri =this.$apiUrl + '/transaksi_layanan'             
            this.load = true;             
            this.$http.post(uri,this.transaction).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;                 
                this.getData(); //mengambil data user               
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })
        },    
        updateLayanan(item){             
            var uri, requestBody
            requestBody = {
                id_transaksi_layanan : item.id_transaksi_layanan,
                status_layanan : "selesai"
            }
            uri = this.$apiUrl + '/transaksi_layanan/service';              
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
        updateData(item){             
            var uri, requestBody
            requestBody = {
                sub_total : item.sub_total,
                id_pegawai_cs : localStorage.getItem('id_pegawai'),
                id_transaksi_layanan : item.id_transaksi_layanan
            }
            uri = this.$apiUrl + '/transaksi_layanan/pesan';             
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
            localStorage.setItem('id_transaksi_layanan', item.id_transaksi_layanan);
            localStorage.setItem('nama_member', item.member);
            localStorage.setItem('id_hewan', item.id_hewan);
            this.$router.replace({ path : '/dashboardPegawai/ServiceCS' })
        },
        deleteData(deleteId) { //mengahapus data             
            this.transaction.append('id_transaksi_layanan', deleteId);
            var uri = this.$apiUrl + '/transaksi_layanan/delete'; //data dihapus berdasarkan id_ukuran
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
                this.deleteData(item.id_transaksi_layanan)
            }else{
                localStorage.setItem('id_transaksi_layanan', item.id_transaksi_layanan);
                localStorage.setItem('id_hewan', item.id_hewan);
                localStorage.setItem('nama_member', item.member);
                this.$router.replace({ path : '/dashboardPegawai/ServiceCS' })
            }
        },
        setForm(){             
            this.sendData(),
            localStorage.setItem('id_hewan', this.form.id_hewan),
            localStorage.setItem('id_transaksi_layanan', 0),
            localStorage.setItem('nama_member', this.form.name_member),
            console.log('nama member'+this.form.name_member)
            this.resetForm()
            this.$router.replace({ path : '/dashboardPegawai/ServiceCS' })
        },   
        resetForm(){             
            this.form = {               
                name_animal : '',           
                name_member : '',
                id_member : '',
                id_hewan : ''
            }         
        },
    },     
    mounted(){         
        this.getData();  
        this.getDataLog();
        this.getAnimal();     
        console.log(localStorage.getItem('id_transaksi_layanan'))
        // localStorage.setItem('id_transaksi_layanan', null);   
        // localStorage.setItem('id_hewan', null);   
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>

