let requestUrl = "http://167.99.13.127:8001/jaccard-similarity?";
let spinner = $(".spin");
$(document).on('ready', () => {
    spinner.spin("hide");
    $('#submit').on('click', (e) => {
        e.preventDefault();
        spinner.spin("show");
        let table1 = $('#table1').val();
        let column1 = $('#column1').val();
        let table2 = $('#table2').val();
        let column2 = $('#column2').val();
        if (!table1 || !column1 || !table2 || !column2) {
            console.log("fill necessary fields");
            return;
        }
        let options = {
            url: requestUrl,
            data: {
                tablea: table1,
                tableb: table2,
                columna: column1,
                columnb: column2
            },
            method: 'GET',
            success: (result) => {
                // init_table(result);
                console.log(result);
                document.getElementById("jsvalue").innerHTML=result.val;
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