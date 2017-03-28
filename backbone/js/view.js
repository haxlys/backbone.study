// Backbone View

// View 예제
var TodoView = Backbone.View.extend({
  tagName: 'li', // 지정하지 않으면 default : div

  //단일 항목을 위한 템플릿 함수
  todoTpl: _.template("An example template"),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ));
    // this.$el -> $(this.el) 과 동일
    // $(this.el).html( this.todoTpl( this.model.toJSON() )
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // todo 라벨이 더블클릭 되면 실행
  },

  close: function() {
    //tododptj 포커스를 잃어버리면 실행
  },

  updateOnEnter: function(e) {
    //todo 편집모드에서 키가 눌러졌을 때 실행되지만 입력을 받기 위해 대기 상태를 유지
  }
});

var todoView = new TodoView();
console.log(todoView.el); // <li></li>
// View 예제

// 모든 뷰는 반드시 하나의 el을 가져야 한다.

// View 예제
var TodoView = Backbone.View.extend({
  tagName: 'ul', // 필수사항 default : div
  className: 'conainer', // 선택사항, 여러개 가능 'conainer anotherClass'
  id: 'todos', // 선택사항
});
console.log(new TodoView().el); // <ul id="todos" class="conainer"></ul>
// View 예제

// 요소가 이미 있는 경우 아래와 같이 재사용 가능
// 1.
var TodoView = Backbone.View.extend({
  el :'footer'
});
console.log(new TodoView().el);
// 2.
var todoView = new TodoView({el: $('footer')});
console.log(todoView.el);

//
