export function getNoItemsMessage(language) {
    const messages = {
      'de': 'Sie sind fertig! Es sind keine Artikel mehr zu bearbeiten.',
      'en': 'You are ready! There are no items left to process.'
    };
  
    return messages[language] || 'Message not available';
  }

  export function getSuccessMessage(language) {
    const messages = {
      'de': 'Die Daten wurden erfolgreich übermittelt!',
      'en': 'The data was successfully submitted!'
    };
 
    return messages[language] || 'Message not available';
  }

  export function getFailedMessage(language) {
    const messages = {
      'de': 'Die Daten konnten nicht übermittelt werden!',
      'en': 'The data could not be submitted!'
    };
 
    return messages[language] || 'Message not available';
  }

export function noItemsToSendError(language){
    const messages = {
        'de': 'Es sind keine Artikel zum Übermitteln vorhanden!',
        'en': 'There are no items to submit!'
      };
      alert(messages[language] || 'Message not available');
      return messages[language] || 'Message not available';
}

export function invalidDate(language){
    const messages = {
        'de': 'Ungültiges Datum!',
        'en': 'Invalid date!'
      };
      const alerts = {
        'de': 'Ungültiges Datum!\
        Bitte geben Sie ein Datum in einem der Formate TT.MM.JJ oder TT.MM.JJJJ ein.Beachten Sie, dass das Datum nicht in Wochenenden, in der Vergangenheit oder mehr als 3 Monate in der Zukunft liegen darf.',
        'en': 'Invalid date!\
        Please add a date in one of the formats DD.MM.YY or DD.MM.YYYY.Note that the date cannot be in weekends, in the past or more than 3 months into the future.'
      };
      alert(alerts[language] || 'Message not available');
      return messages[language] || 'Message not available';
}

