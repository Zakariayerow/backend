$(document).on('change', '#property_id', function () {
    var property_id = $(this).val() 
    commonAjax('GET', $('#getPropertyUnitsRoute').val(), getUnitsRes, getUnitsRes, { 'property_id': property_id });
});

function getUnitsRes(response) {
    var html = '<option value="">--Select Option--</option>';
    Object.entries(response.data).forEach((unit) => {

        if (unit[1].first_name != null) {
        html += '<option value="' + unit[1].id + '">' + unit[1].unit_name + ' (' + unit[1].first_name + ' ' + unit[1].last_name + ')</option>';
        }else{
        html += '<option value="' + unit[1].id + '">' + unit[1].unit_name + '- No Tenant</option>';
        }
    });
    $('#unit_id').html(html);
}

$(document).on('change','#unit_id', function(){
    var unit_id = $(this).val() 
    //get invoices
    commonAjax('GET', $('#getInvoicesRoute').val(), getInvoicesRes, getInvoicesRes, { 'unit_id': unit_id });
})

function getInvoicesRes(response) {
    console.log(response)
    var html = '<option value="">--Select Option--</option>';
    Object.entries(response.data).forEach((invoice) => {
        html += '<option value="' + invoice[1].id + '">' + invoice[1].invoice_no + ' - ('+invoice[1].amount +')</option>';
    });
    $('#invoice_id').html(html);
}

$(function() {
    $('#payment-options').hide();
    $('#mobile-option').hide();
    $('.bank-option').hide();
});

$(document).on('change', '#payment-status', function() {
    let paymentStatus = $(this).val();
    console.log(paymentStatus);

    $('#payment-options').hide();
    $('#mobile-option').hide();
    $('.bank-option').hide();

    if (paymentStatus == 1) {
        $('#payment-options').show();

        $(document).on('change', '#payment-method', function() {
            let paymentMethod = $(this).val();
            $('#mobile-option').hide();
            $('.bank-option').hide();

            if (paymentMethod == 'mobile') {
                $('#mobile-option').show();
            } else if (paymentMethod == 'bank') {
                $('.bank-option').show();
            }
        });
    }
});

const selectElement = document.getElementById('payment_type');
const selectedInvoice = document.getElementById('invoice_id');

selectElement.addEventListener('change', function () {
    const selectedOption = selectedInvoice.options[selectedInvoice.selectedIndex];
    const match = selectedOption.textContent.match(/\(([\d.]+)\)/);
    if (match && match[1]) {
        const valueInsideBrackets = match[1];
        if($(this).val() == 'partial'){
            $('#amount').val(valueInsideBrackets)
            $('#amount').attr('disabled', false)
        }else if($(this).val() == 'full'){
            $('#amount').val(valueInsideBrackets)
            $('#amount').attr('disabled', true)
        }
        $('#payment-options').hide();
        $('#mobile-option').hide();
        $('.bank-option').hide();
        $('#payment-options').show();
        $(document).on('change', '#payment-method', function() {
            let paymentMethod = $(this).val();
            $('#mobile-option').hide();
            $('.bank-option').hide();
            if (paymentMethod == 'mobile') {
                $('#mobile-option').show();
            } else if (paymentMethod == 'bank') {
                $('.bank-option').show();
            }
            $('#narration').val('');
        });
    }
});

// $(document).on('change','#payment_type',function(){
//     if($(this).val() == 'full'){
//         const selectedOption = selectElement.options[selectElement.selectedIndex];
    
//         // Extract the value inside the brackets using regular expressions
//         const match = selectedOption.textContent.match(/\((\d+)\)/);
        
//         // Check if there's a match
//         if (match && match[1]) {
//             const valueInsideBrackets = match[1];
//             console.log('Value inside brackets: ' + valueInsideBrackets);
//         }
        
//         $('#amount').val($('#invoice_amount').val())
//     }
// })
