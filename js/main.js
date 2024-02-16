let eventBus = new Vue()

Vue.component('kandan', {
    template: `
    <div class='kandan'>
    
    <createCard></createCard>
    <div class="cols">
       
            <col1></col1>
            <col2></col2>
            <col3></col3>
            <col4></col4>
        
     </div>
    </div>
    `,
    data() {
        return {

        }
    },
    updated() {

    }
})
Vue.component('col1', {
    template: `
        <div class="col">
            <h3>запланированные задачи</h3>
            <div>
                <div v-for="card in oneColList" class="col_item">
                    <div class="edit_form" v-if="card.edit" >
                        <label for="list_name" class="title">название: </label>
                        <input type="text" id="list_name" v-model="card.list_name" >
                        <label for="cardDiscription" class="title">Описание: </label>
                        <input type="text" id="cardDiscription" v-model="card.cardDiscription">
                        <label for="deadLine" class="title">Дэдлайн: </label>
                        <input type="date" id="deadLine" v-model="card.deadLine">
                        <input type="submit" @click="savingChanges(card)" class="btn">
                    </div>  
                    <div v-else>
                        <p><b>название:</b> {{ card.list_name}} </p>
                        <p><b>описание:</b> {{ card.cardDiscription }}</p>
                        <p><b>дэдлайн:</b>{{ card.deadLine }}</p>
                        <p v-if="card.edited"><b>Последнее редактирование:</b> {{ card.edited }}</p>
                        <div class="btns">
                            <div>
                                <button class="del" @click="del(card)">Удалить</button>
                                <button class="edit" @click="edit(card)">Редактировать</button>
                                <button class="next">переместить вперед</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `, data () {
        return {
            oneColList: [],
        }
    },
    methods: {
       del(card){
            this.oneColList.splice(this.oneColList.indexOf(card));
       },
       edit(card){
            card.edit=true
       },
       savingChanges(card){
            card.edit=false
            card.edited = new Date();
       }
    },
    mounted() {
        eventBus.$on('CreateCardList', list => {
            this.oneColList.push(list);
        })
        
    },
  
})

Vue.component('createCard', {
    template: `
            <div class="Card">
                <form class="form" >
                  <input type="text" v-model="list_name" placeholder="название"required>
                  <input type="text" v-model="cardDiscription" placeholder="описание"required>
                  <input type="date" v-model="deadline" required>
                  <input class="but" type="submit"  @click="onSubmit" value="СОЗДАТЬ">
                </form>   
            </div>
    `,
    data() {
        return {
            list_name: null,
            cardDiscription: null,
            deadline: null,
            
        }
    },
    methods: {
        onSubmit() {
            let cardList = {
                list_name: this.list_name,
                cardDiscription: this.cardDiscription,
                deadLine: new Date(this.deadline),
                edit:false,
                edited:null
            }
            eventBus.$emit('CreateCardList', cardList);
            this.list_name = this.deadline = this.cardDiscription = null;
        }
    },
    

})



let app = new Vue({
    el: '#app',
    data: {

    }
})