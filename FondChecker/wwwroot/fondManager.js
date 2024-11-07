$(document).ready(function () {
    // Load the list of Fonds on page load
    loadFondsList();

    // Event listener for adding or updating a Fond
    $('#fondForm').on('submit', saveFond);

    // Event listener to clear the form on cancel
    $('#cancelFondEdit').on('click', function () {
        $('#fondForm')[0].reset();
        $('#fondId').val(''); // Clear hidden ID field
    });

    // Event listeners for editing and deleting a Fond
    $(document).on('click', '.edit-fond', function () {
        const id = $(this).data('id');
        loadFond(id); // Load the Fond details for editing
    });

    $(document).on('click', '.delete-fond', function () {
        const id = $(this).data('id');
        deleteFond(id); // Delete the Fond
    });
});

// Load the list of Fonds and display in table
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

// Load a specific Fond by ID to edit
function loadFond(id) {
    $.getJSON(`/api/v1/Fond/${id}`, function (fond) {
        $('#fondId').val(fond.sifra);
        $('#naziv').val(fond.naziv);
        $('#iznosSredstava').val(fond.iznosSredstava);
        $('#brojProjekata').val(fond.brojProjekata);
        $('#uProvedbiDo').val(fond.uProvedbiDo ? fond.uProvedbiDo.split('T')[0] : '');
    }).fail(function () {
        alert('Error loading fond details.');
    });
}

// Save a new or updated Fond
function saveFond(event) {
    event.preventDefault();
    const id = $('#fondId').val();
    const isUpdate = !!id;

    const fond = {
        naziv: $('#naziv').val(),
        iznosSredstava: $('#iznosSredstava').val(),
        brojProjekata: $('#brojProjekata').val(),
        uProvedbiDo: $('#uProvedbiDo').val()
    };

    if (isUpdate) {
        fond.sifra = id;
    }

    const requestType = isUpdate ? 'PUT' : 'POST';
    const requestUrl = '/api/v1/Fond';

    $.ajax({
        url: requestUrl,
        type: requestType,
        contentType: 'application/json',
        data: JSON.stringify(fond),
        success: function () {
            alert('Fond saved successfully.');
            $('#fondForm')[0].reset();
            $('#fondId').val('');
            loadFondsList(); // Reload the list of Fonds
        },
        error: function () {
            alert('Error saving fond.');
        }
    });
}

// Delete a Fond by ID
function deleteFond(id) {
    $.ajax({
        url: `/api/v1/Fond/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Fond deleted successfully.');
            loadFondsList(); // Reload the list of Fonds
        },
        error: function () {
            alert('Error deleting fond.');
        }
    });
}
