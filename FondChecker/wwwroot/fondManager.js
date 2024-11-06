$(document).ready(function () {
    // Load the list of Fond entities on page load
    loadFondsList();

    // Event listener for adding or updating Fond
    $('#fondForm').on('submit', saveFond);

    // Event listener for resetting the form on cancel
    $('#cancelFondEdit').on('click', function () {
        $('#fondForm')[0].reset();
        $('#fondId').val(''); // Clear the Fond ID
    });

    // ** Event Handlers for Action Buttons **
    $(document).on('click', '.edit-fond', function () {
        const sifra = $(this).data('id');
        loadFond(sifra); // Load Fond details for editing
    });

    $(document).on('click', '.delete-fond', function () {
        const sifra = $(this).data('id');
        deleteFond(sifra); // Delete Fond by ID
    });
});

// ** CRUD Functions for Fond **

// Load the list of Fonds and display them in a table
function loadFondsList() {
    $.getJSON('/api/v1/Fond', function (fonds) {
        const fondsTableBody = $('#fondsTableBody');
        fondsTableBody.empty();
        $.each(fonds, function (index, fond) {
            const row = $('<tr></tr>');
            row.append(`<td>${fond.naziv}</td>`);
            row.append(`<td>${fond.iznosSredstava}</td>`);
            row.append(`<td>${fond.brojProjekata}</td>`);
            row.append(`<td>${fond.uProvedbiDo ? fond.uProvedbiDo.split('T')[0] : 'N/A'}</td>`);
            row.append(`<td>
                <button class="edit-fond" data-id="${fond.sifra}">Edit</button> |
                <button class="delete-fond" data-id="${fond.sifra}">Delete</button>
            </td>`);
            fondsTableBody.append(row);
        });
    }).fail(function () {
        alert('Error loading fonds.');
    });
}

// Load a specific Fond by ID (Sifra) for editing
function loadFond(sifra) {
    $.getJSON(`/api/v1/Fond/${sifra}`, function (fond) {
        $('#fondId').val(fond.sifra);
        $('#naziv').val(fond.naziv);
        $('#iznosSredstava').val(fond.iznosSredstava);
        $('#brojProjekata').val(fond.brojProjekata);
        $('#uProvedbiDo').val(fond.uProvedbiDo ? fond.uProvedbiDo.split('T')[0] : '');
    }).fail(function () {
        alert('Error loading fond details.');
    });
}

// Save (add or update) a Fond
function saveFond(event) {
    event.preventDefault();
    const sifra = $('#fondId').val();
    const isUpdate = !!sifra; // Determine if it's an update or a new entry

    const fond = {
        naziv: $('#naziv').val(),
        iznosSredstava: $('#iznosSredstava').val(),
        brojProjekata: $('#brojProjekata').val(),
        uProvedbiDo: $('#uProvedbiDo').val()
    };

    if (isUpdate) {
        fond.sifra = sifra;
    }

    const requestType = isUpdate ? 'PUT' : 'POST';
    const requestUrl = isUpdate ? `/api/v1/Fond` : `/api/v1/Fond`;

    $.ajax({
        url: requestUrl,
        type: requestType,
        contentType: 'application/json',
        data: JSON.stringify(fond),
        success: function () {
            alert('Fond successfully saved.');
            $('#fondForm')[0].reset();
            $('#fondId').val(''); // Clear the form ID field
            loadFondsList(); // Reload the list of Fonds
        },
        error: function () {
            alert('Error saving fond.');
        }
    });
}

// Delete a Fond by its ID (Sifra)
function deleteFond(sifra) {
    $.ajax({
        url: `/api/v1/Fond/${sifra}`,
        type: 'DELETE',
        success: function () {
            alert('Fond successfully deleted.');
            loadFondsList(); // Reload the list of Fonds
        },
        error: function () {
            alert('Error deleting fond.');
        }
    });
}
