<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Layanan</h2>
                <v-text-field append-icon="mdi-book-account-outline" name="id_transaksi_layanan" label="Id Transaksi" type="text" v-model="id_transaksi_layanan" height="34" disabled="disabled"></v-text-field>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTransaksi = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Pesan Layanan
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
                            Tambah Pesanan Layanan
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
                            <tr v-for="(item,index) in items" :key="item.id_detail_layanan">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.layanan + ' ' + item.jenis + " " + item.ukuran}}</td>
                                <td>{{ item.hargaL}}</td>
                                <td>{{ item.hargaU}}</td>
                                <td>{{ item.hargaJ}}</td>
                                <td>{{ item.jumlah}}</td>
                                <td>{{ item.sub_harga }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_detail_layanan)">
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
                    <span class="headline">Tambah Layanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="name_service_array" v-model="form.name_service" label="Layanan*" autocomplete></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Jumlah*" v-model="form.sum" type='number' required></v-text-field>
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
        <v-dialog v-model="dialogTransaksi" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Pesan Layanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="name_member_array" v-model="name_member" label="Pembeli*" autocomplete></v-select>
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
                    text: 'Nama Layanan',               
                    value: 'layanan'             
                },             
                {               
                    text: 'Harga Layanan',               
                    value: 'hargaL'             
                },
                {               
                    text: 'Harga Ukuran',               
                    value: 'hargaU'             
                },
                {               
                    text: 'Harga Jenis',               
                    value: 'hargaJ'             
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
            id_transaksi_layanan : 0,       
            transactions: [],
            detailUser: [],
            AllDataProduct : [],
            AllDataType : [],
            AllDataSize : [],
            AllDataPet : [],
            AllMember : [],
            name_service_array : [],
            name_member_array : [],
            details: [],         
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            harga: 0,
            name_member: '',
            totalHarga: 0,
            stok: 0,
            simpan: 0,
            form: {            
                name_service : '',
                id_size : '',
                id_type : '',
                sum : 0,                 
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
            var i;
            var uri = this.$apiUrl + '/transaksi_layanan'             
            this.$http.get(uri).then(response =>{                 
                this.transactions=response.data.data;
                for(i = 0; i < this.transactions.length; i++){
                    if(this.transactions[i].sub_total === '0'){
                        if(this.transactions[i].aktor === localStorage.getItem('id_pegawai')){
                            localStorage.setItem("id_transaksi_layanan", this.transactions[i].id_transaksi_layanan);
                            console.log('id t layanan : '+localStorage.getItem("id_transaksi_layanan"))
                            this.id_transaksi_layanan = this.transactions[i].id_transaksi_layanan
                            // console.log('ini id transaksi'+ this.id_transaksi_produk)
                        }
                    }
                }

            })               
        }, 
        getDataTransactionUpdate(){
            var i;
            var uri = this.$apiUrl + '/transaksi_layanan'             
            this.$http.get(uri).then(response =>{                 
                this.transactions=response.data.data
                for(i = 0; i < this.transactions.length; i++){
                    if(this.transactions[i].aktor === localStorage.getItem('id_pegawai')){
                        if(this.transactions[i].id_transaksi_layanan == localStorage.getItem('id_transaksi_layanan')){
                            // console.log('ini id transaksi'+localStorage.getItem("id_transaksi_layanan"))
                            this.id_transaksi_layanan = this.transactions[i].id_transaksi_layanan
                        }
                    }
                }

            })               
        }, 
        getDataDetail(){          
            this.detailUser = [];  
            this.totalHarga = 0; 
            var uri = this.$apiUrl + '/detail_transaksi_layanan'             
            this.$http.get(uri).then(response =>{                 
                this.details=response.data.data
                for (this.i = 0; this.i < this.details.length; this.i++) {
                    //console.log('ini id transaksi'+localStorage.getItem("id_transaksi_layanan"))
                    if(this.details[this.i].id_transaksi_layanan === localStorage.getItem("id_transaksi_layanan")){
                        this.detailUser.push(this.details[this.i]),
                        this.totalHarga = parseFloat(this.details[this.i].sub_harga) + parseFloat(this.totalHarga)
                    }
                }
            })               
        },
        getDataService(){
            var uri = this.$apiUrl + '/layanan'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataService = response.data.data;             
                this.AllDataService.forEach(row => { this.name_service_array.push(row.nama) });
            })               
        },
        getMember(){
            var uri = this.$apiUrl + '/member'             
            this.$http.get(uri).then(response =>{                 
                this.AllMember = response.data.data;             
                this.AllMember.forEach(row => { this.name_member_array.push(row.nama) });
            })               
        },
        getDataType(){
            var uri = this.$apiUrl + '/jenis_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataType = response.data.data;             
            })               
        },
        getDataSize(){
            var uri = this.$apiUrl + '/ukuran_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataSize = response.data.data;             
            })               
        },
        getDataSize(){
            var uri = this.$apiUrl + '/ukuran_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataSize = response.data.data;             
            })               
        },
        getDataPet(){
            var uri = this.$apiUrl + '/data_hewan'             
            this.$http.get(uri).then(response =>{                 
                this.AllDataPet = response.data.data;             
                for(this.i = 0; this.i < this.AllDataPet.length; this.i++){
                    if(this.AllDataPet[this.i].id_hewan == localStorage.getItem('id_hewan')){
                        this.form.id_size = this.AllDataPet[this.i].id_ukuran;
                        this.form.id_type = this.AllDataPet[this.i].id_jenis;
                    }
                }
            })               
        },
        sendData(){
            var subHarga, id_service;
            var hargaS, hargaSz, hargaT;

            this.AllDataService.forEach(row => {
                if(row.nama === this.form.name_service){
                    id_service = row.id_layanan;
                    hargaS = row.harga;
                }
            })

            this.AllDataType.forEach(row => {
                if(row.id_jenis === this.form.id_type){
                    hargaT = row.harga;
                }
            })

            this.AllDataSize.forEach(row => {
                if(row.id_ukuran === this.form.id_size){
                    hargaSz = row.harga;
                }
            })

            subHarga = (parseFloat(hargaS) + parseFloat(hargaSz) + parseFloat(hargaT))* parseInt(this.form.sum);
            this.detail.append('jumlah', this.form.sum);
            this.detail.append('id_layanan', id_service);
            this.detail.append('id_ukuran', this.form.id_size);
            this.detail.append('id_jenis', this.form.id_type);
            this.detail.append('sub_harga', subHarga);
            this.detail.append('id_transaksi_layanan', localStorage.getItem('id_transaksi_layanan'));
            this.detail.append('id_detail_layanan', 1);
            var uri =this.$apiUrl + '/detail_transaksi_layanan'             
            this.load = true             
            this.$http.post(uri,this.detail).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false;     
                this.getDataDetail();
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
            nama = this.name_member;
            
            this.AllMember.forEach(row => {
                if(row.nama === nama){
                    id_member = row.id_member;
                }
            })
            requestBody = {
                id_member : id_member,
                sub_total : this.totalHarga,
                id_pegawai_cs : 0,
                id_transaksi_layanan : localStorage.getItem('id_transaksi_layanan')
            }
            uri = this.$apiUrl + '/transaksi_layanan/';             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialogTransaksi = false; 
                this.resetTransaksi();         
                this.$router.replace({ path : '/dashboardPegawai/LayananCS' }) //mengambil data user                              
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
            var uri, requestBody;
            var subHarga, id_service;
            var hargaS, hargaSz, hargaT;

            this.AllDataService.forEach(row => {
                if(row.nama === this.form.name_service){
                    id_service = row.id_layanan;
                    hargaS = row.harga;
                }
            })
            console.log('Layan'+ hargaS)

            this.AllDataType.forEach(row => {
                if(row.id_jenis === this.form.id_type){
                    hargaT = row.harga;
                }
            })
            console.log('jenis '+ hargaT)

            this.AllDataSize.forEach(row => {
                if(row.id_ukuran === this.form.id_size){
                    console.log(row.harga)
                    hargaSz = row.harga;
                }
            })
            console.log('id_Size '+ this.form.id_size)
            console.log('Size '+ hargaSz)

            //subHarga = parseFloat(hargaS) + parseFloat(hargaSz) + parseFloat(hargaT) * parseFloat(this.form.sum);
            subHarga = (parseFloat(hargaS) + parseFloat(hargaSz) + parseFloat(hargaT));
            subHarga = parseFloat(subHarga)*parseFloat(this.form.sum);
            console.log('total '+ subHarga)

            requestBody = {
                id_detail_layanan : this.updatedId,
                jumlah : this.form.sum,
                id_layanan : id_service,
                id_ukuran : this.form.id_size,
                id_jenis : this.form.id_type,
                sub_harga : subHarga,
                id_transaksi_layanan : localStorage.getItem('id_transaksi_layanan')
            }
            uri = this.$apiUrl + '/detail_transaksi_layanan/' + this.updatedId;             
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
        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.name_service = item.layanan;           
            this.form.sum = item.jumlah;           
            this.updatedId = item.id_detail_layanan;
        },
        deleteData(deletedId) { //mengahapus data    
            this.detail.append('id_detail_layanan', deletedId);
            var uri = this.$apiUrl + '/detail_transaksi_layanan/delete'; //data dihapus berdasarkan id_ukuran
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
        setForm(){             
            if (this.typeInput === 'new') {              
                this.sendData()
            } else {
                this.updateData()
            }         
        },         
        resetForm(){             
            this.form = {               
                name_service : '',
                sum : '',
            }         
        },     
        resetTransaksi(){             
            this.name_member = '',
            this.totalHarga = 0,
            localStorage.setItem('id_transaksi_layanan', null),
            localStorage.setItem('nama_member', null),
            localStorage.setItem('id_hewan', null)
        },     
    },     
    mounted(){
        if(localStorage.getItem('id_transaksi_layanan') == 0){
            this.getDataTransaction(); 
        }else if(localStorage.getItem('id_transaksi_layanan') != 0){
            this.getDataTransactionUpdate(); 
        }
        this.getDataDetail();
        this.getDataService();
        this.getDataPet();
        this.getDataType();
        this.getDataSize();
        this.getMember();

        this.name_member = localStorage.getItem('nama_member');
        console.log(this.name_member)
        console.log(this.form.id_type)
        console.log(this.form.id_size)
        console.log(localStorage.getItem('id_transaksi_layanan'))
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>
