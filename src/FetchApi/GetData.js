import axios from 'axios';
import loading from '../routes/stores/loadingStore.js';

let apiUrl = 'https://prod-33.westeurope.logic.azure.com:443/workflows/affeb2eafd404ab5b6dcd60241001db2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0';

export async function makeRequest(token, token2) {
    // Additional hardcoded response data
    const additionalData = [
        {
            PONumber: "PO-0000001",
            ExternalOrderNumber: "EXT-0000001",
            EmployeeEmail: "automatify@competec.ch",
            OrderDate: "2021-01-01",
            VendorID: "V-0000001",
            ArtNr2: "A-0000001",
            Description: "Description",
            OrderQuantity: "1",
            SupplierItemNo: "S-0000001"
        },
        {
            PONumber: "PO-0000002",
            ExternalOrderNumber: "EXT-0000002",
            EmployeeEmail: "automatify@competec.ch",
            OrderDate: "2021-01-02",
            VendorID: "V-0000002",
            ArtNr2: "A-0000002",
            Description: "Description",
            OrderQuantity: "2",
            SupplierItemNo: "S-0000002"
        },
        {
            PONumber: "PO-0000003",
            ExternalOrderNumber: "EXT-0000003",
            EmployeeEmail: "automatify@competec.ch",
            OrderDate: "2021-01-03",
            VendorID: "V-0000003",
            ArtNr2: "A-0000003",
            Description: "Description",
            OrderQuantity: "3",
            SupplierItemNo: "S-0000003"
        }
    ];

    try {
        const response = await axios.post(apiUrl, { token: token }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token2,
            },
        });
        if (response.status === 200) {
            // Merge the API response data with the additional hardcoded data
            const mergedResponse = [ ...additionalData, ...response.data.value];
            loading.set(false);
            return mergedResponse;
        }
    } catch (error) {
        console.error(error);
        loading.set(false);
        return additionalData; // Return hardcoded data if there's an error
    }
    return additionalData; // Return hardcoded data if no response from the API
}

