$(document).ready(function () {
    let spinner = $('.spin');
    spinner.spin("hide");
    let MaxInputs = 8; //maximum input boxes allowed
    let InputsWrapper = $("#query-form"); //Input boxes wrapper ID
    let AddButton = $("#add-column"); //Add button ID
    let SubmitButton = $("#submit");
    let AppendBefore = $("#append-before");
    let x = InputsWrapper.length; //initlal text box count
    let FieldCount = 2; //to keep track of text box added
    let requestUrl = "http://167.99.13.127:8001/common-value";

    $(AddButton).click( (e) => {
        if (x <= MaxInputs) //max input box allowed
        {
            FieldCount++; //text box added increment
            //add input box
            $(AppendBefore).before('<div class="col-xs-12 column-box">\n' +
                '                                        <div class="form-group">\n' +
                '                                            <div class="col-xs-10">\n' +
                '                                                <input type="text" class="form-control" placeholder="Table" id="table' + FieldCount + '">\n' +
                '                                            </div><div class="col-xs-2"><a href="#" class="removeclass">×</a></div>' +
                '                                        </div>\n' +
                '                                        <div class="form-group">\n' +
                '                                            <div class="col-xs-10">\n' +
                '                                                <input type="text" class="form-control" placeholder="Column" id="column' + FieldCount + '">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>');
            x++; //text box increment
        }
        return false;
    });

    $("body").on("click", ".removeclass", function (e) { //user click on remove text
        if (x > 1) {
            $(this).parent('div').parent('div').parent('div').remove(); //remove text box
            x--; //decrement textbox
            FieldCount--;
        }
        return false;
    })

    $(SubmitButton).on("click", (e) => {
        e.preventDefault();
        spinner.spin("show");
        let tables = [];
        let columns = [];
        let count = 1;
        while (count <= FieldCount) {
            let table = $("#table" + count);
            let column = $("#column" + count);
            let tableValue = table.val();
            let columnValue = column.val();
            if (!tableValue || !columnValue) {
                console.log("fill necessary fields");
                return;
            }
            tables.push(tableValue);
            columns.push(columnValue);
            count++;
        }
        let options = {
            url: requestUrl,
            data: {
                tables: tables.join(","),
                columns: columns.join(",")
            },
            method: 'GET',
            success: (result) => {
                $('#datatable-buttons').DataTable({
                    "ordering": false,
                    "data": result.data,
                    "columns": [
                        {"data": "val"},
                        {"data": "count"},
                    ]
                });
                spinner.spin("hide");
            },
            error: (err) => {
                spinner.spin("hide");
                console.log(err);
            }
        };
        $.ajax(options);
        console.log(options);
    });

});