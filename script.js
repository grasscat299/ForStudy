function buildTable(sheet) {
  var tableBody = $('#table-body');
	tableBody.empty();
  for (var i = 0; i < sheet.length; i++) {
    var row = $('<tr>');
    for (var j = 0; j < sheet[i].length; j++) {
      if(j === 0) row.append( $("<th>").text(sheet[i][j]));
			else row.append($('<td>').text(sheet[i][j]));
    }
    tableBody.append(row);
  }
}

/*
function loadFile(event) {
  var reader = new FileReader();
  reader.onload = function(event) {
    var data = new Uint8Array(event.target.result);
    var workbook = XLSX.read(data, { type: 'array' });
    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName];
    var table = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
	  buildTable(table);
  };
  reader.readAsArrayBuffer(event.target.files[0]);
}
*/
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
  $('#file-input').change(loadWorkbook);
	$("#sheet-select").change( loadSheet);
});

var workbook;
function loadWorkbook(data) {
	//input要素が作成され、ファイルが選択されたときに、loadWorkbook関数が呼び出され、ファイルが"リーダーオブジェクトに送信"されます
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


$(document).ready(function() {
  $('#file-select').change(getFile);
});


function getFile(){
	var fileName = $('#file-select').val();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/'+fileName, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      // リクエストが成功した場合
      loadWorkbook(xhr.response);
      // Excelファイルのデータを使用した処理
    } else {
      // リクエストが失敗した場合
      console.log('Failed to load file: ' + xhr.statusText);
    }
  };
  xhr.send();
}

$(document).ready(function(){
	var fileSelect = $("#file-select");
  fileSelect.empty();
	fileTitle.forEach(function(name, index){
		var option = $("<option>").text(name).val(name);
		if (index === 0) option.attr( "selected", "selected");
		fileSelect.append(option);
	})
	getFile();	
});


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
  question.text(table[index][1]);
  answer.text("---");
}

function showAnswer() {
  answer.text(table[index][2]);
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
