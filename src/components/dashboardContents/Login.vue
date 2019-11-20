<template>
<v-app>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="8" md="8" style="padding:0px">
                    <v-card>
                        <v-row>
                            <v-col cols="6">
                                <div class="header">
                                    <div id= "title">
                                        Sign In
                                    </div>
                                    <div id=tagline>
                                        Halaman Login
                                    </div>
                                    <div class="form">
                                        <v-text-field v-model="form.email" label="Email" outlined height=50>
                                        </v-text-field>
                                        <v-text-field v-model="form.password" label="Password" type="password" outlined height=50>
                                        </v-text-field>
                                        <v-btn @click="login()" height="40" block color="info" class="elevation-0">SIGN IN</v-btn>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="6" md="6" style="padding:0px"> 
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
export default {
    data(){
        return{
            form: {
                email: null,
                password: null,
            },
             user : new FormData
        }   
    },
    methods:{
        login(){
            var url = this.$apiUrl+'/auth'
            this.user = new FormData()
            this.user.append('email', this.form.email);
            this.user.append('password', this.form.password);
            this.$http.post(url,this.user).then(response =>{
                if(!!response.data.token){
                    localStorage.setItem('token',response.data.token)
                    this.$router.push({name: 'UserController'})
                }else{
                    alert('Gagal Login')
                }
            })
        }
    }
}
</script>

<style>
.header{
    margin-left: 70px;
    margin-top: 70px;
}
.form{
    margin-top: 70px;
    margin-bottom: 60px;
    margin-right: 60px;
}
#title{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 37px;
}
</style>