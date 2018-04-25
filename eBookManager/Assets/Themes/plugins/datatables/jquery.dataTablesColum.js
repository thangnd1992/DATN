var tableAJAX = document.createElement('table'),
     trAJAX = document.createElement('tr'),
     thAJAX = document.createElement('th'),
     tdAJAX = document.createElement('td');

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTableJson(tableView,arr) {
    tableAJAX.setAttribute("id", tableView);
    tableAJAX.setAttribute("class", 'table table-bordered table-hover table-popup');
    var table = tableAJAX.cloneNode(false),
        columns = addAllColumnHeadersJson(arr, table);
    for (var i = 0, maxi = arr.length; i < maxi; ++i) {
        var tr = trAJAX.cloneNode(false);
        for (var j = 0, maxj = columns.length; j < maxj ; ++j) {
            var td = tdAJAX.cloneNode(false);
            cellValue = arr[i][columns[j]];
            td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeadersJson(arr, table) {
    var columnSet = [],
        tr = trAJAX.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                columnSet.push(key);
                var th = thAJAX.cloneNode(false);
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
            }
        }
    }
    table.appendChild(tr);
    return columnSet;
}


function buildHtmlTable(tableView,myList) {
    var columns = addAllColumnHeaders(tableView,myList);

    for (var i = 0 ; i < myList.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#" + tableView).append(row$);      
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(tableView, myList) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $("#" + tableView).append(headerTr$);

    return columnSet;
}



function showHtmlTable(myList) {
    var v = "";
    var columns = [];
    v += addShowAllColumnHeaders(v, columns, myList);
    v += "    <tbody>";
    for (var i = 0 ; i < myList.length ; i++) {
        v += "    <tr>";
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue == null) {
                v += "    <td></td>";
            }
            else
            {
                v += "    <td>" + cellValue + "</td>";
            }
        }
        v += "    </tr>";
    }
    v += "    </tbody>";
    return v;
}

function addShowAllColumnHeaders(v,columnSet, myList) {
    v += "    <thead>";
    v += "        <tr>";

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                v += "            <th>" + key + "</th>";
            }
        }
    }
    v += "        </tr>";
    v += "    </thead>";
    return v;
}

// List Title Column to Array
//arrChart = getShowAllColumnHeaders(arr);
function getShowAllColumnHeaders(myList) {
    var columnSet = [];
    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
            }
        }
    };
    return columnSet;
}

//arrChartseries = getShowAllColumnValue(arr, arrChart, arrChart.length);
//arrChart.splice(0, 1);
function getShowAllColumnValue(myList, arrChart,intColumn) {
   
    var ValueSet = [];
    for (var i = 0 ; i < myList.length ; i++) {
        var rowValue = myList[i][arrChart[0]];
        var ValueRowGet = [];
        for (var colIndex = 1 ; colIndex < intColumn ; colIndex++) {
            var cellValue = myList[i][arrChart[colIndex]];            
            if (cellValue == null) {
                ValueRowGet.push(0);
            }
            else {
                ValueRowGet.push(parseInt(cellValue));
            }
        }
        var rowHash = {
            type: 'column',
            name: rowValue,
            data: ValueRowGet
        };
        ValueSet.push(rowHash);
    }
    return ValueSet;
}

//var returnVal = getShowAllChart(arr);
//var arrChart = returnVal.ChartColumn;
//var arrChartseries = returnVal.ChartColumnValue;
function getShowAllChart(myList) {
    var arrChart = [];
    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, arrChart) == -1) {
                arrChart.push(key);
            }
        }
    };

    var ValueSet = [];
    for (var i = 0 ; i < myList.length ; i++) {
        var rowValue = myList[i][arrChart[0]];
        var ValueRowGet = [];
        for (var colIndex = 1 ; colIndex < arrChart.length ; colIndex++) {
            var cellValue = myList[i][arrChart[colIndex]];
            if (cellValue == null) {
                ValueRowGet.push(0);
            }
            else {
                ValueRowGet.push(parseInt(cellValue));
            }
        }
        var rowHash = {
            type: 'column',
            name: rowValue,
            data: ValueRowGet
        };
        ValueSet.push(rowHash);
    }
    arrChart.splice(0, 1);

    return { ChartColumn: arrChart, ChartColumnValue: ValueSet };
}
