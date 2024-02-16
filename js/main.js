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
                <div v-for="card in firstColList" class="col_item">
                    <div>
                        <p><b>название:</b> {{ card.list_name}} </p>
                        <p><b>описание:</b> {{ card.cardDiscription }}</p>
                        <p><b>дэдлайн:</b>{{ card.deadLine }}</p>
                        <div class="btns">
                            <div>
                                <button class="del" >Удалить</button>
                                <button class="edit" >Редактировать</button>
                            </div>
                            <div>
                                <button class="next">переместить вперед</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `, data () {
        return {
            firstColList: [],
        }
    },
    methods: {
       
    },
    mounted() {
        eventBus.$on('CreateCardList', list => {
            this.firstColList.push(list);
        })
        
    }
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
            deadline: null
        }
    },
    methods: {
        onSubmit() {
            let cardList = {
                list_name: this.list_name,
                cardDiscription: this.cardDiscription,
                deadLine: new Date(this.deadline),
            }
            eventBus.$emit('CreateCardList', cardList);
            this.list_name = this.deadline = this.cardDiscription = null;
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {

    }
})