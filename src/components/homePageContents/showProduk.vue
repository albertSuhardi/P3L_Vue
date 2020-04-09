<template>
  <v-container fluid>
    <v-data-iterator :items="shows" :search="search" hide-default-footer >
      <template v-slot:header>
        <v-toolbar class="mb-2" color="white" flat >
          <v-toolbar-title>List Produk</v-toolbar-title>
          <v-text-field class="ml-12" v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
            <v-col v-for="item in props.items" :key="item.title" cols="12" sm="6" md="4" lg="3">
                <v-card>
                    <v-img class="white--text align-end" height="200px" v-bind:src="'http://localhost:8081/API_REST/upload/produk/' + item.foto"></v-img>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-item>
                        <v-list-item-content>Produk</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.nama }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Berat Bersih</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.unit }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Stok</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.stok }}</v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
        data() {
            return {
                dialog: false,
                keyword: '',
                shows: [],
                snackbar: false,
                search: '',
                text: '',
                errors: '',
                updatedId: '',
                load: false,
                request : new FormData,
                x: null,
                y: 'top'
            }
        },
        methods: {
            getData() {
                var uri = this.$apiUrl + '/produk'
                this.$http.get(uri).then(response => {
                    this.shows = response.data.data
                })
            },
        },
        mounted() {
            this.getData();
        },
    }
</script>