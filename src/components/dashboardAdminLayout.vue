<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped fixed temporary>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Kouvee Pet Shop
                </v-list-item-title>
                <v-list-item-title class="subtitle" color="white">
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
         <v-btn id="btnLog" color=primary block @click="signOut()">Sign Out</v-btn>
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
            { title: 'Pegawai', icon: 'mdi-account-multiple', name: 'addPegawaiController'},
            { title: 'Produk', icon: 'mdi-notebook-multiple', name: 'addProdukListController'},
            { title: 'Hewan', icon: 'mdi-dog', name: 'HewanController'},
            { title: 'Layanan', icon: 'mdi-paw', name: 'addLayananController'},
            { title: 'Jenis Hewan', icon: 'mdi-cat', name: 'addJenisListController'},
            { title: 'Ukuran Hewan', icon: 'mdi-ruler', name: 'addUkuranListController'},
            { title: 'Member', icon: 'mdi-account-check', name: 'addMemberController'},
            { title: 'Data Supplier', icon: 'mdi-account-star', name: 'addSupplierListController'},
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
                this.$router.push('/dashboardAdmin');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list-item .v-list-item__title {
    color: white;
}
.v-navigation-drawer {
  background-color: #B7472A;
  color : #5CA2A5;
}

.v-app-bar {
    background-color: #B7472A;
}

.title {
    color: white;
}

.subtitle {
    color: white;
}

#btnLog {
    color: white;
}

.logo {
  padding: 0.5%;
  border-radius: 100%;
  background-color: white;
}

.mdi {
    color : white;
}
</style>
