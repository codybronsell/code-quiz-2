$=jQuery;
var CODYQUIZ = {};
CODYQUIZ.Global = {
	score: 0,
	startTime: 75,
	currentTime: 75,
	questions: [],
	currentQuestion: 0,
	currentCorrect:'',
	totalQestions: 0,
	timer:{}
}
CODYQUIZ.UI = {
	start: '.quiz-intro',
	end: '.quiz-outro',
	container: '.questions',
	title: '.question-title',
	answers: '.answers',
	loadingMessage: 'Loadin...',
}
CODYQUIZ.Data = {
	questions: [{"id":538,"question":"Choose the correct HTML tag for the smallest size heading?","description":null,"answers":{"answer_a":"<heading>","answer_b":"<head>","answer_c":"<h1>","answer_d":"<h6>","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"true","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"},{"id":505,"question":"Which of the following is an attribute of the <Table> tag?","description":null,"answers":{"answer_a":"SRC","answer_b":"BOLD","answer_c":"CELLPADDING","answer_d":"LINK","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"false","answer_c_correct":"true","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"},{"id":468,"question":"All elements are identified by their __________ and are marked up using either start tags and end tags or self-closing tags","description":null,"answers":{"answer_a":"Attribute Names","answer_b":"Tag Names","answer_c":"Class Names","answer_d":"None of the mentioned","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"},{"id":503,"question":"Which tag allows you to add a row in a table?","description":null,"answers":{"answer_a":"<td> and <\/td>","answer_b":"<tr> and <\/tr>","answer_c":"<th> and <\/th>","answer_d":"<cr> and <\/cr>","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"},{"id":452,"question":"Which Is not a property of attribute behaviour of <Marquee> Tag?","description":null,"answers":{"answer_a":"Blur","answer_b":"Slide","answer_c":"Alternate","answer_d":"Scroll","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"false","answer_c_correct":"true","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"}],
	answersKeys: ["answer_a","answer_b","answer_c","answer_d","answer_e","answer_f"],
}
CODYQUIZ.Events = {
	init: function(){
		CODYQUIZ.Global.questions = CODYQUIZ.Data.questions;
		CODYQUIZ.Global.totalQestions = CODYQUIZ.Global.questions.length;
		$('#startQuizBtn').on('click', function(){
			console.info('start clicked');
			CODYQUIZ.Events.start();
		});
		$('#startQuizOverBtn').on('click', function(){
			console.info('start clicked');
			CODYQUIZ.Global.currentQuestion=0;
			CODYQUIZ.Global.score=0;
			$('.score').text(0);
			$('#timer').html(75);
			
			CODYQUIZ.Events.start();
		});
	},
	start: function(){
		$(CODYQUIZ.UI.start).hide();
		$(CODYQUIZ.UI.end).hide();
		$(CODYQUIZ.UI.container).show();
		CODYQUIZ.Events.loadQuestion();	
		CODYQUIZ.Global.timer = setInterval(function() {
	    CODYQUIZ.Global.currentTime = parseInt($('#timer').html());
    	if (CODYQUIZ.Global.currentTime !== 0) {
      		$('#timer').html(CODYQUIZ.Global.currentTime - 1);
    	} else {
      		clearInterval(CODYQUIZ.Global.timer);
    	}
  }, 1000);
	},
	loadQuestion: function(){
		let $container = $(CODYQUIZ.UI.container);
		let $title = $(CODYQUIZ.UI.title);
		let $answers = $(CODYQUIZ.UI.answers);
		$title.html(CODYQUIZ.UI.loadingMessage);
		$answers.find('li').html(CODYQUIZ.UI.loadingMessage);
		let currentQuestion = CODYQUIZ.Global.questions[CODYQUIZ.Global.currentQuestion];
		$title.html(currentQuestion.question);
		$answers.html('');
		CODYQUIZ.Global.currentCorrect = currentQuestion.correct_answers;
		for(var a=0; a < CODYQUIZ.Data.answersKeys.length; a++){
			var li = $("<li></li>");
			var answerKey = CODYQUIZ.Data.answersKeys[a];
			console.info(answerKey);
			var answerTxt = currentQuestion.answers[answerKey];
			console.info(answerTxt);
			if(answerTxt != null){
				var btn = $('<button></button>');
				btn.addClass('answer');
				btn.attr('data-aid', answerKey);
				btn.on('click', function(){
					var $btn = $(this);
					var aid = $btn.attr('data-aid');
					CODYQUIZ.Events.answerQuestion($btn, aid);	
				});
				btn.text(answerTxt);
				li.html(btn);
				$answers.append(li);
			}
			
		}
	},
	answerQuestion: function($btn, answerKey){
		console.info(answerKey);
		if(CODYQUIZ.Global.currentCorrect[answerKey+'_correct'] == "true"){
		   $btn.addClass('correct');
			CODYQUIZ.Global.score += 100;
			$('.score').text(CODYQUIZ.Global.score);
			//add local storage
		}else{
			$('#timer').html(parseInt($('#timer').html())-10);
		  $btn.addClass('incorrect');
		}
		
		setTimeout(function(){
			if(CODYQUIZ.Global.currentQuestion < CODYQUIZ.Global.totalQestions-1){
				CODYQUIZ.Global.currentQuestion++;
		   		CODYQUIZ.Events.loadQuestion();
			}else{
				$(CODYQUIZ.UI.end).show();
				//SET SCORE
				
				$(CODYQUIZ.UI.container).hide();
			}
		}, 1000);
		
	}
}


$(document).ready(function(){
	CODYQUIZ.Events.init();
});