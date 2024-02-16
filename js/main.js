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
Vue.component('col4', {
    template:`
    <div class="col">
    <h3>выполненные задачи</h3>
        <div>
            <div v-for="card in fourColList" class="col_item">
                <p><b>название:</b> {{ card.list_name}} </p>
                <p><b>описание:</b> {{ card.cardDiscription }}</p>
                <p><b>дэдлайн:</b>{{ card.deadLine }}</p>
                <p v-if="card.edited"><b>Последнее редактирование:</b> {{ card.edited }}</p>
                <h4 v-if="card.doneStatus" class="deadline-true">Сроки соблюдены</h4>
                <h4 v-else class="deadline-false ">Дедлайн просрочен</h4>
            </div>
        </div>
    </div>
    `, data(){
        return{
            fourColList:[]
        }
    },
    methods:{
      
    },
    mounted(){
        eventBus.$on('takeFromThree', card => {
            this.fourColList.push(card);
            card.doneDate = new Date();

            if (card.deadLine >= card.doneDate){
                card.doneStatus = true
            } 
            else card.doneStatus = false;
            
        })
    }
})
Vue.component('col3', {
    template:`
    <div class="col">
    <h3>тестирование</h3>
    <div>
        <div v-for="card in threeColList" class="col_item">
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
            <div v-if='show' class="reasonForReturn">
                <label class="title" for="reason">Причина возврата: </label>
                <input type="text" id="reason" v-model="reason" >
                <button @click="back(card)" class="btn">Вернуть</button>
            </div>
            
            <div v-else>
                <p><b>название:</b> {{ card.list_name}} </p>
                <p><b>описание:</b> {{ card.cardDiscription }}</p>
                <p><b>дэдлайн:</b>{{ card.deadLine }}</p>
                <p v-if="card.edited"><b>Последнее редактирование:</b> {{ card.edited }}</p>
                <div class="btns">
                    <button class="edit" @click="edit(card)">Редактировать</button>
                    <button class="next" @click="next(card)">переместить вперед</button>
                    <button  @click="returnCard(card)">переместить назад</button>
                    
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
    `, data(){
        return{
            threeColList: [],
            show: false,
            reason: null,
        }
       
    },
    methods:{
        edit(card) {
            card.edit = true
        },
        savingChanges(card) {
            card.edit = false
            card.edited = new Date();
        
        },
        next(card) {
            eventBus.$emit('takeFromThree', card);
            this.threeColList.splice(this.threeColList.indexOf(card), 1);
        },
        
        returnCard(card) {
            card.returned = true;
            this.show = true;
            
        },
        back(card){
            card.reasonForReturn.push(this.reason);
            this.reason = null;
            eventBus.$emit('takeBackThree', card);
            this.threeColList.splice(this.threeColList.indexOf(card), 1);
            this.show = false;
        }
        
    },
    mounted(){
        eventBus.$on('takeFromTwo', card => {
            this.threeColList.push(card);
        })
        
    }
})
Vue.component('col2', {
    template: `
    <div class="col">
    <h3>в работе</h3>
    <div>
        <div v-for="card in twoColList" class="col_item">
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
                <p v-if="card.reasonForReturn!=0" class="title" v-for="reason in card.reasonForReturn"><b>Причина возврата: </b>{{ reason }}</p>                
                <p><b>дэдлайн:</b>{{ card.deadLine }}</p>
                <p v-if="card.edited"><b>Последнее редактирование:</b> {{ card.edited }}</p>
                <div class="btns">
                        <button class="edit" @click="edit(card)">Редактировать</button>
                        <button class="next" @click="next(card)">переместить вперед</button>
                        
                    
                </div>
            </div>
        </div>
    </div>
</div>
    `, data() {
        return {
            twoColList: [],
            show: false,
        }

    },
    methods: {
        edit(card) {
            card.edit = true
        },
        savingChanges(card) {
            card.edit = false
            card.edited = new Date();
        
        },
        next(card) {
            eventBus.$emit('takeFromTwo', card);
            this.twoColList.splice(this.twoColList.indexOf(card), 1);
        }
        
    },
    mounted(){
        eventBus.$on('takeFromOne', card => {
            this.twoColList.push(card);
        })
        eventBus.$on('takeBackThree', card => {
            this.twoColList.push(card);
        })
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
                            
                                <button class="del" @click="del(card)">Удалить</button>
                                <button class="edit" @click="edit(card)">Редактировать</button>
                                <button class="next" @click="next(card)">переместить вперед</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `, data() {
        return {
            oneColList: [],
        }
    },
    methods: {
        del(card) {
            this.oneColList.splice(this.oneColList.indexOf(card), 1);
        },
        edit(card) {
            card.edit = true
        },
        next(card) {
            eventBus.$emit('takeFromOne', card);
            this.oneColList.splice(this.oneColList.indexOf(card), 1);
        },
        savingChanges(card) {
            card.edit = false
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
                edit: false,
                edited: null,
                reasonForReturn: [],
                returned: false,
                doneStatus: null,
                doneDate: null,
            
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