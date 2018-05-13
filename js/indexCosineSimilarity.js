let crequestUrl = "http://167.99.13.127:8001/cosine-similarity?";
// let spinner = $(".spin");
$(document).on('ready', () => {
    spinner.spin("hide");
    $('#csubmit').on('click', (e) => {
        
        let table1 = $('#ctable1').val();
        let column1 = $('#ccolumn1').val();
        let column2 = $('#ccolumn2').val();
        if (!table1 || !column1 || !column2) {
            console.log("fill necessary fields");

            if(table1 == null || table1 == "") {
                $('#ctable-alert1').show('fade');
                setTimeout(function () {
                    $('#ctable-alert1').hide('fade');
                }, 3000);
            }

            if(column1 == null || column1 == "") {
                $('#ccolumn-alert1').show('fade');
                setTimeout(function () {
                    $('#ccolumn-alert1').hide('fade');
                }, 3000);
            }

            if(column2 == null || column2 == "") {
                $('#ccolumn-alert2').show('fade');
                setTimeout(function () {
                    $('#ccolumn-alert2').hide('fade');
                }, 3000);
            }
            
            return false;
        }

        e.preventDefault();
        spinner.spin("show");

        let options = {
            url: crequestUrl,
            data: {
                table: table1,
                columna: column1,
                columnb: column2
            },
            method: 'GET',
            success: (result) => {
                // init_table(result);
                console.log(result);
                document.getElementById("csvalue").innerHTML=result.val.toFixed(2);
                spinner.spin("hide");
            },

            error: (err) => {
                console.log(err);
                spinner.spin("hide");
            }
        };
        $.ajax(options);
    })
})