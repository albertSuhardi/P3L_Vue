<template>
<v-card class="fill-height" fluid>
  <v-card>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-layout row wrap style="margin:10px">
      <v-row>
        <v-col cols="7">
          <v-text-field append-icon="mdi-book-account-outline" name="id_pengadaan" label="Id Transaksi" type="text" v-model="id_pengadaan" height="34" disabled="disabled"></v-text-field>
          <v-select
            v-model="name_supplier"
            :items="name_supplier_array"
            :rules="[v => !!v || 'Item is required']"
            label="Supplier"
            required
            outlined dense
          ></v-select>
          <!-- <v-text-field class="font-weight-bold" v-model="totalHarga" label="Harga Total" name="totalHarga" outlined single-line>
          </v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
              v-model="totalHarga"
              label="Total Harga"
              color="teal"
              disabled
              class="display-1"
              rows="1.7"
              auto-grow
              rounded
              no-resize
            >
          </v-textarea>
          <v-btn
            color="error"
            class="mr-4"
            @click="updateOrder()"
          >
            Tambah Stok
          </v-btn>

          <v-btn
            color="warning"
            class="mr-4"
            @click="deleteOrder(id_pengadaan)"
          >
            Batal Pesan
          </v-btn>

          <v-btn
            color="green"
            class="mr-4"
            @click="show()"
          >
            Tampil Pengadaan
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-form>
  </v-card>

  <v-card class="try">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <!-- <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field> -->
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="form.name_product"
          :items="name_product_array"
          :rules="[v => !!v || 'Item is required']"
          label="Produk"
          required
        ></v-select>
      </v-col>
      <v-col cols="6">
          <v-text-field label="Jumlah Pembelian" v-model="form.jumlah" type='number' required></v-text-field>
      </v-col>
    </v-row>
    <!-- <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <!-- <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn> -->

    <v-btn
      color="primary"
      class="mr-2"
      @click="setForm()"
    >
      Tambah Item
    </v-btn>

    <!-- <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn> -->
  </v-form>
  <v-form>
    <v-data-table :headers="headers" :items="addOrders" :search="keyword" :loading="load">
        <template v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item,index) in items" :key="item.id_detail_produk">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.id_pengadaan}}</td>
                    <td>{{ item.nama }}</td>
                    <td>{{ item.jumlah}}</td>
                    <td>{{ item.sub_harga}}</td>
                    <td class="text-center">
                        <v-btn icon color="indigo" light @click="editHandler(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon color="error" light @click="deleteData(item.id_detail_produk)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-data-table> 
  </v-form>
  </v-card>
  <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">
          Close
      </v-btn>
  </v-snackbar>
</v-card>
</template>

<script>
  export default {
    data: () => ({
      keyword: '',
      load: false,
      color: null,
      snackbar: false,
      text: '',
      headers: [             
          {               
              text: 'No',               
              value: 'no',             
          },             
          {               
              text: 'Id Order Pemesanan',               
              value: 'id_pengadaan'             
          },             
          {               
              text: 'Nama Produk',               
              value: 'nama'             
          },             
          {               
              text: 'Jumlah Pesanan',               
              value: 'jumlah'             
          },
          {               
              text: 'Harga Sub Pemesanan',               
              value: 'sub_harga'             
          },
          {               
              text: 'Aksi',
              value: null,
              sortable: false
          },         
      ],         
      valid: true,
      typeInput: 'new',        
      id_pengadaan: '',
      id_supplier: 0,
      name: '',
      totalHarga: 0,
      // nameRules: [
      //   v => !!v || 'Name is required',
      //   v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      // ],
      // email: '',
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      // ],
      name_supplier: '',
      // items: [
      //   'Item 1',
      //   'Item 2',
      //   'Item 3',
      //   'Item 4',
      // ],
      // checkbox: false,
      suppliers: [],
      products: [],
      orders: [],
      stock: [],
      addOrders: [],
      name_supplier_array: [],
      name_product_array: [],
      order : new FormData,
      addOrder : new FormData,
      form: {
        name_product: '',
        jumlah: 0,
      },
      updatedId: '',
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      getOrder(){
        var uri = this.$apiUrl + '/pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.stock=response.data.data      
                for(this.i = 0; this.i < this.stock.length; this.i++){
                  if(this.stock[this.i].pengeluaran == 0){
                    this.id_pengadaan = this.stock[this.i].id_pengadaan
                  }else if(this.stock[this.i].id_pengadaan == localStorage.getItem('id_pengadaan')){
                    this.id_pengadaan = this.stock[this.i].id_pengadaan,
                    this.name_supplier = this.stock[this.i].nama
                    console.log(this.name_supplier)
                  }
                }
                
            })               
      },
      getSupplier(){
        var uri = this.$apiUrl + '/supplier'             
            this.$http.get(uri).then(response =>{                 
                this.suppliers=response.data.data             
                this.suppliers.forEach(row => { this.name_supplier_array.push(row.nama) });
            })               
      },
      getProduk(){
        var uri = this.$apiUrl + '/produk'             
            this.$http.get(uri).then(response =>{                 
                this.products=response.data.data
                for(this.i = 0; this.i < this.products.length; this.i++){
                  if( parseInt(this.products[this.i].stok) <= parseInt(this.products[this.i].min_stok) ){
                      // this.products.forEach(row => { this.name_product_array.push(row.nama) });
                      this.name_product_array.push(this.products[this.i].nama);
                      console.log(this.products[this.i].nama);
                  }
                }             
            })               
      },
      getDetailOrder(){
        this.addOrders = [];
        this.totalHarga = 0;
        var uri = this.$apiUrl + '/detail_pengadaan_produk'             
            this.$http.get(uri).then(response =>{                 
                this.orders=response.data.data
                for(this.i = 0; this.i < this.orders.length; this.i++){
                  if(this.orders[this.i].id_pengadaan == this.id_pengadaan){
                    this.addOrders.push(this.orders[this.i]);
                    this.totalHarga = parseInt(this.totalHarga) + parseInt(this.orders[this.i].sub_harga);
                    console.log(this.totalHarga);
                  }
                }
            })               
      },
      sendData(){
            if(this.form.jumlah == 0){
              this.load = true;
              this.snackbar = true;               
              this.text = 'Data belum diisi';               
              this.color = 'red';               
              this.load = false;
              this.resetForm();
            }else{
              var id_produk, harga;
              this.products.forEach(row => { 
                if(row.nama == this.form.name_product){
                  id_produk = row.id_produk;
                  harga = row.harga;
                }
              });
              harga = harga*this.form.jumlah;
              console.log(harga);
              this.addOrder.append('id_produk', id_produk);
              this.addOrder.append('id_pengadaan', this.id_pengadaan);
              this.addOrder.append('sub_harga', harga);
              this.addOrder.append('jumlah', this.form.jumlah);
              this.addOrder.append('id_detail_produk', 1);
              var uri =this.$apiUrl + '/detail_pengadaan_produk'             
              this.load = true;             
              this.$http.post(uri,this.addOrder).then(response =>{               
                  this.snackbar = true; //mengaktifkan snackbar               
                  this.color = 'green'; //memberi warna snackbar               
                  this.text = response.data.message; //memasukkan pesan ke snackbar               
                  this.load = false;                 
                  this.getDetailOrder(); //mengambil data user               
                  this.resetForm(); //mengambil data ukuran                       
              }).catch(error =>{               
                  this.errors = error               
                  this.snackbar = true;               
                  this.text = 'Try Again';               
                  this.color = 'red';               
                  this.load = false;           
              })
            }       
      },
      updateOrder(){
        var id_supplier;
        this.suppliers.forEach( row => { 
          if(row.nama == this.name_supplier){
            id_supplier = row.id_supplier;
          }
         });
         this.load = true             
        if(id_supplier == null){            
          this.snackbar = true;               
          this.text = 'Harus memasukkan data supplier yg dituju!';               
          this.color = 'red';               
          this.load = false;               
        }else{
          var uri, requestBody;
          console.log('this.totalHarga');
          requestBody = {
                id_pengadaan : this.id_pengadaan,
                id_supplier : id_supplier,
                pengeluaran : this.totalHarga
            }
            uri = this.$apiUrl + '/pengadaan_produk/' + this.updatedId;             
            this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;    
                this.resetOrder();
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
            })     
            this.$router.push({ path: "/dashboardAdmin/StockProduct" });
        }
      }, 
      updateData(){             
          var uri, requestBody, id_produk, harga;
          this.products.forEach(row => { 
            if(row.nama == this.form.name_product){
              id_produk = row.id_produk;
              harga = row.harga;
            }
          });
          harga = harga*this.form.jumlah;

          requestBody = {
              id_pengadaan : this.id_pengadaan,
              id_detail_produk : this.updatedId,
              nama : this.form.nama,
              jumlah : this.form.jumlah,
              id_produk : id_produk,
              sub_harga : harga
          }
          uri = this.$apiUrl + '/detail_pengadaan_produk/' + this.updatedId;             
          this.load = true             
          this.$http.put(uri, this.$qs.stringify(requestBody)).then(response =>{ 
              this.snackbar = true; //mengaktifkan snackbar               
              this.color = 'green'; //memberi warna snackbar               
              this.text = response.data.message; //memasukkan pesan ke snackbar               
              this.load = false;               
              this.dialog = false               
              this.getDetailOrder(); //mengambil data ukuran          
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
          this.form.name_product = item.nama,           
          this.form.jumlah = item.jumlah,
          this.updatedId = item.id_detail_produk
          console.log(item.id_detail_produk)
      },
      deleteOrder(idDelete) { //mengahapus data      
        console.log(idDelete);
        if(this.totalHarga == 0){
          this.order.append('id_pengadaan', idDelete);
            var uri = this.$apiUrl + '/pengadaan_produk/delete'; //data dihapus berdasarkan id_ukuran
            this.$http.post(uri, this.order).then(response =>{ 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                              
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Gagal Delete';                 
                this.color = 'red'; 
            })         
          this.$router.replace({ path : '/dashboardAdmin/StockProduct' })    
        }else{
          this.load = true;
          this.snackbar = true;                 
          this.text = 'Pastikan detail pembeliaan produk pengadaan kosong';                 
          this.color = 'red'; 
          this.load = false;
        }
      },
      deleteData(deleteId) { //mengahapus data      
          console.log(deleteId);
          this.addOrder.append('id_detail_produk', deleteId);
          var uri = this.$apiUrl + '/detail_pengadaan_produk/' + deleteId; //data dihapus berdasarkan id_ukuran
          this.$http.delete(uri, this.addOrder).then(response =>{ 
              this.snackbar = true;                 
              this.text = response.data.message;                 
              this.color = 'green'                 
              this.deleteDialog = false;                 
              this.getDetailOrder();             
          }).catch(error =>{                 
              this.errors = error                 
              this.snackbar = true;                 
              this.text = 'Gagal Delete';                 
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
              name_product : '',                   
              jumlah : 0
          }         
      },
      resetOrder(){
        localStorage.setItem('id_pengadaan', 0);
        localStorage.setItem('name_supplier', null);
      }, 
      show(){
        this.resetOrder();
        this.$router.replace({ path : '/dashboardAdmin/ShowStock' })    
      }   
      
    },     
    mounted(){ 
        this.getOrder();
        this.getSupplier(); 
        this.getProduk();
        this.getDetailOrder();
        this.name_supplier = localStorage.getItem('name_supplier');
        console.log(localStorage.getItem('name_supplier'))
    }
  }
</script>

<style scoped lang="css">
.v-data-table{
  margin-top: 2%;
}

.fill-height  {
    padding: 2%;
    margin: 3%;
}

.v-select{
  margin: 0%;
}

.mr-4{
  margin-left: 3.5%;
  color: white;
}

.try{
  padding: 2%;
}
</style>