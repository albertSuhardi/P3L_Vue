<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="7" md="7">
                        <v-card class="elevation-1 pa-3 login-card">
                            <div class="form">
                                <v-card-text align="center">
                                    <div class="layout column header" style="margin-bottom: 30px">
                                        <h1 class="flex my-4 default--text" style="margin-top:20px" align="center">
                                            Profile</h1>
                                        <br>

                                    </div>

                                    <v-text-field append-icon="mdi-heart" name="nama" label="Nama" type="text"
                                        v-model="nama" height="34" disabled="disabled"></v-text-field>

                                    <!-- <v-date-picker v-model="tgl_lhr" append-icon="mdi-calendar-account" name="tgl_lhr" label="Tanggal Lahir" height="34" disabled="disabled"></v-date-picker>  -->
                                    <v-text-field append-icon="mdi-calendar-account" name="tgl_lhr" label="Tanggal Lahir" type="date"
                                        v-model="tgl_lhr" height="34" disabled="disabled"></v-text-field>

                                    <v-text-field append-icon="mdi-book-account-outline" name="role" label="Jabatan" type="text"
                                        v-model="role" height="34" disabled="disabled"></v-text-field>

                                    <v-text-field append-icon="mdi-home" name="alamat" label="Alamat" type="text"
                                        v-model="alamat" height="34"></v-text-field>

                                    <v-text-field append-icon="mdi-cellphone-iphone" name="no_telp"
                                        label="Nomor Handphone" type="text" v-model="no_telp" height="34"
                                        ></v-text-field>

                                    <div class="login-btn" style="margin-left: 0px;">
                                        <br>
                                        <br>
                                        <v-flex xs12 sm8 md8>
                                            <v-btn block color="primary" @click="edit()" class="elevation-0">Edit
                                            </v-btn>
                                        </v-flex>
                                    </div>
                                </v-card-text>

                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
                    {{ text }}
                    <v-btn dark text @click="snackbar = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            employee: [],
            snackbar: false, 
            nama: '',
            username: '',
            alamat: '',
            no_telp: '',
            role: '',
            tgl_lhr: '',
            color: null, 
            text: '', 
        };
    },
    methods: { 
        getUpdate(){             
            var uri = this.$apiUrl + '/user'             
            this.$http.get(uri).then(response =>{                 
                this.employees=response.data.data             
            })               
        },         
        getData(){
            var i = 0;
            this.employee = []
            var uri = this.$apiUrl + '/user'
            this.$http.get(uri).then(response => {
                this.employee = response.data.data
                console.log(response.data.message)
                console.log(localStorage.getItem('id_pegawai'))
                for (i = 0; i < this.employee.length ; i++) {
                    console.log(localStorage.getItem('id_pegawai'))
                    if(this.employee[i].id_pegawai == localStorage.getItem('id_pegawai')){
                        this.nama = this.employee[i].nama
                        this.tgl_lhr = this.employee[i].tgl_lhr
                        this.role = this.employee[i].role
                        this.no_telp = this.employee[i].no_telp
                        this.alamat = this.employee[i].alamat
                    }
                }
            })
        },

        edit() {
            var uri, requestBody
            requestBody = {
                id_pegawai : localStorage.getItem('id_pegawai'),
                alamat : this.alamat,
                no_telp : this.no_telp,
            }            
            uri = this.$apiUrl + '/user/' + localStorage.getItem('id_pegawai');             
            this.load = true             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getUpdate(); //mengambil data user               
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
        resetForm(){             
            this.form = {               
                nama : '',               
                alamat : ''
            }         
        }     
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped lang="css">
.v-img {
  margin-left: 25%;
  margin-right: 25%;
}
.v-btn {
  width: 50%;
  align-self: center;
}
</style>
