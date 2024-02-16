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


Vue.component('createCard', {
    template: `
            <div class="Card">
                <form class="form">
                  <input type="text" v-model="list_name" placeholder="название"required>
                  <input type="text" v-model="taskDiscription" placeholder="описание"required>
                  <input type="date" v-model="deadline" required>
                  <input class="but" type="submit" value="СОЗДАТЬ">
                </form>   
            </div>
    `,
    data() {
        return {
            list_name: null,
            taskDiscription: null,
            deadline: null
        }
    },
    methods: {
        onSubmit() {
            let cardList = {
                list_name: this.list_name,
                taskDiscription: this.taskDiscription,
                deadLine: new Date(this.deadline),
            }
            eventBus.$emit('CreateCardList', cardList);
            this.list_name = this.deadline = this.taskDiscription = null;
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {

    }
})