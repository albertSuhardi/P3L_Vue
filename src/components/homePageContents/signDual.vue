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
                <v-toolbar-title align="center">Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    append-icon="mdi-account"
                    label="Login"
                    name="login"
                    type="text"
                  />

                  <v-text-field
                    append-icon="mdi-lock"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
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
        username : '',
        password : '',
      },
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      user: new FormData,
      typeInput: 'new',
      errorType: false,
      errors: '',
      updatedId: ''
    }
  }
}
</script>

<style lang="scss" scoped>

  .v-btn {
    width: 100%;
  }
  .v-toolbar {
    background-color: #B7472A;
    color: white;
  }

</style>