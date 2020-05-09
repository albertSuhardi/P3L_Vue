<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" align="center">
              <v-toolbar>
                <v-toolbar-title align="center">Welcome, to Kouvee Pet Shop!</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    append-icon="mdi-account"
                    label="Login"
                    name="login"
                    type="text"
                    v-model="form.username"
                  />

                  <v-text-field
                    append-icon="mdi-lock"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="form.password"
                  />
                  <v-btn color="primary" @click="signIn()">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      <v-snackbar 
        v-model="snackbar"
        :color="color" 
        :multi-line="true" 
        :timeout="6000" 
        :top="y === 'top'"> {{ text }} 
      <v-btn dark text @click="snackbar = false"> Close </v-btn> 
    </v-snackbar> 
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      signUp: false,
      form: {
        username: '',
        password: '',
        
      },
      masuk: false,
      logins: [],
      data: {
        id_pegawai: '',
        role: ''   
      },
      snackbar: false,
      color: null,
      text: '',
      load: false,
      login: new FormData,
      typeInput: 'new',
      errorType: false,
      errors: '',
      updatedId: '',
      x: null,
      y: 'top'
    }
  },

  methods: {
    getData() {
      if (localStorage.getItem('id_pegawai') != null) {
        if(localStorage.getItem('role') == "OWNER"){
          this.$router.push({ path: "/dashboardAdmin"});
        }else if(localStorage.getItem('role') == "CS"){
          this.$router.push({ path: "/dashboardPegawai"});
        }
        else if(localStorage.getItem('role') == "KASIR"){
          this.$router.push({ path: "/dashboardKasir"});
        }
      } else {
        localStorage.setItem("masuk", 'false');
        console.log(localStorage.getItem('masuk'));
        this.snackbar = true;
        this.text = "Welcome";
        this.color = 'blue';
        this.load = false;
      }
    },

    signIn() {
        
        var url = this.$apiUrl + "/login";
        this.login = new FormData();
        this.login.append("username", this.form.username);
        this.login.append("password", this.form.password);
        this.$http.post(url, this.login).then(response => {
          this.messageType = response.data.message;
          console.log(this.messageType);
          if (this.messageType.status == false) {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'red';
            this.load = false;
            this.resetForm();
          } else {
            
            //
            if(response.data.message == "OWNER"){
              this.snackbar = true;
              this.color = 'green';
              this.text = response.data.message;
              this.load = false;
              this.resetForm();
              localStorage.setItem("id_pegawai", response.data.data[0].id_pegawai);
              localStorage.setItem("role", response.data.data[0].role);
              localStorage.setItem("masuk", 'true');
              
              // this.$session.set('id_pegawai', response.data.id_pegawai);
              // console.log(response.data.data.id_pegawai);
              // console.log(this.$session.get('id_pegawai'));

              this.$router.replace({ path : '/dashboardAdmin' });              
              // this.$router.push({
              //   path: "/dashboardAdmin"
              // });
            }else if(response.data.message == "CS"){
              this.snackbar = true;
              this.color = 'green';
              this.text = response.data.message;
              this.load = false;
              this.resetForm();
              console.log(response.data.data);
              localStorage.setItem("id_pegawai", response.data.data[0].id_pegawai);
              localStorage.setItem("role", response.data.data[0].role);
              localStorage.setItem("masuk", 'true');
              console.log(localStorage.getItem("id_pegawai"));

              
              // this.$session.set('id_pegawai', response.data.id_pegawai);
              // console.log(response.data.data);
              // console.log(this.$session.get('id_pegawai'));

              this.$router.push({
                path: "/dashboardPegawai"
              });
            }else if(response.data.message == "KASIR"){
              this.snackbar = true;
              this.color = 'green';
              this.text = response.data.message;
              this.load = false;
              this.resetForm();
              console.log(response.data.data);
              localStorage.setItem("id_pegawai", response.data.data[0].id_pegawai);
              localStorage.setItem("role", response.data.data[0].role);
              localStorage.setItem("masuk", 'true');
              console.log(localStorage.getItem("id_pegawai"));

              
              // this.$session.set('id_pegawai', response.data.id_pegawai);
              // console.log(response.data.data);
              // console.log(this.$session.get('id_pegawai'));

              this.$router.replace({ path : '/dashboardKasir' });              
              
            }
            
          }
        }).catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = error;
          this.color = 'red';
          this.load = false;
        });
    },

    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
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
    width: 100%;
  }
  .v-toolbar {
    background-color: #D68945;
    color: white;
  }

</style>