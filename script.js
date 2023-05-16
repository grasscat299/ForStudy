function buildTable(table) {
  var tableBody = $('#table-body');
	tableBody.empty();
  for (var i = 0; i < table.length; i++) {
    var row = $('<tr>');
    for (var j = 0; j < table[i].length; j++) {
      if(j === 0) row.append( $("<th>").text(table[i][j]));
			else row.append($('<td>').text(table[i][j]));
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

function loadSheet() {
  var sheetSelect = $('#sheet-select');
  var sheetName = sheetSelect.val();
  var worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
  buildTable(worksheet);
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
  /*
  $.ajax({
    url: 'data/' + fileName,
    type: 'GET',
    dataType: 'binary',
    processData: false,
    responseType: 'arraybuffer',
    success: function(response, status, xhr) {
      loadWorkbook(response);
    },
    error: function(xhr, status, error) {
      console.log('Error: ' + error);
    }
  });
  */
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