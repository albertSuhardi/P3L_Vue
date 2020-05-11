<template>
  <v-card
    class=""
  >
    <v-container class="margin">
      <v-row dense>
        <!-- <v-col cols="12">
          <v-card
            color="item.color"
            dark
          >
            <v-card-title class="headline">Add New Stock Product</v-card-title>

            <v-card-subtitle>Check your product so you can restok your product if your stock start to be empty.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Add New Stock</v-btn>
            </v-card-actions>
          </v-card>
        </v-col> -->

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle clss="fonr-weight-bold" v-text="item.artist"></v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="sign(item)">Show More</v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script> 
import { log } from 'util'
export default {    
    data () {       
        return {         
            items: [
            {
              color: '#FCB349',
              src: 'https://i.pinimg.com/originals/ab/e5/0b/abe50b3fb45cb809250e2ae7a964d808.gif',
              title: 'Data Hewan Customer',
              artist: 'All pet data can be seen here !',
              // button: this.sign(),
            },
            {
              color: '#C9C3B7',
              src: 'https://media.tenor.com/images/5fdcd5c8ce6becacceca1876b037b564/tenor.gif',
              title: 'Ukuran Hewan',
              artist: 'Want to check all type size or add new size?',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
            {
              color: '#DE5658',
              src: 'https://3.bp.blogspot.com/-8YRRUt0vFdk/WfiNf_I-slI/AAAAAAAMFJg/QNU0upty-rYKHUWuZspA2jPEbfs4PscXwCLcBGAs/s1600/AW598094_00.gif',
              title: 'Jenis Hewan',
              artist: 'You can add new type into your pet list for your pet shop!',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
            
          ],
          order : new FormData,         
        }     
    },     
    methods:{         
        sign(item){
        if(item.title === 'Data Hewan Customer'){
          this.$router.replace({ path : '/dashboardAdmin/HewanControl' })
        }else if(item.title === 'Ukuran Hewan'){
          this.$router.replace({ path : '/dashboardAdmin/addUkuran' })
        }else{
          this.$router.replace({ path : '/dashboardAdmin/addJenis' }) 
        }
      },
    },      
    } 
</script> 


<style lang="scss" scoped>
.margin{
  padding-top: 4%;
  padding-bottom: 6%;
}
</style>