$(document).on('ready', () => {
    let spinner = $('.spin');
    spinner.spin('hide');
    let requestUrl = "http://167.99.13.127:8001/column-value";
    let hasValBeforeAppend = $("#has-val-append-before");
    let notHasValBeforeAppend = $("#not-has-val-append-before");
    let addHasValButton = $("#add-has-val");
    let addNotHasValButton = $("#add-not-has-val");
    let submitButton = $("#submit");
    let hasValFieldCount = 1;
    let notHasValFieldCount = 1;

    $(addHasValButton).click( (e) => {
        hasValFieldCount++; //text box added increment
        //add input box
        $(hasValBeforeAppend).before(
            '<div class="form-group">\n' +
            '<div class="col-xs-10">\n' +
            '<input type="text" class="form-control" placeholder="has value" id="hasVal' + hasValFieldCount + '">\n' +
            '</div><div class="col-xs-2"><a href="#" class="has-val-remove">×</a></div>\n' +
            '<div id="column-has-alert' + hasValFieldCount + '" class="alert alert-danger collapse col-xs-10" role="alert">\n' +
            '<strong>Cloumn value required</strong>\n' +
            '</div>\n' +
            '</div>'
        );
    });

    $(addNotHasValButton).click( (e) => {
        notHasValFieldCount++; //text box added increment
        //add input box
        $(notHasValBeforeAppend).before('<div class="form-group">\n' +
            '<div class="col-xs-10">\n' +
            '<input type="text" class="form-control" placeholder="not has value" id="notHasVal' + notHasValFieldCount + '">\n' +
            '</div><div class="col-xs-2"><a href="#" class="not-has-val-remove">×</a></div>\n' +
            '<div id="column-not-has-alert' + notHasValFieldCount + '" class="alert alert-danger collapse col-xs-10" role="alert">\n' +
            '<strong>Cloumn value required</strong>\n' +
            '</div>\n' +
            '</div>');
    });

    $("body").on("click", ".has-val-remove", function (e) { //user click on remove text
        $(this).parent('div').parent('div').remove(); //remove text box
        hasValFieldCount--;
    });

    $("body").on("click", ".not-has-val-remove", function (e) { //user click on remove text
        $(this).parent('div').parent('div').remove(); //remove text box
        notHasValFieldCount--;
    });

    $(submitButton).on('click', (e) => {

        var fail = false;
        
        let table = $('#table').val();
        if (!table) {
            console.log("fill necessary fields");
            $('#table-alert').show('fade');
            setTimeout(function () {
                $('#table-alert').hide('fade');
            }, 3000);
            
            fail = true;
        }

        let hasVals = [];
        let notHasVals = [];
        let hasValCount = 1;
        while (hasValCount <= hasValFieldCount) {
            let ele = $("#hasVal" + hasValCount);
            let value = ele.val();

            if (!value) {
                console.log("fill necessary fields");
                let id = 'column-has-alert' + hasValCount;

                $('#' + id).show('fade');
                setTimeout(function () {
                    $('#' + id).hide('fade');
                }, 3000);

                fail = true;
            }
            hasValCount++;
            hasVals.push(value);
        }

        let notHasValCount = 1;
        while (notHasValCount <= notHasValFieldCount) {
            let ele = $("#notHasVal" + notHasValCount);
            let value = ele.val();
            if (!value) {
                console.log("fill necessary fields");
                let id = 'column-not-has-alert' + notHasValCount;

                $('#' + id).show('fade');
                setTimeout(function () {
                    $('#' + id).hide('fade');
                }, 3000);
                
                fail = true;
            }
            notHasValCount++;
            notHasVals.push(value);
        }

        if(fail) {
            return false;
        }

        // show spinner when loading
        e.preventDefault();
        spinner.spin('show');

        let options = {
            url: requestUrl,
            data: {
                table: table,
                hasVal: hasVals.join(","),
                notHasVal: notHasVals.join(",")
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
                spinner.spin('hide');
            },
            error: (err) => {
                spinner.spin('hide');
                console.log(err);
            }
        };
        $.ajax(options);
    })
})