// @ts-nocheck
import axios from 'axios';
import { t, locale } from '../routes/i18nSetup';
import { getSuccessMessage, getFailedMessage } from "../routes/Messages";
import { get } from 'svelte/store';

let apiUrl = 'https://prod-12317.westeurope.logic.azure.com:443/workflows/44e321eb652f4b43b8103e732829ecd5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0';



export async function postDates( token , JsonContent ){
    // console.log("token postDates is reached :" + token)
    try {
        const response = await axios.post(apiUrl, {
             token: token,
            JsonContent: JsonContent

             }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
        });
        if (response.status === 200) {
            const successMessage = getSuccessMessage(get(locale));
            alert(successMessage);
            // console.log("sa primit: ", response.data.value);
            setTimeout(() => {
                const alertElement = document.querySelector('.alert');
                if (alertElement) {
                    alertElement.remove();
                }
            }, 3000);
            return response.data.value;
        }
    } catch (error) {
        const failedMessage = getFailedMessage(get(locale));
        alert(failedMessage);
        console.error(error);
        setTimeout(() => {
            const alertElement = document.querySelector('.alert');
            if (alertElement) {
                alertElement.remove();
            }
        }, 3000);
        return [];
    }
    return [];

}