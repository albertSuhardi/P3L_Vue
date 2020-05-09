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
              color: '#E5913B',
              src: 'https://lh3.googleusercontent.com/proxy/RcWl1S8JE7Y9CQh6MiRN0Grxa_ji_E7SAKKuTuBUcz51o0r15_vSCWcTipFLMGcDfL7H0MakB3qUejGdr0hwpfYiT3hi6MnDGlRwcBXpAbJrFA2cEnMBadcACPCtbcDBub9QtcwNprT0dlBj8frgXvLUDDtNQPbnK6BkshYD_WAGgSqjctKAirRF9SRLVxA5',
              title: 'All Pet Data',
              artist: 'All pet data can be seen here !',
              // button: this.sign(),
            },
            {
              color: '#A6D2DD',
              src: 'https://ae01.alicdn.com/kf/H970a0a25a6624e37acf65c415ffd2bdbn.jpg_q50.jpg',
              title: 'All Variant Size',
              artist: 'Want to check all type size or add new size?',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
            {
              color: '#DE5658',
              src: 'https://indopetexpo.id/wp-content/uploads/2018/02/pet-rules-06.png',
              title: 'All Type of Pet',
              artist: 'You can add new type into your pet list for your pet shop!',
              // button: this.$router.replace({ path : '/dashboardAdmin' }),
            },
            
          ],
          order : new FormData,         
        }     
    },     
    methods:{         
        sign(item){
        if(item.title === 'All Pet Data'){
          this.$router.replace({ path : '/dashboardAdmin/HewanControl' })
        }else if(item.title === 'All Variant Size'){
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