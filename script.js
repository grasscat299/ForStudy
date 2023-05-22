function buildTable(sheet) {
  var tableBody = $('#table-body');
	tableBody.empty();
  for (var i = 0; i < sheet.length; i++) {
    var row = $('<tr>');
    for (var j = 0; j < sheet[i].length; j++) {
      if(j === 0) row.append( $("<th>").text(i+1));
			row.append($('<td>').text(sheet[i][j]));
    }
    tableBody.append(row);
  }
}

var table;
function loadSheet() {
  var sheetSelect = $('#sheet-select');
  var sheetName = sheetSelect.val();
  var worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
  table = worksheet;
  buildTable(worksheet);
  questionReset();
}

$(document).ready(function() {
  //load時
	var fileSelect = $("#file-select");
  fileSelect.empty();
	fileTitle.forEach(function(name, index){
		var option = $("<option>").text(name).val(name);
		if (index === 0) option.attr( "selected", "selected");
		fileSelect.append(option);
	})
	getFile();	

  //sheet
	$("#sheet-select").change(function(){
    if(dataType = "xlsx") loadSheet(); 
  });

  //file
  $('#file-select').change(getFile);
});

var workbook;
function loadWorkbook(data) {
  if( dataType == "json" ){
    let tableelm = JSON.parse(data);
    table = tableelm.data;
    $("#sheet-select").empty();
    $('#sheet-select').append($('<option>').text("---"));
    buildTable(table);
    questionReset();
   
  } else if(dataType = "xlsx"){
    workbook = XLSX.read(data, { type: 'array' });
    var sheetSelect = $('#sheet-select');
    sheetSelect.empty();
    workbook.SheetNames.forEach(function(name, index) {
      var option = $('<option>').text(name).val(name);
      if(index === 0) option.attr('selected', 'selected');
      sheetSelect.append(option);
    });
    loadSheet();
  }
}

var dataType = "xlsx";
function getFile(){
	var fileName = $('#file-select').val();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/'+fileName, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      var contentType = xhr.getResponseHeader('Content-Type');
      let res;
      if (contentType === 'application/json') {
        dataType = "json";
        var uint8Array = new Uint8Array(xhr.response);
        var textDecoder = new TextDecoder();
        res = textDecoder.decode(uint8Array);
      } else if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        dataType = "xlsx";
        res = xhr.response;
      }
      loadWorkbook(res);
    } else {
      // リクエストが失敗した場合
      console.log('Failed to load file: ' + xhr.statusText);
    }
  };
  xhr.send();
}


//QuestionTabの仕様


var index = 0;
var question, answer;

function questionReset(){
  question = $("#question-text");
  answer = $("#answer-text");
  question.empty();
  answer.empty();
  showQuestion();
  index = 0;
}

function showQuestion() {
  question.text(table[index][0]);
  answer.text("---");
}

function showAnswer() {
  answer.text(table[index][1]);
}

function nextQuestion() {
  index++;
  if (index >= table.length) {
    index = 0;
  }
  showQuestion();
}

function prevQuestion() {
  index--;
  if (index < 0) {
    index = table.length - 1;
  }
  showQuestion();
  showAnswer();
}

$("#next-btn").on("click", function() {
  if (answer.text() === "---") {
    showAnswer();
  } else {
    nextQuestion();
  }
});

$("#back-btn").on("click", function() {
  if (answer.text() === "---") {
    prevQuestion();
  } else {
    showQuestion();
  }
});
