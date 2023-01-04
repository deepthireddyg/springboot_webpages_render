function postData() {
  //Submit Request

  var personname = document.getElementById("PersonName").value;
  var EmailId = document.getElementById("EmailId").value;
  var servicename = document.getElementById("servicename").value;
  var Price = document.getElementById("Price").value;
  var ProviderName = document.getElementById("ProviderName").value;
  var ProviderStreet = document.getElementById("ProviderStreet").value;
  var ProviderCity = document.getElementById("ProviderCity").value;
  var ProviderState = document.getElementById("ProviderState").value;
  var ProviderZipcode = document.getElementById("ProviderZipcode").value;
  var ProviderRating = document.getElementById("ProviderRating").value;

  let data =
    '{"servicename": "' +
    servicename +
    '", "providerCity": "' +
    ProviderCity +
    '", "providerStreet": "' +
    ProviderStreet +
    '", "personName": "' +
    personname +
    '", "emailId": "' +
    EmailId +
    '", "price": ' +
    Price +
    ', "providerName": "' +
    ProviderName +
    '", "providerZipcode": "' +
    ProviderZipcode +
    '","providerRating": "' +
    ProviderRating +
    '","providerState": "' +
    ProviderState +
    '"}';

  console.log(data);

  const myurl = "https://springbootrender-v01.onrender.com/searchservices";

  const Http = new XMLHttpRequest();

  const url = myurl;
  Http.open("POST", url);

  Http.setRequestHeader("Accept", "application/json");
  Http.setRequestHeader("Content-Type", "application/json");

  Http.send(data);

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
    const obj = JSON.parse(Http.responseText);
    console.log(obj);
    alert(Http.responseText);
    document.getElementById("submissionformid").reset();
  };
}

function getData(servicename) {
  //Get Request

  const myurl =
    "https://springbootrender-v01.onrender.com/searchservices?servicename=" + servicename;
  //console.log(myurl);

  const Http = new XMLHttpRequest();
  const url = myurl;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    //  console.log(Http.responseText);
    try {
      const obj = JSON.parse(Http.responseText);
      console.log(obj);
      jsontoHTMLTable(obj);
      sortTable("table", 2);
    } catch (error) {
      console.log(error);
    }
  };
}

function jsontoHTMLTable(list) {
  var cols = [];

  for (var i = 0; i < list.length; i++) {
    for (var k in list[i]) {
      if (cols.indexOf(k) === -1) {
        // Push all keys to the array
        cols.push(k);
      }
    }
  }

  // Create a table element
  var table = document.createElement("table");

  // Create table row tr element of a table
  var tr = table.insertRow(-1);

  for (var i = 0; i < cols.length; i++) {
    // Create the table header th element
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    // Append columnName to the table row
    tr.appendChild(theader);
  }

  // Adding the data to the table
  for (var i = 0; i < list.length; i++) {
    // Create a new row
    trow = table.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
      var cell = trow.insertCell(-1);

      // Inserting the cell at particular place
      cell.innerHTML = list[i][cols[j]];
    }
  }

  // Add the newly created table containing json data
  var el = document.getElementById("table");
  el.innerHTML = "";
  el.appendChild(table);
}

function sortTable(table_id, sortColumn) {
  var tableData = document
    .getElementById(table_id)
    .getElementsByTagName("tbody")
    .item(0);

  var rowData = tableData.getElementsByTagName("tr");
  console.log(rowData);
  for (var i = 1; i < rowData.length - 1; i++) {
    for (var j = 1; j < rowData.length - i; j++) {
      if (
        Number(
          rowData
            .item(j)
            .getElementsByTagName("td")
            .item(sortColumn)
            .innerHTML.replace(/[^0-9\.]+/g, "")
        ) >
        Number(
          rowData
            .item(j + 1)
            .getElementsByTagName("td")
            .item(sortColumn)
            .innerHTML.replace(/[^0-9\.]+/g, "")
        )
      ) {
        tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
      }
    }
  }
}
