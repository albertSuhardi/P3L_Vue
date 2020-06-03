<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped fixed temporary>
        <v-list-item>
            <v-list-item-avatar>
                <img src="./logo.jpg">
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Kouvee Pet Shop
                </v-list-item-title>
                <v-list-item-title class="subtitle">
                    Number 1 in Country
                </v-list-item-title>
            </v-list-item-content>
                    </v-list-item>
                <v-divider></v-divider>
                    <v-list>
                        <v-list-item v-for="item in items" :key="item.title" link @click="$router.push({name : item.name})">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
 <template v-slot:append>
    <div class="pa-2">
         <v-btn class="mx-2" fab dark x-large color="red" @click="signOut()">
            <v-icon>mdi-door-open</v-icon>
        </v-btn>
            </div>
                </template>
                    </v-navigation-drawer>
                        <v-app-bar app fixed clipped-left height="80px">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <VSpacer />
                    <img class="logo" src="./logo.jpg" style="height:45px;width:45px">
                    <v-toolbar-title style="font-size: 30px;" class="white--text ml-2">
                        Kouvee Pet Shop
                    </v-toolbar-title>
                 </v-app-bar>
            <VContent >
        <router-view />
    </VContent>
    </div>
</template>
<script>
    export default {
        data () {
        return {
        drawer: null,
        items: [
            { title: 'Profile', icon: 'mdi-account-heart', name: 'addAccountController'},
            { title: 'Produk', icon: 'mdi-notebook-multiple', name: 'addProdukCSController'},
            { title: 'Layanan', icon: 'mdi-paw', name: 'addLayananCSController'},
            { title: 'Hewan', icon: 'mdi-dog', name: 'addDataHewanCSController'},
            { title: 'Member', icon: 'mdi-account-check', name: 'addMemberCSController'},
            { title: 'Transaksi Produk', icon: 'mdi-bag-personal', name: 'addPenjualanProdukController'},
            { title: 'Jasa Layanan', icon: 'mdi-dog-service', name: 'addPenjualanLayanan'},
        ],
        }
    },
    methods:{
        signOut(){
            let confirm = window.confirm('Are you sure want to Sign Out?')
            if(confirm){
                // this.$session.clear('id_pegawai');
                localStorage.clear('id_pegawai');
                localStorage.clear('role');
                localStorage.setItem('masuk', 'false');
                this.$router.push('/');
            }else{
                this.$router.push('/dashboardPegawai');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list-item .v-list-item__title {
    color: #D68945;
}
.v-navigation-drawer {
  background-color: white;
  color : #D68945;
  border-color: #D68945;
}

.v-btn{
    align-content: center;
    align-items: center;
}

.v-app-bar {
    background-color: #D39C66;
}

.title {
    color: white;
}

.subtitle {
    color: white;
}

// #btnLog {
//     color: white;
// }

.v.icon{
    color: #D68945;
}

.logo {
  padding: 0.5%;
  border-radius: 100%;
  background-color: white;
}

.v-list-item-icon{
    color: #D68945;
}

.v-toolbar__content > .v-btn.v-btn--icon:first-child, .v-toolbar__extension > .v-btn.v-btn--icon:first-child {
    color: white;
    margin-left: -12px;
}

.mdi{
    color: #D68945;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #D68945;
}

</style>
